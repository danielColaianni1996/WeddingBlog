type LoadingScreenProps = {
  isOpening: boolean;
  isReady: boolean;
  onOpen: () => void;
};

export function LoadingScreen({
  isOpening,
  isReady,
  onOpen
}: LoadingScreenProps) {
  return (
    <div
      className={`loading-screen${isOpening ? " is-envelope-opening" : ""}${
        isReady ? " is-ready" : ""
      }`}
      aria-live="polite"
    >
      <button
        className="envelope-button"
        type="button"
        onClick={onOpen}
        aria-busy={!isReady}
        aria-label="Apri l'invito di Linda e Daniel"
      >
        <span className="envelope-stage" aria-hidden="true">
          <span className="envelope-florals envelope-florals--top" />
          <span className="envelope-florals envelope-florals--bottom" />
          <span className="envelope-kicker">L&apos;AMORE FIORISCE</span>
          <span className="envelope-names">Daniel &amp; Linda</span>
          <span className="envelope">
            <span className="envelope-back" />
            <span className="envelope-side is-left" />
            <span className="envelope-side is-right" />
            <span className="envelope-front" />
            <span className="envelope-flap" />
          </span>
          <span className="wax-seal">
            <img src="/media/nexora-wax-seal-green-transparent.png" alt="" />
            <span>D·L</span>
          </span>
          <span className="envelope-open-label">Apri l&apos;invito ↗</span>
          <span className="envelope-date">
            28 · 08 · 2027 — VIGNA CHINET, TORINO
          </span>
        </span>
      </button>
    </div>
  );
}
