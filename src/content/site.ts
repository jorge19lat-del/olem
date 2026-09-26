// Todo el copy y los datos editables de la landing viven aquí.
// Para cambiar textos, precios o redes no hace falta tocar los componentes.

export const site = {
  name: "Olem",
  /** Logotipo en dos líneas: «Olem» en cursiva y «STUDIO» en mayúsculas. */
  wordmark: { name: "Olem", suffix: "Studio" },
  title: "Olem Studio",
  /** Dominio canónico: el que aparece en las previews al compartir la web. */
  url: "https://www.olem.es",
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
    alt: "Mapa de la isla de Annobón dibujado con curvas de nivel blancas",
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
    "Dos camisetas concebidas para representar a una isla. Dos diseños que reflejan su esencia y su identidad, dentro y fuera de ella.",
  cta: "Reservar la mía",
  products: [
    {
      id: "pufferfish",
      name: "Pufferfish T-shirt",
      subtitle: "Camiseta · corte clásico",
      description:
        "Un homenaje a la isla, su paisaje y su identidad. Con referencias a las localidades de Awal, Mebana y Anganchi, y el motivo del pez globo.",
      price: 25,
      sizes: ["S", "M", "L", "XL"],
      image: { src: "/images/pufferfish.webp", width: 1219, height: 1183 },
      imageAlt: "Camiseta blanca Pufferfish con el pez globo azul y el texto «Isla de Annobón»",
    },
    {
      id: "baby-tee",
      name: "Annobón Baby Tee",
      subtitle: "Camiseta · corte ajustado",
      description:
        "Crop top inspirado en Annobón, una pequeña isla volcánica del Atlántico con una riqueza cultural única.",
      price: 20,
      sizes: ["XS", "S", "M", "L"],
      image: { src: "/images/baby-tee.webp", width: 1059, height: 980 },
      imageAlt: "Baby tee blanca acanalada con «Annobón, isla bonita» en letra cursiva negra",
    },
  ] satisfies Product[],
};

export const waitlist = {
  eyebrow: "03 — Preventa",
  heading: "Acceso anticipado",
  body: "El primer drop será exclusivo en preventa. Déjanos tus datos y la talla que te interesa, y te escribiremos personalmente cuando esa talla esté disponible para que puedas acceder a ella antes del lanzamiento general.",
  success: {
    title: "Estás dentro.",
    body: "Te escribiremos cuando tu talla esté disponible. Gracias por llegar tan pronto.",
  },
};

export const footer = {
  /** Miniatura que enlaza al Instagram de la marca. */
  instagram: {
    label: "Sé parte de Olem",
    image: { src: "/images/caracola.webp", width: 320, height: 320 },
    imageAlt: "Caracola en espiral tallada en piedra",
  },
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
