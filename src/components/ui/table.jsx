import * as React from "react";
import { cn } from "../../lib/utils";

const Table = React.forwardRef((props, ref) => (
  <div className="relative w-full ">
    <table
      ref={ref}
      {...props}
      className={cn("w-full caption-bottom text-sm", props.className)}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef((props, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", props.className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef((props, ref) => (
  <tbody
    ref={ref}
    {...props}
    className={cn("[&_tr:last-child]:border-0", props.className)}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef((props, ref) => (
  <tfoot
    ref={ref}
    {...props}
    className={cn(
      "border-t bg-zinc-100/50 font-medium [&>tr]:last:border-b-0 ",
      props.className
    )}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef((props, ref) => (
  <tr
    ref={ref}
    {...props}
    className={cn(
      "border-b transition-colors hover:bg-theme-1/20 data-[state=selected]:bg-zinc-100  ",
      props.className
    )}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef((props, ref) => (
  <th
    ref={ref}
    {...props}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-zinc-500 [&:has([role=checkbox])]:pr-0 ",
      props.className
    )}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef((props, ref) => (
  <td
    ref={ref}
    {...props}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", props.className)}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef((props, ref) => (
  <caption
    ref={ref}
    {...props}
    className={cn("mt-4 text-sm text-zinc-500 ", props.className)}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

