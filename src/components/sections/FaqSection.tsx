import { useState } from "react";
import { faqs } from "../../data/weddingContent";
import { RevealArticle, RevealSection } from "../ui/Reveal";

export function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <RevealSection className="faq-section" ariaLabel="Domande frequenti">
      <div className="faq-header">
        <p className="eyebrow">FAQ</p>
        <h2>Domande utili</h2>
        <p>
          Piccole informazioni pratiche per arrivare sereni e godersi la
          giornata insieme a Daniel e Linda.
        </p>
      </div>

      <div className="faq-grid">
        {faqs.map((item, index) => {
          const isOpen = openFaqIndex === index;

          return (
            <RevealArticle
              className={`faq-card${isOpen ? " is-open" : ""}`}
              key={item.question}
            >
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              >
                <span className="faq-icon" aria-hidden="true" />
                <h3>{item.question}</h3>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                aria-hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </RevealArticle>
          );
        })}
      </div>
    </RevealSection>
  );
}
