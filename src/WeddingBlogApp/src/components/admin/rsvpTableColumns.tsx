import type { ColumnDef } from "@tanstack/react-table";
import type { RsvpResponse } from "../../services/weddingBlogApi";

const dateTimeFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "short",
  timeStyle: "short"
});

type RsvpTableColumnsOptions = {
  isDeleting: boolean;
  onDelete: (response: RsvpResponse) => void;
  onEdit: (response: RsvpResponse) => void;
};

export function createRsvpTableColumns({
  isDeleting,
  onDelete,
  onEdit
}: RsvpTableColumnsOptions): Array<ColumnDef<RsvpResponse>> {
  return [
    {
      header: "Nome",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`
    },
    {
      header: "Adulti",
      accessorKey: "adultsCount"
    },
    {
      header: "Bambini",
      accessorKey: "childrenCount"
    },
    {
      header: "Totale",
      accessorFn: (row) => row.adultsCount + row.childrenCount
    },
    {
      header: "Allergie / preferenze",
      accessorKey: "foodNotes",
      cell: ({ getValue }) => getValue<string | undefined>() || "-"
    },
    {
      header: "Ricevuta il",
      accessorKey: "createdAtUtc",
      cell: ({ getValue }) =>
        dateTimeFormatter.format(new Date(getValue<string>()))
    },
    {
      header: "Azioni",
      cell: ({ row }) => (
        <div className="admin-row-actions">
          <button type="button" onClick={() => onEdit(row.original)}>
            Modifica
          </button>
          <button
            type="button"
            className="admin-row-actions__danger"
            onClick={() => onDelete(row.original)}
            disabled={isDeleting}
          >
            Elimina
          </button>
        </div>
      )
    }
  ];
}
