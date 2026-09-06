import writeXlsxFile, { type Row } from "write-excel-file/browser";
import type { RsvpParty } from "../../services/weddingBlogApi";

const dateTimeFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "short",
  timeStyle: "short"
});

function getExportFileName() {
  return `rsvp-${new Date().toISOString().slice(0, 10)}.xlsx`;
}

function toExportRows(parties: Array<RsvpParty>): Array<Row> {
  return [
    [
      "Referente",
      "Nome",
      "Cognome",
      "Tipo",
      "Età",
      "Allergie",
      "Note nucleo",
      "Ricevuta il"
    ],
    ...parties.flatMap((party) => {
      const primaryGuest =
        party.guests.find((guest) => guest.isPrimaryContact) ?? party.guests[0];
      const referente = primaryGuest
        ? `${primaryGuest.firstName} ${primaryGuest.lastName}`
        : "-";
      const receivedAt = dateTimeFormatter.format(new Date(party.createdAtUtc));

      return party.guests.map((guest) => [
        referente,
        guest.firstName,
        guest.lastName,
        guest.isChild ? "Bambino" : "Adulto",
        guest.age ?? "",
        guest.allergies ?? "",
        party.notes ?? "",
        receivedAt
      ]);
    })
  ];
}

export async function exportRsvpResponses(parties: Array<RsvpParty>) {
  await writeXlsxFile(toExportRows(parties), {
    sheet: "RSVP",
    columns: [
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 10 },
      { width: 8 },
      { width: 30 },
      { width: 30 },
      { width: 18 }
    ]
  }).toFile(getExportFileName());
}
