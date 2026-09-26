// Todo el copy y los datos editables de la landing viven aquí.
// Para cambiar textos, precios o redes no hace falta tocar los componentes.

export const site = {
  name: "Olem",
  title: "Olem — Casa cultural de Annobón",
  description:
    "Olem es una casa cultural de joyería y objetos con raíces en la isla de Annobón. Preventa del Drop 01: apúntate a la lista.",
  instagram: {
    handle: "@olem___studio",
    url: "https://www.instagram.com/olem___studio/",
  },
  coordinates: "1°25′ S · 5°38′ E",
};

export const hero = {
  lede: "Joyería y objetos hechos desde una isla pequeña en mitad del Golfo de Guinea. Piezas para llevar encima la memoria de un lugar — y lo que decides llegar a ser.",
  cta: "Unirme a la preventa",
  imageAlt: "Retrato editorial de Olem",
  caption: "Fig. 01 — Annobón, mar abierto",
};

export const story = {
  eyebrow: "01 — Origen",
  heading: ["Convertirse", "en."],
  pullQuote: "No hacemos producto. Guardamos una forma de mirar y la ponemos en circulación.",
  chapters: [
    {
      number: "I",
      title: "El nombre",
      body: "Olem es una palabra pequeña que carga una idea grande: el paso de ser a llegar a ser. No nombra un objeto, nombra un movimiento. Por eso Olem no es una marca que vende cosas, sino una casa donde las cosas cuentan de dónde vienen.",
    },
    {
      number: "II",
      title: "La isla",
      body: "Annobón es una isla volcánica de apenas diecisiete kilómetros cuadrados, al sur del ecuador, lejos de casi todo. Allí se habla fá d’ambô, se vive de cara al mar y la herencia pasa de mano en mano. Esa distancia es nuestro territorio emocional: un origen que no cabe en el mapa pero sí en el cuerpo.",
    },
    {
      number: "III",
      title: "La filosofía",
      body: "Cada pieza es un punto de partida, no un final. Diseñamos objetos para acompañar un proceso — el de quien los lleva — con materiales honestos, series cortas y símbolos que vienen de la isla: el mar, la pesca, el pez globo que se hace grande para protegerse.",
    },
  ],
  imageAlt: "Detalle de textura y mar de Annobón",
  caption: "Fig. 02 — Herencia, mano a mano",
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  sizes: string[];
  image: string;
  imageAlt: string;
};

export const drop = {
  eyebrow: "02 — Primer drop",
  heading: "Drop 01",
  intro:
    "Dos camisetas para abrir la casa. Tirada corta, preventa por lista: primero te apuntas, luego te avisamos para reservar la tuya antes que nadie.",
  cta: "Reservar la mía",
  products: [
    {
      id: "pufferfish",
      name: "Pufferfish",
      subtitle: "Camiseta · corte clásico",
      description:
        "El pez globo de Annobón: se hace grande cuando lo necesita. Algodón de gramaje pesado, corte recto, estampado frontal.",
      price: 25,
      sizes: ["S", "M", "L", "XL"],
      image: "/images/pufferfish.jpg",
      imageAlt: "Camiseta Pufferfish de Olem",
    },
    {
      id: "baby-tee",
      name: "Baby Tee",
      subtitle: "Camiseta · corte ajustado",
      description:
        "Corte corto y ajustado, con el sello de Olem. Pensada para llevarla todos los días, sin ceremonia.",
      price: 20,
      sizes: ["XS", "S", "M", "L"],
      image: "/images/baby-tee.jpg",
      imageAlt: "Baby tee de Olem",
    },
  ] satisfies Product[],
};

export const waitlist = {
  eyebrow: "03 — Preventa",
  heading: "Lista de preventa",
  body: "Aún no hay tienda. El Drop 01 se reserva por lista: déjanos tu nombre y tu email y te escribiremos antes de abrir, con acceso prioritario y la talla que elijas.",
  notes: ["Sin pago ahora", "Acceso antes que nadie", "Tirada corta"],
  success: {
    title: "Estás dentro.",
    body: "Te escribiremos antes de abrir la preventa. Gracias por llegar tan pronto.",
  },
};

export const footer = {
  tagline: "Casa cultural. Annobón — mundo.",
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

export const allSizes = ["XS", "S", "M", "L", "XL"];
