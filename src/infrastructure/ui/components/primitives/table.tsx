import { ReactNode, TableHTMLAttributes } from 'react';
import './table.css';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="table-container">
      <table className={`table ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="table__head">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="table__body">{children}</tbody>;
}

export function TableRow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tr className={`table__row ${className}`}>{children}</tr>;
}

export function TableHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={`table__header ${className}`}>{children}</th>;
}

export function TableCell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`table__cell ${className}`}>{children}</td>;
}
