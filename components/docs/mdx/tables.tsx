import { memo } from "react";

export const Table = memo<React.TableHTMLAttributes<HTMLTableElement>>(
  ({ children, ...props }) => (
    <table className="border rounded-md w-full text-sm" {...props}>
      {children}
    </table>
  ),
);

export const TableHead = memo<React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ children, ...props }) => (
    <thead className="bg-primary/10 rounded-md text-left" {...props}>
      {children}
    </thead>
  ),
);

export const TableBody = memo<React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
);

export const TableRow = memo<React.HTMLAttributes<HTMLTableRowElement>>(
  ({ children, ...props }) => (
    <tr className="border-b" {...props}>
      {children}
    </tr>
  ),
);

export const TableHeader = memo<React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ children, ...props }) => (
    <th className="border p-2! font-semibold" {...props}>
      {children}
    </th>
  ),
);

export const TableCell = memo<React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ children, ...props }) => (
    <td className="border p-2!" {...props}>
      {children}
    </td>
  ),
);

Table.displayName = "Table";
TableHead.displayName = "TableHead";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHeader.displayName = "TableHeader";
TableCell.displayName = "TableCell";
