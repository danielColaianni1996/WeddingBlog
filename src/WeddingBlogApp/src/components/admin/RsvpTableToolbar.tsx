type RsvpTableToolbarProps = {
  globalFilter: string;
  isExporting: boolean;
  resultsCount: number;
  onCreate: () => void;
  onExport: () => void;
  onGlobalFilterChange: (value: string) => void;
};

export function RsvpTableToolbar({
  globalFilter,
  isExporting,
  resultsCount,
  onCreate,
  onExport,
  onGlobalFilterChange
}: RsvpTableToolbarProps) {
  return (
    <div className="admin-table-toolbar">
      <label>
        Filtra risposte
        <input
          type="search"
          value={globalFilter}
          onChange={(event) => onGlobalFilterChange(event.target.value)}
          placeholder="Cerca nome, allergie, numero..."
        />
      </label>
      <div className="admin-table-toolbar__actions">
        <span>{resultsCount} risultati</span>
        <button
          type="button"
          className="admin-secondary-action"
          onClick={onExport}
          disabled={isExporting || resultsCount === 0}
        >
          {isExporting ? "Esportazione..." : "Esporta Excel"}
        </button>
        <button
          type="button"
          className="admin-primary-action"
          onClick={onCreate}
        >
          Aggiungi invitato
        </button>
      </div>
    </div>
  );
}
