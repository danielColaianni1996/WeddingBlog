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
