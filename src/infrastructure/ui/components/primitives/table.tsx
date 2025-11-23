import { type PropsWithChildren, TableHTMLAttributes } from 'react';
import './table.css';

type TableProps = PropsWithChildren<TableHTMLAttributes<HTMLTableElement> & { className?: string }>;

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="table-container">
      <table className={`table ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

type TableSectionProps = PropsWithChildren;

export function TableHead({ children }: TableSectionProps) {
  return <thead className="table__head">{children}</thead>;
}

export function TableBody({ children }: TableSectionProps) {
  return <tbody className="table__body">{children}</tbody>;
}

type TableRowProps = PropsWithChildren<{ className?: string }>;

export function TableRow({ children, className = '' }: TableRowProps) {
  return <tr className={`table__row ${className}`}>{children}</tr>;
}

type TableHeaderProps = PropsWithChildren<{ className?: string }>;

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return <th className={`table__header ${className}`}>{children}</th>;
}

type TableCellProps = PropsWithChildren<{ className?: string }>;

export function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={`table__cell ${className}`}>{children}</td>;
}
