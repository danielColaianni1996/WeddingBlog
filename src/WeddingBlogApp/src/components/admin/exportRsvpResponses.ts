import writeXlsxFile, { type Row } from "write-excel-file/browser";
import type { RsvpResponse } from "../../services/weddingBlogApi";

const dateTimeFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "short",
  timeStyle: "short"
});

function getExportFileName() {
  return `rsvp-${new Date().toISOString().slice(0, 10)}.xlsx`;
}

function toExportRows(responses: Array<RsvpResponse>): Array<Row> {
  return [
    [
      "Nome",
      "Cognome",
      "Adulti",
      "Bambini",
      "Totale",
      "Allergie / preferenze",
      "Ricevuta il"
    ],
    ...responses.map((response) => [
      response.firstName,
      response.lastName,
      response.adultsCount,
      response.childrenCount,
      response.adultsCount + response.childrenCount,
      response.foodNotes ?? "",
      dateTimeFormatter.format(new Date(response.createdAtUtc))
    ])
  ];
}

export async function exportRsvpResponses(responses: Array<RsvpResponse>) {
  await writeXlsxFile(toExportRows(responses), {
    sheet: "RSVP",
    columns: [
      { width: 18 },
      { width: 18 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 34 },
      { width: 18 }
    ]
  }).toFile(getExportFileName());
}
