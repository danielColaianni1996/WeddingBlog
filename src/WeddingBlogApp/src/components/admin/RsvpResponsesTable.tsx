import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table";
import type { RsvpParty } from "../../services/weddingBlogApi";
import { exportRsvpResponses } from "./exportRsvpResponses";
import { createRsvpTableColumns } from "./rsvpTableColumns";
import { RsvpTableToolbar } from "./RsvpTableToolbar";

type RsvpResponsesTableProps = {
  responses: Array<RsvpParty>;
  globalFilter: string;
  isDeleting: boolean;
  isFetching: boolean;
  onCreate: () => void;
  onDelete: (party: RsvpParty) => void;
  onEdit: (party: RsvpParty) => void;
  onGlobalFilterChange: (value: string) => void;
};

export function RsvpResponsesTable({
  responses,
  globalFilter,
  isDeleting,
  isFetching,
  onCreate,
  onDelete,
  onEdit,
  onGlobalFilterChange
}: RsvpResponsesTableProps) {
  const [exportError, setExportError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const columns = createRsvpTableColumns({ isDeleting, onDelete, onEdit });

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: responses,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });
  const filteredResponses = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  const handleExport = async () => {
    setExportError(null);
    setIsExporting(true);

    try {
      await exportRsvpResponses(filteredResponses);
    } catch {
      setExportError("Esportazione non riuscita. Riprova tra poco.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="admin-table-card" aria-label="Risposte RSVP ricevute">
      <RsvpTableToolbar
        globalFilter={globalFilter}
        isExporting={isExporting}
        resultsCount={filteredResponses.length}
        onCreate={onCreate}
        onExport={() => void handleExport()}
        onGlobalFilterChange={onGlobalFilterChange}
      />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFetching && (
        <p className="admin-table-note">Aggiornamento risposte...</p>
      )}
      {exportError && <p className="admin-table-error">{exportError}</p>}
      {!isFetching && responses.length === 0 && (
        <p className="admin-table-note">Nessuna risposta ricevuta.</p>
      )}
    </section>
  );
}
