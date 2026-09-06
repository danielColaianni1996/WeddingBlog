import type { ColumnDef } from "@tanstack/react-table";
import type { RsvpGuest, RsvpParty } from "../../services/weddingBlogApi";

const dateTimeFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "short",
  timeStyle: "short"
});

function getPrimaryGuest(party: RsvpParty): RsvpGuest | undefined {
  return party.guests.find((guest) => guest.isPrimaryContact) ?? party.guests[0];
}

function describeGuest(guest: RsvpGuest): string {
  const type = guest.isChild ? `Bambino, ${guest.age} anni` : "Adulto";
  const allergyNote = guest.allergies ? ` — allergie: ${guest.allergies}` : "";
  return `${guest.firstName} ${guest.lastName} (${type})${allergyNote}`;
}

type RsvpTableColumnsOptions = {
  isDeleting: boolean;
  onDelete: (party: RsvpParty) => void;
  onEdit: (party: RsvpParty) => void;
};

export function createRsvpTableColumns({
  isDeleting,
  onDelete,
  onEdit
}: RsvpTableColumnsOptions): Array<ColumnDef<RsvpParty>> {
  return [
    {
      header: "Referente",
      accessorFn: (row) => {
        const primaryGuest = getPrimaryGuest(row);
        return primaryGuest ? `${primaryGuest.firstName} ${primaryGuest.lastName}` : "-";
      }
    },
    {
      header: "Ospiti",
      cell: ({ row }) => (
        <ul className="admin-guest-list">
          {row.original.guests.map((guest) => (
            <li key={guest.id}>{describeGuest(guest)}</li>
          ))}
        </ul>
      )
    },
    {
      header: "Totale",
      accessorFn: (row) => row.guests.length
    },
    {
      header: "Note",
      accessorKey: "notes",
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
