import { type FormEvent, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef
} from "@tanstack/react-table";
import {
  type RsvpResponse,
  useGetRsvpResponsesQuery,
  useLoginMutation,
  useLogoutMutation
} from "../services/weddingBlogApi";

export function AdministrationPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const {
    data: responses = [],
    isFetching,
    isError,
    refetch
  } = useGetRsvpResponsesQuery();
  const isAuthenticated = !isError;

  const columns = useMemo<Array<ColumnDef<RsvpResponse>>>(
    () => [
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
          new Intl.DateTimeFormat("it-IT", {
            dateStyle: "short",
            timeStyle: "short"
          }).format(new Date(getValue<string>()))
      }
    ],
    []
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: responses,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);

    try {
      await login(credentials).unwrap();
      setCredentials({ username: "", password: "" });
      await refetch();
    } catch {
      setLoginError("Credenziali non valide o servizio non disponibile.");
    }
  };

  const handleLogout = async () => {
    await logout().unwrap();
    await refetch();
  };

  return (
    <main className="administration-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Administration</p>
            <h1>Risposte RSVP</h1>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              className="admin-secondary-action"
              onClick={handleLogout}
              disabled={isLogoutLoading}
            >
              Logout
            </button>
          )}
        </header>

        {!isAuthenticated ? (
          <form className="admin-login-card" onSubmit={handleLogin}>
            <h2>Accesso area riservata</h2>
            <label>
              Username
              <input
                type="text"
                value={credentials.username}
                onChange={(event) =>
                  setCredentials((currentValue) => ({
                    ...currentValue,
                    username: event.target.value
                  }))
                }
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((currentValue) => ({
                    ...currentValue,
                    password: event.target.value
                  }))
                }
                autoComplete="current-password"
                required
              />
            </label>
            {loginError && <p className="admin-form-error">{loginError}</p>}
            <button type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? "Accesso in corso" : "Accedi"}
            </button>
          </form>
        ) : (
          <section
            className="admin-table-card"
            aria-label="Risposte RSVP ricevute"
          >
            <div className="admin-table-toolbar">
              <label>
                Filtra risposte
                <input
                  type="search"
                  value={globalFilter}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  placeholder="Cerca nome, allergie, numero..."
                />
              </label>
              <span>{table.getFilteredRowModel().rows.length} risultati</span>
            </div>

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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
            {!isFetching && responses.length === 0 && (
              <p className="admin-table-note">Nessuna risposta ricevuta.</p>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
