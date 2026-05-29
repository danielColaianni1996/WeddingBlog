import type { FormEvent } from "react";

type AdminLoginFormProps = {
  credentials: {
    username: string;
    password: string;
  };
  error: string | null;
  isLoading: boolean;
  onCredentialsChange: (credentials: {
    username: string;
    password: string;
  }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AdminLoginForm({
  credentials,
  error,
  isLoading,
  onCredentialsChange,
  onSubmit
}: AdminLoginFormProps) {
  return (
    <form className="admin-login-card" onSubmit={onSubmit}>
      <h2>Accesso area riservata</h2>
      <label>
        Username
        <input
          type="text"
          value={credentials.username}
          onChange={(event) =>
            onCredentialsChange({
              ...credentials,
              username: event.target.value
            })
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
            onCredentialsChange({
              ...credentials,
              password: event.target.value
            })
          }
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="admin-form-error">{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Accesso in corso" : "Accedi"}
      </button>
    </form>
  );
}
