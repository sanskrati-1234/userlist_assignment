import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

interface TableProps<T extends object> {
  headers: ColumnDef<T, any>[];
  data: T[];
  totalRecords: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  renderSubComponent?: (row: T) => React.ReactNode;
}

const PAGE_SIZE = 10;

function Table<T extends object>({
  headers,
  data,
  totalRecords,
  currentPage,
  onPageChange,
  renderSubComponent,
}: TableProps<T>) {
  const table = useReactTable({
    columns: headers,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {},
  });

  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "2rem auto",
        borderRadius: 8,
        boxShadow: "0 2px 8px #0001",
        padding: 24,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "12px 8px",
                    borderBottom: "2px solid #eee",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              {renderSubComponent && <th style={{ width: 40 }}></th>}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr
                style={{
                  cursor: renderSubComponent ? "pointer" : "default",
                  background: row.getIsExpanded() ? "" : undefined,
                }}
                onClick={() => renderSubComponent && row.toggleExpanded()}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "10px 8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {renderSubComponent && (
                  <td style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 18 }}>
                      {row.getIsExpanded() ? "▼" : "▶"}
                    </span>
                  </td>
                )}
              </tr>
              {renderSubComponent && row.getIsExpanded() && (
                <tr>
                  <td
                    colSpan={row.getVisibleCells().length + 1}
                    style={{ background: "#f6f8fa", padding: 0 }}
                  >
                    {renderSubComponent(row.original)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              margin: "0 8px",
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              //   background: currentPage === 1 ? "#eee" : "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => onPageChange(idx + 1)}
              style={{
                margin: "0 2px",
                padding: "6px 10px",
                borderRadius: 4,
                border: "1px solid #ccc",
                // background: currentPage === idx + 1 ? "#1976d2" : "#fff",
                // color: currentPage === idx + 1 ? "#fff" : "#222",
                fontWeight: currentPage === idx + 1 ? 700 : 400,
                cursor: "pointer",
              }}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              margin: "0 8px",
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              //   background: currentPage === totalPages ? "#eee" : "#fff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
