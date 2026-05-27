import type { CSSProperties } from "react";

type LoadingScreenProps = {
  isScratching?: boolean;
};

const confettiPieces = Array.from({ length: 24 }, (_, index) => index);

export function LoadingScreen({ isScratching = false }: LoadingScreenProps) {
  return (
    <div
      className={`loading-screen${isScratching ? " is-scratching" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-card">
        <div className="scratch-stage">
          <div className="confetti-burst" aria-hidden="true">
            {confettiPieces.map((index) => (
              <span
                key={index}
                style={{ "--confetti-index": index } as CSSProperties}
              />
            ))}
          </div>

          <div className="scratch-reveal">
            <p className="loading-names">Daniel e Linda</p>
            <h1>getting married</h1>
          </div>

          <div className="scratch-panel" aria-hidden="true">
            <span />
          </div>
        </div>

        <div className="scratch-dust" aria-hidden="true">
          {confettiPieces.slice(0, 12).map((index) => (
            <span
              key={index}
              style={{ "--confetti-index": index } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
