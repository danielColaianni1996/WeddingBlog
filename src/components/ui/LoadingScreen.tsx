type LoadingScreenProps = {
  isScratching?: boolean;
};

export function LoadingScreen({ isScratching = false }: LoadingScreenProps) {
  return (
    <div
      className={`loading-screen${isScratching ? " is-loading-complete" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-card">
        <div className="loading-copy">
          <p className="loading-names">Daniel e Linda</p>
          <h1>Getting married</h1>
        </div>

        <span className="loading-spinner" aria-hidden="true" />
      </div>
    </div>
  );
}
