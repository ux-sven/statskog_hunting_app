import { Button, type ButtonProps } from '../../components/Button';
import { cx } from '../../components/cx';

/** «Button Medium»/«Button Small» slik de står på den grønne flaten: hvit ramme og tekst. */
export function InvertButton({ filled, className, ...rest }: ButtonProps & { filled?: boolean }) {
  return (
    <Button
      variant="secondary"
      className={cx(
        '!text-text-invert [--ring:var(--text-invert)] hover:!text-text-invert hover:[--ring:var(--text-invert)] hover:!bg-white/10',
        'focus-visible:!text-text-invert focus-visible:[--ring:var(--cta-primary-selected)]',
        filled ? '!bg-white/5' : '!bg-transparent [--ring-w:2px]',
        className,
      )}
      {...rest}
    />
  );
}
