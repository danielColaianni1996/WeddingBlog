import { type FormEvent, useState } from "react";
import { AdminLoginForm } from "../components/admin/AdminLoginForm";
import { AdminRsvpModal } from "../components/admin/AdminRsvpModal";
import { RsvpResponsesTable } from "../components/admin/RsvpResponsesTable";
import {
  initialRsvpFormState,
  toAdminFormState,
  toRsvpRequest
} from "../components/admin/rsvpFormState";
import type {
  AdminRsvpFormState,
  RsvpModalMode
} from "../components/admin/types";
import {
  type RsvpResponse,
  useCreateRsvpResponseMutation,
  useDeleteRsvpResponseMutation,
  useGetRsvpResponsesQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdateRsvpResponseMutation
} from "../services/weddingBlogApi";

export function AdministrationPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<RsvpModalMode | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [rsvpForm, setRsvpForm] = useState(initialRsvpFormState);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [createRsvpResponse, { isLoading: isCreating }] =
    useCreateRsvpResponseMutation();
  const [updateRsvpResponse, { isLoading: isUpdating }] =
    useUpdateRsvpResponseMutation();
  const [deleteRsvpResponse, { isLoading: isDeleting }] =
    useDeleteRsvpResponseMutation();
  const {
    data: responses = [],
    isFetching,
    isError,
    refetch
  } = useGetRsvpResponsesQuery();
  const isAuthenticated = !isError;
  const isSaving = isCreating || isUpdating;

  const updateRsvpForm = (field: keyof AdminRsvpFormState, value: string) => {
    setRsvpForm((currentValue) => ({ ...currentValue, [field]: value }));
  };

  const resetModalState = () => {
    setModalMode(null);
    setEditingId(null);
    setRsvpForm(initialRsvpFormState);
    setFormMessage(null);
    setFormError(null);
  };

  const closeRsvpModal = () => {
    if (!isSaving) {
      resetModalState();
    }
  };

  const openCreateModal = () => {
    resetModalState();
    setModalMode("create");
  };

  const openEditModal = (response: RsvpResponse) => {
    setModalMode("edit");
    setEditingId(response.id);
    setRsvpForm(toAdminFormState(response));
    setFormMessage(null);
    setFormError(null);
  };

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
    resetModalState();
    await refetch();
  };

  const handleSaveRsvp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setFormError(null);
    const request = toRsvpRequest(rsvpForm);

    try {
      if (modalMode === "edit" && editingId) {
        await updateRsvpResponse({ id: editingId, body: request }).unwrap();
        setFormMessage("Modifica salvata correttamente.");
      } else {
        await createRsvpResponse(request).unwrap();
        setRsvpForm(initialRsvpFormState);
        setFormMessage("Invitato aggiunto correttamente.");
      }
    } catch {
      setFormError("Salvataggio non riuscito. Controlla i dati e riprova.");
    }
  };

  const handleDelete = async (response: RsvpResponse) => {
    const shouldDelete = window.confirm(
      `Eliminare la risposta di ${response.firstName} ${response.lastName}?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteRsvpResponse(response.id).unwrap();
      if (editingId === response.id) {
        resetModalState();
      }
    } catch {
      setFormError("Eliminazione non riuscita. Riprova tra poco.");
    }
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
            <div className="admin-header-actions">
              <button
                type="button"
                className="admin-secondary-action"
                onClick={handleLogout}
                disabled={isLogoutLoading}
              >
                Logout
              </button>
            </div>
          )}
        </header>

        {!isAuthenticated ? (
          <AdminLoginForm
            credentials={credentials}
            error={loginError}
            isLoading={isLoginLoading}
            onCredentialsChange={setCredentials}
            onSubmit={handleLogin}
          />
        ) : (
          <RsvpResponsesTable
            responses={responses}
            globalFilter={globalFilter}
            isDeleting={isDeleting}
            isFetching={isFetching}
            onDelete={handleDelete}
            onEdit={openEditModal}
            onCreate={openCreateModal}
            onGlobalFilterChange={setGlobalFilter}
          />
        )}
      </section>

      {isAuthenticated && modalMode && (
        <AdminRsvpModal
          mode={modalMode}
          formState={rsvpForm}
          message={formMessage}
          error={formError}
          isSaving={isSaving}
          onChange={updateRsvpForm}
          onClose={closeRsvpModal}
          onSubmit={handleSaveRsvp}
        />
      )}
    </main>
  );
}
