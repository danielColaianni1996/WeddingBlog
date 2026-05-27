export const weddingDate = new Date("2027-08-28T16:30:00+02:00");

export const weddingImages = {
  cover:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=75",
  saveTheDate:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=75",
  location: "/media/location.jpg",
  story:
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=75"
} as const;

export const timeline = [
  {
    time: "16:30",
    title: "Cerimonia",
    text: "Accoglienza degli invitati e inizio della promessa."
  },
  {
    time: "18:00",
    title: "Aperitivo",
    text: "Brindisi, musica e primi assaggi nel giardino."
  },
  {
    time: "20:00",
    title: "Cena",
    text: "Tavoli, racconti, portate lente e un po di sorpresa."
  },
  {
    time: "23:00",
    title: "Festa",
    text: "Dance floor, torta e ultimo brindisi sotto le luci."
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
      "No, nessun dress code obbligatorio: scegliete un look elegante e comodo, con cui sentirvi voi stessi per tutta la giornata."
  },
  {
    question: "Cerimonia e ricevimento saranno nello stesso luogo?",
    answer:
      "Si, sara tutto nella stessa location. Una volta arrivati potrete godervi cerimonia, ricevimento e festa senza altri spostamenti."
  },
  {
    question: "I bambini sono invitati?",
    answer:
      "Si, certo. I piu piccoli sono i benvenuti: ci fara piacere condividere la giornata anche con loro."
  },
  {
    question: "Ci sara parcheggio?",
    answer:
      "Si, presso la location e presente un grande parcheggio a disposizione degli invitati."
  }
] as const;
