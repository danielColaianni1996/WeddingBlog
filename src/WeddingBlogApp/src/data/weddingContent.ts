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
  title: "Due strade, un solo sì",
  highlights: {
    label: "Insieme dal 2021",
    text: "Ci siamo promessi a Bormio il 21 marzo 2026"
  },
  photos: [
    {
      src: "/media/OurStory/daniel.jpeg",
      alt: "Ritratto di Daniel",
      role: "Lo sposo",
      name: "Daniel",
      bio: "Romantico quanto basta, testardo quanto serve. Ama i gin tonic, adora la tecnologia e, da buon informatico, trova sempre un modo per trasformare qualsiasi cosa in qualcosa da analizzare."
    },
    {
      src: "/media/OurStory/linda.jpeg",
      alt: "Ritratto di Linda",
      role: "La sposa",
      name: "Linda",
      bio: "Solare, dolce e determinata. Vive di momenti, adora stare con le persone che ama e organizzare tutto nei minimi dettagli. Ha sempre mille pensieri per la testa e, quando pensa di aver finito, probabilmente ne ha già iniziati altri tre."
    }
  ],
  quote:
    "\u00ab Siamo diversi in tante cose, ma alla fine la nostra forza è guardarci sempre negli occhi e trovare il nostro compromesso, quello che ci fa sorridere e andare nella stessa direzione. Il 28 agosto 2027 sarà il nostro “Sì”: il giorno in cui sceglieremo di continuare ad essere esattamente così, diversi ma sempre dalla stessa parte.  \u00bb"
} as const;

// Foto segnaposto: sostituire quando avremo la foto definitiva del viaggio di nozze.
export const giftRegistry = {
  eyebrow: "Il nostro viaggio di nozze",
  title: "Un safari in Africa e il mare delle Seychelles",
  description:
    "Il regalo che sogniamo è il nostro viaggio di nozze: un safari nella savana africana e qualche giorno di relax alle Seychelles. Se vorrete contribuire a realizzare questo sogno, per noi sarà un pensiero davvero speciale.",
  photo: {
    src: "/media/GiftRegistry/Safari.jpeg",
    alt: "Foto del viaggio di nozze in arrivo"
  },
  detailsLabel: "Come partecipare",
  note: "Seguiranno presto ulteriori aggiornamenti su come contribuire: vi faremo sapere appena tutto sarà pronto."
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
    title: "Bormio - 2026",
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
    src: "/media/Gallery/Gallery_Roma.jpg",
    alt: "Daniel e Linda a Roma",
    title: "Roma - 2021",
    caption:
      "Il nostro primo viaggio, tra strade eterne e la bellezza di scoprire quanto è bello vedere posti nuovi insieme."
  },
  {
    src: "/media/Gallery/Gallery_Sic.jpg",
    alt: "Daniel e Linda durante un viaggio in Sicilia",
    title: "Sicilia - 2024",
    caption: "Il nostro spot preferito: tramonto e mare."
  },
  {
    src: "/media/Gallery/Gallery_Pugl.jpg",
    alt: "Daniel e Linda durante un viaggio in Puglia",
    title: "Puglia - 2022",
    caption:
      "Tra i trulli, sole, mare e pasticciotti... giornate che avremmo voluto non finissero mai."
  },
  {
    src: "/media/Gallery/Gallery_SM.jpg",
    alt: "Daniel e Linda a Saint Moritz",
    title: "Saint Moritz - 2025",
    caption: "Piccole tappe tra montagne, laghi e colori d’autunno."
  }
] as const;

export const timeline = [
  {
    time: "16:00",
    title: "Ritrovo",
    text: "Accoglienza ospiti: vi aspettiamo con un drink di benvenuto per brindare all'inizio della giornata."
  },
  {
    time: "16:30",
    title: "Cerimonia",
    text: "L'inizio della promessa."
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
      "Non è previsto un dress code specifico: sentitevi liberi di scegliere ciò che vi fa sentire al meglio. Vi chiediamo solo un abbigliamento elegante e di evitare il bianco, il verde e il rosso.(Come la bandiera italiana!)"
  },
  {
    question: "Cerimonia e ricevimento saranno nello stesso luogo?",
    answer:
      "Si, sarà tutto nella stessa location, così potremo goderci ogni momento senza altri spostamenti."
  },
  {
    question: "Ci sarà parcheggio?",
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
  }
] as const;
