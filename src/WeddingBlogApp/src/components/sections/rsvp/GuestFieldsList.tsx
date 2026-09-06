import type { GuestFormState } from "./types";

export const MAX_GUESTS_PER_PARTY = 12;

export function createBlankGuest(): GuestFormState {
  return {
    clientKey:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random()}`,
    firstName: "",
    lastName: "",
    isChild: false,
    age: "",
    allergies: ""
  };
}

type GuestFieldsListProps = {
  guests: Array<GuestFormState>;
  onChange: (guests: Array<GuestFormState>) => void;
};

export function GuestFieldsList({ guests, onChange }: GuestFieldsListProps) {
  const updateGuest = (index: number, patch: Partial<GuestFormState>) => {
    onChange(
      guests.map((guest, guestIndex) =>
        guestIndex === index ? { ...guest, ...patch } : guest
      )
    );
  };

  const removeGuest = (index: number) => {
    onChange(guests.filter((_, guestIndex) => guestIndex !== index));
  };

  const addGuest = () => {
    onChange([...guests, createBlankGuest()]);
  };

  return (
    <div className="guest-fields-list">
      {guests.map((guest, index) => (
        <fieldset className="guest-fields-list__guest" key={guest.clientKey}>
          <legend>{index === 0 ? "Ospite principale" : `Ospite ${index + 1}`}</legend>

          <div className="rsvp-form__grid">
            <label>
              Nome
              <input
                type="text"
                placeholder="Es. Maria"
                value={guest.firstName}
                onChange={(event) =>
                  updateGuest(index, { firstName: event.target.value })
                }
                required
              />
            </label>

            <label>
              Cognome
              <input
                type="text"
                placeholder="Es. Rossi"
                value={guest.lastName}
                onChange={(event) =>
                  updateGuest(index, { lastName: event.target.value })
                }
                required
              />
            </label>
          </div>

          <div className="rsvp-form__grid">
            <label className="guest-fields-list__checkbox">
              <input
                type="checkbox"
                checked={guest.isChild}
                onChange={(event) =>
                  updateGuest(index, {
                    isChild: event.target.checked,
                    age: event.target.checked ? guest.age : ""
                  })
                }
              />
              È un bambino
            </label>

            {guest.isChild && (
              <label>
                Età
                <input
                  type="number"
                  min="0"
                  max="17"
                  value={guest.age}
                  onChange={(event) =>
                    updateGuest(index, { age: event.target.value })
                  }
                  required
                />
              </label>
            )}
          </div>

          <label>
            Allergie o intolleranze
            <textarea
              placeholder="Es. celiachia, allergia a frutta secca..."
              value={guest.allergies}
              onChange={(event) =>
                updateGuest(index, { allergies: event.target.value })
              }
              rows={2}
            />
          </label>

          {guests.length > 1 && (
            <button
              type="button"
              className="guest-fields-list__remove"
              onClick={() => removeGuest(index)}
            >
              Rimuovi ospite
            </button>
          )}
        </fieldset>
      ))}

      <button
        type="button"
        className="guest-fields-list__add"
        onClick={addGuest}
        disabled={guests.length >= MAX_GUESTS_PER_PARTY}
      >
        + Aggiungi ospite
      </button>
    </div>
  );
}
