export const weddingDate = new Date("2027-08-28T16:30:00+02:00");

export const weddingImages = {
  cover: "/media/weddingHero.jpg",
  location: "/media/location.jpg",
  story:
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=75"
} as const;

// I due `src` sono placeholder: sostituire con i ritratti reali in /media/OurStory.
export const ourStory = {
  eyebrow: "La nostra storia",
  title: "Due strade, un solo si",
  highlights: {
    label: "Insieme dal 2020",
    text: "Ci siamo promessi a Bormio il 21 marzo 2026"
  },
  photos: [
    {
      src: "/media/OurStory/portrait-placeholder.svg",
      alt: "Ritratto di Daniel",
      role: "Lo sposo",
      name: "Daniel",
      bio: "Quello che organizza gli itinerari, prenota i voli e conta i giorni: a Bormio ha tirato fuori l'anello con le mani che tremavano."
    },
    {
      src: "/media/OurStory/portrait-placeholder.svg",
      alt: "Ritratto di Linda",
      role: "La sposa",
      name: "Linda",
      bio: "Quella che trova sempre il posto giusto per il tramonto, dalla Sicilia a Nusa Penida. Il 21 marzo 2026 ha detto si senza pensarci."
    }
  ],
  quote:
    "\u00ab Il primo viaggio insieme e stato Roma, nel 2021. Poi la Puglia, Londra, la Sicilia, l'Egitto, Bali. Il 28 agosto 2027, alla Vigna Chinet, partiamo per quello che non finisce. \u00bb"
} as const;

export const galleryImages = [
  {
    src: "/media/Gallery/Gallery_Eg.jpg",
    alt: "Daniel e Linda davanti alle piramidi in Egitto",
    title: "Egitto - 2025",
    caption: "Insieme, davanti a una meraviglia senza tempo."
  },
  {
    src: "/media/Gallery/gallery_yes.jpg",
    alt: "Daniel e Linda nel giorno della proposta",
    title: "She said YES! - 21/03/2026 Bormio",
    caption: "Il momento in cui il nostro viaggio è diventato per sempre."
  },
  {
    src: "/media/Gallery/Gallery_ldn.jpg",
    alt: "Daniel e Linda durante un viaggio a Londra",
    title: "Londra - 2023",
    caption: "Una città da scoprire, un ricordo da portare con noi."
  },
  {
    src: "/media/Gallery/Gallery_Nusa.jpg",
    alt: "Daniel e Linda a Nusa Penida",
    title: "Bali - 2026",
    caption: "Ammirando una delle spiagge più belle al mondo."
  },
  {
    src: "/media/Gallery/Gallery_Pugl.jpg",
    alt: "Daniel e Linda durante un viaggio in Puglia",
    title: "Puglia - 2022",
    caption:
      "Tra i trulli, luce, mare e pasticciotti... giornate che avremmo voluto non finissero mai."
  },
  {
    src: "/media/Gallery/Gallery_Roma.jpg",
    alt: "Daniel e Linda a Roma",
    title: "Roma - 2021",
    caption:
      "Il nostro primo viaggio insieme, tra strade eterne e la bellezza di scoprire quanto è bello vedere posti nuovi insieme."
  },
  {
    src: "/media/Gallery/Gallery_Sic.jpg",
    alt: "Daniel e Linda durante un viaggio in Sicilia",
    title: "Sicilia - 2024",
    caption: "Il nostro spot preferito: tramonto e mare."
  },
  {
    src: "/media/Gallery/Gallery_SM.jpg",
    alt: "Daniel e Linda a Saint Moritz",
    title: "Saint Moritz - 2025",
    caption: "Piccole tappe insieme tra montagne, lago e colori d'autunno."
  }
] as const;

export const timeline = [
  {
    time: "16:00",
    title: "Ritrovo",
    text: "Accoglienza ospiti: vi aspettiamo con un drink di benvenuto per brindare insieme all'inizio della giornata."
  },
  {
    time: "16:30",
    title: "Cerimonia",
    text: "Inizio della promessa."
  },
  {
    time: "18:00",
    title: "Aperitivo",
    text: "Brindisi, musica e primi assaggi nel giardino."
  },
  {
    time: "20:00",
    title: "Cena",
    text: "Tavoli imbanditi, racconti da condividere e il piacere di assaporare ogni portata."
  },
  {
    time: "23:00",
    title: "Festa",
    text: "Torta, ultimo brindisi sotto le luci e party serale con dj set."
  }
] as const;

export const weddingLocation = {
  name: "Vigna Chinet",
  hours: "Dalle 16:00 alle 02:00",
  address: "Via Mirabello, 3/D, 10132 Torino TO",
  imageAlt: "Vigna Chinet a Torino",
  description:
    "Cerimonia e ricevimento si svolgeranno entrambi qui. Una volta arrivati, potrete godervi tutta la giornata senza altri spostamenti.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Vigna%20Chinet%20Via%20Mirabello%203%2FD%2010132%20Torino%20TO"
} as const;

export const faqs = [
  {
    question: "E previsto un dress code?",
    answer:
      "Non è previsto un dress code specifico: sentitevi liberi di scegliere ciò che vi fa sentire al meglio. Vi chiediamo solo un abbigliamento elegante e di evitare il bianco, il verde e il rosso."
  },
  {
    question: "Cerimonia e ricevimento saranno nello stesso luogo?",
    answer:
      "Si, sarà tutto nella stessa location, così potremo goderci ogni momento insieme senza altri spostamenti."
  },
  {
    question: "Ci sara parcheggio?",
    answer:
      "Si, presso la location è presente un grande parcheggio a disposizione degli invitati. Sarà presente un parcheggiatore che fornirà indicazioni per i posti auto."
  },
  {
    question: "Come comunicare allergie o esigenze alimentari?",
    answer:
      "Vi chiediamo di comunicarci eventuali allergie o esigenze alimentari nel form di conferma della partecipazione. Vi chiediamo di farlo entro il 30 luglio 2027, così da poter organizzare al meglio il servizio di catering."
  },
  {
    question: "I bambini sono invitati?",
    answer:
      "Si, certo. I più piccoli sono i benvenuti: ci farà piacere condividere la giornata anche con loro."
  },
  {
    question: "É prevista una lista nozze?",
    answer:
      "No, la vostra presenza è il regalo più bello per noi. Se desiderate comunque farci un pensiero, potete contribuire alla nostra luna di miele tramite bonifico bancario. Nell'invito cartaceo saranno presenti i dettagli."
  }
] as const;
