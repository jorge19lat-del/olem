// Todo el copy y los datos editables de la landing viven aquí.
// Para cambiar textos, precios o redes no hace falta tocar los componentes.

export const site = {
  name: "Olem",
  /** Logotipo en dos líneas: «Olem» en cursiva y «STUDIO» en mayúsculas. */
  wordmark: { name: "Olem", suffix: "Studio" },
  title: "Olem Studio",
  description:
    "Olem es una casa cultural de joyería y objetos con raíces en la isla de Annobón. Preventa del Drop 01: apúntate a la lista.",
  instagram: {
    handle: "@olem___studio",
    url: "https://www.instagram.com/olem___studio/",
  },
  coordinates: "1°25′ S · 5°38′ E",
};

export const hero = {
  lede: "Creamos piezas destinadas a ser vividas, objetos para acompañar el proceso de convertirse en quien uno quiere llegar a ser.",
  cta: "Unirme a la preventa",
  imageAlt: "Acantilados volcánicos de la costa y mar azul con reflejos de sol",
  caption: "Fig. 01 — Annobón, mar abierto",
};

export const story = {
  /** Cada capítulo es una lista de párrafos. */
  chapters: [
    {
      number: "I",
      title: "Origen",
      body: [
        "«Olem» significa «remo» en fa d’Ambô, la lengua hablada en la isla de Annobón. No se trata de cualquier remo, sino del utilizado para navegar el océano Atlántico que rodea la isla.",
        "Más que un objeto, representa un gesto: avanzar incluso cuando el mar se vuelve difícil. Levantado en el aire, simboliza una petición de ayuda. Una palabra heredada de generación en generación.",
      ],
    },
    {
      number: "II",
      title: "Construirse",
      body: [
        "Empieza cuando comenzamos a elegir y nunca termina.",
        "Nos construyen las personas que amamos, los lugares que habitamos, los libros que leemos, las conversaciones que nos transforman, los viajes, la memoria, el tiempo y también los objetos que decidimos conservar.",
        "Cada decisión deja una huella.",
        "Cada huella participa en aquello que terminamos siendo.",
      ],
    },
    {
      number: "III",
      title: "Nuestra filosofía",
      body: [
        "En Olem creemos que construirse es uno de los actos más importantes de una vida. Significa elegir. Elegir qué conservar. Qué dejar atrás. Qué aprender. Qué desaprender. Qué sueños perseguir. Qué historias seguir contando.",
        "No creemos que la identidad sea algo fijo, creemos que estamos en constante construcción.",
        "Por eso nuestros objetos no existen para definir quién eres.",
        "Existen para acompañarte mientras te conviertes en quien quieres llegar a ser.",
      ],
    },
  ],
  /** Mapa de Annobón en curvas de nivel, en el centro de la sección. */
  map: {
    alt: "Mapa de la isla de Annobón en curvas de nivel blancas: San Antonio de Palea al norte, el lago Mazafim, el monte Quioveo y San Antonio del Sur",
  },
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  sizes: string[];
  /** PNG/WebP con fondo transparente; width/height son los píxeles reales del archivo. */
  image: { src: string; width: number; height: number };
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
      image: { src: "/images/pufferfish.webp", width: 1219, height: 1183 },
      imageAlt: "Camiseta blanca Pufferfish con el pez globo azul y el texto «Isla de Annobón»",
    },
    {
      id: "baby-tee",
      name: "Baby Tee",
      subtitle: "Camiseta · corte ajustado",
      description:
        "Corte corto y ajustado, en punto acanalado, con «Annobón, isla bonita» en cursiva. Pensada para llevarla todos los días, sin ceremonia.",
      price: 20,
      sizes: ["XS", "S", "M", "L"],
      image: { src: "/images/baby-tee.webp", width: 1059, height: 980 },
      imageAlt: "Baby tee blanca acanalada con «Annobón, isla bonita» en letra cursiva negra",
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
