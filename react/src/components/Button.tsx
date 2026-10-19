import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx, type Size } from './cx';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'accent';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma `Label` + `Show Label`. Uten label blir det en ikonknapp (husk `aria-label`). */
  label?: string;
  /** Figma `Style`. `accent` er den oransje «Aktiver»-knappen (Primary med overstyrt fyll i Figma). */
  variant?: ButtonVariant;
  /** Settnavnet «Button Large / Medium / Small». */
  size?: Size;
  /** «Button Vertical …» – ikon over tekst. */
  vertical?: boolean;
  /** Figma `Left Icon` + `Left Icon Type`. */
  leadingIcon?: ReactNode;
  /** Figma `Right Icon` + `Right Icon Type`. */
  trailingIcon?: ReactNode;
  /** Figma `State=visited`. */
  visited?: boolean;
  /** Fyller tilgjengelig bredde. */
  expand?: boolean;
  /** Fast kvadratisk størrelse for ikonknapper, f.eks. 46 i tellere og 54 i kort. */
  square?: number;
}

const padding: Record<Size, [string, string]> = {
  large: ['px-[32px] py-[24px]', 'px-[32px] py-[24px]'],
  medium: ['px-[24px] py-[16px]', 'px-[32px] py-[16px]'],
  small: ['px-[16px] py-[12px]', 'px-[24px] py-[12px]'],
};

const text: Record<Size, string> = {
  large: 'type-button-large',
  medium: 'type-button-medium',
  small: 'type-button-small',
};

const iconSize: Record<Size, string> = {
  large: '[--icon-size:22px]',
  medium: '[--icon-size:18px]',
  small: '[--icon-size:14px]',
};

// Rammen tegnes innenfor knappen (inset), slik Figma gjør, så størrelsen er lik med
// og uten ramme. Farge og tykkelse styres med --ring og --ring-w.
const ringBase = 'shadow-[inset_0_0_0_var(--ring-w,0px)_var(--ring,transparent)]';

function variantClasses(variant: ButtonVariant, size: Size, vertical: boolean, visited: boolean) {
  const focusW = size === 'large' ? 'focus-visible:[--ring-w:4px]' : 'focus-visible:[--ring-w:2px]';
  switch (variant) {
    case 'primary':
      return cx(
        visited ? 'bg-cta-primary-visited' : 'bg-cta-primary-default',
        'text-text-invert hover:bg-cta-primary-hover',
        'active:bg-cta-primary-selected active:text-text-primary',
        'focus-visible:outline-none focus-visible:[--ring:var(--cta-primary-selected)]',
        focusW,
        'disabled:bg-cta-primary-disabled disabled:text-text-invert',
      );
    case 'secondary':
      return cx(
        vertical ? 'bg-transparent' : 'bg-surface-primary',
        '[--ring-w:1px]',
        visited
          ? 'text-cta-primary-hover [--ring:var(--cta-primary-visited)]'
          : 'text-cta-primary-default [--ring:var(--cta-primary-default)]',
        'hover:text-cta-primary-hover hover:[--ring:var(--cta-primary-hover)]',
        'active:text-cta-primary-hover active:[--ring:var(--cta-primary-hover)]',
        'focus-visible:outline-none focus-visible:text-cta-primary-selected focus-visible:[--ring:var(--cta-primary-selected)]',
        focusW,
        'disabled:text-cta-primary-disabled disabled:[--ring:var(--cta-primary-disabled)]',
      );
    case 'tertiary':
      return cx(
        visited || vertical ? 'bg-transparent' : 'bg-surface-secondary',
        visited ? 'text-cta-primary-visited' : 'text-cta-primary-default',
        'hover:bg-surface-secondary hover:text-cta-primary-hover',
        'active:bg-surface-secondary active:text-cta-primary-selected',
        'focus-visible:outline-none focus-visible:bg-surface-secondary focus-visible:text-cta-primary-selected focus-visible:[--ring:var(--cta-primary-selected)]',
        focusW,
        'disabled:bg-transparent disabled:text-cta-primary-disabled disabled:[--ring-w:1px] disabled:[--ring:var(--cta-primary-disabled)]',
      );
    case 'accent':
      return cx(
        'bg-cta-primary-selected text-[#2a2a2a]',
        'hover:bg-cta-secondary-pressed active:bg-cta-secondary-selected',
        'focus-visible:outline-none focus-visible:[--ring:var(--cta-primary-default)]',
        focusW,
        'disabled:bg-cta-primary-disabled',
      );
  }
}

/**
 * Knapp fra designsystemet (siden «Buttons» i Figma): Button Large / Medium / Small
 * og Button Vertical Large / Medium / Small.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  vertical = false,
  leadingIcon,
  trailingIcon,
  visited = false,
  expand = false,
  square,
  className,
  style,
  type = 'button',
  ...rest
}: ButtonProps) {
  const gap = vertical ? (size === 'small' ? 'gap-0' : 'gap-[8px]') : size === 'small' ? 'gap-[12px]' : 'gap-[16px]';
  return (
    <button
      type={type}
      className={cx(
        'inline-flex items-center justify-center rounded-small cursor-pointer select-none transition-colors duration-100',
        'disabled:cursor-not-allowed',
        ringBase,
        vertical ? 'flex-col' : 'flex-row',
        square ? 'p-0' : padding[size][vertical ? 1 : 0],
        gap,
        text[size],
        iconSize[size],
        expand ? 'w-full' : '',
        variantClasses(variant, size, vertical, visited),
        className,
      )}
      style={square ? { width: square, height: square, ...style } : style}
      {...rest}
    >
      {leadingIcon && <span className="inline-flex items-center">{leadingIcon}</span>}
      {label && <span className="min-w-0 truncate">{label}</span>}
      {trailingIcon && <span className="inline-flex items-center">{trailingIcon}</span>}
    </button>
  );
}
