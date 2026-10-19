import type { ReactNode } from 'react';
import { cx, type Size } from './cx';
import { Icon } from '../icons/Icon';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Link } from './Link';

const pad = { small: 'p-xs', medium: 'p-m', large: 'p-l' } as const;
const txt = { small: 'type-body-small', medium: 'type-body-medium', large: 'type-body-large' } as const;

export type SortState = 'unsorted' | 'ascending' | 'descending';

export interface TableHeaderCellProps {
  /** Figma `Label`. */
  label?: string;
  /** «TableView Header Small / Medium / Large». */
  size?: Size;
  /** Figma `Content=Number` (høyrejustert). */
  numeric?: boolean;
  sortState?: SortState;
  /** Figma `Show Sort`. */
  onSort?: () => void;
  /** Figma `Show Filter`. */
  onFilter?: () => void;
  /** Figma `Style=Checkbox` / `Show Checkbox`. */
  checked?: boolean | null;
  onCheckedChange?: (v: boolean | null) => void;
}

/** Kolonneoverskrift («TableView Header Small / Medium / Large»). */
export function TableHeaderCell({ label, size = 'medium', numeric, sortState = 'unsorted', onSort, onFilter, checked, onCheckedChange }: TableHeaderCellProps) {
  const hasCheckbox = !!onCheckedChange;
  const iconBtn = 'grid size-[32px] place-items-center rounded-small text-cta-primary-default hover:bg-surface-secondary cursor-pointer';
  return (
    <th
      scope="col"
      aria-sort={sortState === 'unsorted' ? undefined : sortState}
      className={cx('border border-border-secondary bg-surface-tableview-header', hasCheckbox && !label ? 'p-xs' : pad[size])}
    >
      <div className={cx('flex items-center gap-xs', numeric ? 'justify-end' : 'justify-start')}>
        {hasCheckbox && <Checkbox checked={checked ?? false} tristate onChange={onCheckedChange} />}
        {label && <span className={cx(txt[size], 'font-bold text-text-primary text-left')}>{label}</span>}
        {onSort && (
          <button type="button" aria-label="Sorter" onClick={onSort} className={iconBtn}>
            <Icon name={sortState === 'unsorted' ? 'unsorted' : 'sortDown'} size={16} className={sortState === 'ascending' ? 'rotate-180' : ''} />
          </button>
        )}
        {onFilter && (
          <button type="button" aria-label="Filtrer" onClick={onFilter} className={iconBtn}>
            <Icon name="filter" size={16} />
          </button>
        )}
      </div>
    </th>
  );
}

export type TableCellContent = 'text' | 'number' | 'link' | 'input' | 'icon' | 'status';

export interface TableCellProps {
  /** Figma `Label`. */
  text: string;
  /** «TableView Cell Small / Medium / Large». */
  size?: Size;
  /** Figma `Style=Odd` (annenhver rad). */
  odd?: boolean;
  /** Figma `Content`. */
  content?: TableCellContent;
  /** Brukes når `content` er `link`. */
  onClick?: () => void;
  /** Brukes når `content` er `icon`. */
  icon?: ReactNode;
  /** Bakgrunn for `status` (standard attention-warning). */
  statusColor?: string;
  /** Figma `Show checkbox`. */
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  /** Eget felt når `content` er `input`. */
  input?: ReactNode;
}

/** Tabellcelle («TableView Cell Small / Medium / Large»). */
export function TableCell({ text, size = 'medium', odd, content = 'text', onClick, icon, statusColor, checked, onCheckedChange, input }: TableCellProps) {
  const style = cx(txt[size], 'text-text-primary');
  const child =
    content === 'number' ? (
      <span className={cx(style, 'block text-right')}>{text}</span>
    ) : content === 'link' ? (
      <Link text={text} onClick={onClick} />
    ) : content === 'input' ? (
      (input ?? <span className={style}>{text}</span>)
    ) : content === 'icon' ? (
      <span className={cx(style, 'inline-flex items-center gap-xs')}>
        {icon && <span className="text-cta-primary-default [--icon-size:18px]">{icon}</span>}
        {text}
      </span>
    ) : content === 'status' ? (
      <span className={cx(txt[size], 'inline-block rounded-[2px] px-xs py-[4px] text-text-invert')} style={{ background: statusColor ?? 'var(--attention-warning)' }}>
        {text}
      </span>
    ) : (
      <span className={style}>{text}</span>
    );
  return (
    <td className={cx(odd ? 'bg-surface-tableview-odd' : 'bg-surface-primary', content === 'input' ? (size === 'small' ? 'p-xs' : 'px-s py-xs') : pad[size])}>
      <div className="flex items-center gap-s">
        {onCheckedChange && <Checkbox checked={checked ?? false} onChange={(v) => onCheckedChange(!!v)} />}
        <div className="min-w-0 flex-1">{child}</div>
      </div>
    </td>
  );
}

export interface TablePaginationProps {
  /** 1-basert. */
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  size?: Size;
  /** Figma `Property 1=Variant 2` («Side 1 av 8»). */
  compact?: boolean;
}

/** Paginering under tabell («Table Navigation»). */
export function TablePagination({ currentPage, pageCount, onPageChange, size = 'medium', compact = false }: TablePaginationProps) {
  const prev = (
    <Button size={size} variant="secondary" aria-label="Forrige side" leadingIcon={<Icon name="chevronRoundedLeft" />} disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} />
  );
  const next = (
    <Button size={size} variant="secondary" aria-label="Neste side" leadingIcon={<Icon name="chevronRoundedRight" />} disabled={currentPage >= pageCount} onClick={() => onPageChange(currentPage + 1)} />
  );
  if (compact) {
    return (
      <nav aria-label="Sider" className="inline-flex items-center gap-xs">
        {prev}
        <span className={cx(txt[size], 'text-text-primary')}>
          Side {currentPage} av {pageCount}
        </span>
        {next}
      </nav>
    );
  }
  // Første side, nabosider og siste side, med «…» imellom.
  const pages: Array<number | null> = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - currentPage) <= 1) pages.push(i);
    else if (pages.length && pages[pages.length - 1] !== null) pages.push(null);
  }
  return (
    <nav aria-label="Sider" className="inline-flex flex-wrap items-center gap-[2px]">
      {prev}
      {pages.map((n, i) =>
        n === null ? (
          <span key={`gap${i}`} className={cx(txt[size], 'px-xs text-cta-primary-default')}>
            …
          </span>
        ) : (
          <Button key={n} size={size} variant={n === currentPage ? 'primary' : 'secondary'} label={`${n}`} aria-current={n === currentPage ? 'page' : undefined} onClick={() => onPageChange(n)} />
        ),
      )}
      {next}
    </nav>
  );
}
