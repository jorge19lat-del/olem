// Todo el copy y los datos editables de la landing viven aquí.
// Para cambiar textos, precios o redes no hace falta tocar los componentes.

export const site = {
  name: "Olem",
  /** Logotipo en dos líneas: «Olem» en cursiva y «STUDIO» en mayúsculas. */
  wordmark: { name: "Olem", suffix: "Studio" },
  title: "Olem Studio",
  /** Dominio canónico: el que aparece en las previews al compartir la web. */
  url: "https://www.olem.es",
  /** Texto de la preview al compartir la web y de los buscadores: el mismo que la entradilla de la hero. */
  description:
    "Creamos piezas destinadas a ser vividas, objetos para acompañar el proceso de convertirse en quien uno quiere llegar a ser.",
  instagram: {
    handle: "@olem___studio",
    url: "https://www.instagram.com/olem___studio/",
  },
  coordinates: "1°25′ S · 5°38′ E",
};

/** Menú de la web: aparece en la portada y en la cabecera de las páginas de producto. */
export const navigation = [
  { label: "Drop 01", href: "/#drop" },
  { label: "Origen", href: "/#origen" },
  { label: "Preventa", href: "/#preventa" },
];

export const hero = {
  lede: site.description,
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

/** Tallas de todas las camisetas, de la más pequeña a la más grande. */
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

/**
 * Cada pieza de la galería de un producto.
 * - packshot: PNG/WebP con fondo transparente, se muestra sobre un fondo liso.
 * - photo / video: fotos y vídeos del producto (el vídeo se reproduce en bucle, sin sonido).
 * width/height son los píxeles reales del archivo; `wide` ocupa las dos columnas en escritorio.
 */
export type ProductMedia = {
  kind: "packshot" | "photo" | "video";
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Solo vídeos: imagen que se ve mientras carga. */
  poster?: string;
  wide?: boolean;
  /** Proporción del recuadro (p. ej. "3/4") si no queremos la del archivo. */
  aspect?: string;
};

export type Product = {
  id: string;
  /** Dirección de su página: /productos/<slug>. */
  slug: string;
  name: string;
  subtitle: string;
  /** Corte de la camiseta, se muestra junto al selector de talla. */
  fit: string;
  description: string;
  price: number;
  sizes: string[];
  /** PNG/WebP con fondo transparente; width/height son los píxeles reales del archivo. */
  image: { src: string; width: number; height: number };
  imageAlt: string;
  /** Galería de la página de producto, en el orden en que se muestra. */
  gallery: ProductMedia[];
  /** Desplegables de la ficha: detalles, talla y corte, cuidados… */
  info: { title: string; body: string[] }[];
};

const preorderInfo = {
  title: "Preventa y envíos",
  body: [
    "El Drop 01 es exclusivo en preventa: reservar no tiene ningún coste ni compromiso.",
    "Cuando tu talla esté disponible te escribiremos personalmente para confirmar el pedido y el envío, antes del lanzamiento general.",
  ],
};

const careInfo = {
  title: "Cuidados",
  body: [
    "Lavar del revés a 30 °C con colores similares.",
    "No usar secadora. Planchar del revés, sin pasar la plancha sobre el estampado.",
  ],
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
      slug: "pufferfish-t-shirt",
      name: "Pufferfish T-shirt",
      subtitle: "Camiseta · corte oversize",
      fit: "Corte oversize",
      description:
        "Un homenaje a la isla, su paisaje y su identidad. Con referencias a las localidades de Awal, Mebana y Anganchi, y el motivo del pez globo.",
      price: 25,
      sizes: SIZES,
      image: { src: "/images/pufferfish.webp", width: 1219, height: 1183 },
      imageAlt: "Camiseta blanca Pufferfish con el pez globo azul y el texto «Isla de Annobón»",
      gallery: [
        // Pendiente: añadir la foto PNG de la espalda cuando esté lista.
        {
          kind: "packshot",
          src: "/images/pufferfish.webp",
          width: 1219,
          height: 1183,
          alt: "Camiseta blanca Pufferfish con el pez globo azul y el texto «Isla de Annobón»",
          aspect: "3/4",
        },
        {
          kind: "video",
          src: "/videos/pufferfish-roca.mp4",
          poster: "/images/productos/pufferfish-roca-poster.webp",
          width: 464,
          height: 832,
          alt: "La Pufferfish T-shirt extendida sobre una roca volcánica junto al mar",
          aspect: "3/4",
        },
      ],
      info: [
        {
          title: "Detalles",
          body: [
            "Camiseta blanca de manga corta con estampado del pez globo y el texto «Isla de Annobón».",
            "Referencias a las localidades de Awal, Mebana y Anganchi.",
          ],
        },
        {
          title: "Talla y corte",
          body: [
            "Corte oversize: holgado y con el hombro caído.",
            "Elige tu talla habitual para el efecto oversize, o una talla menos si la prefieres más ajustada.",
          ],
        },
        careInfo,
        preorderInfo,
      ],
    },
    {
      id: "baby-tee",
      slug: "annobon-baby-tee",
      name: "Annobón Baby Tee",
      subtitle: "Camiseta · corte ajustado",
      fit: "Corte ajustado · crop",
      description:
        "Crop top inspirado en Annobón, una pequeña isla volcánica del Atlántico con una riqueza cultural única.",
      price: 15,
      sizes: SIZES,
      image: { src: "/images/baby-tee.webp", width: 1059, height: 980 },
      imageAlt: "Baby tee blanca acanalada con «Annobón, isla bonita» en letra cursiva negra",
      gallery: [
        {
          kind: "packshot",
          src: "/images/baby-tee.webp",
          width: 1059,
          height: 980,
          alt: "Baby tee blanca acanalada con «Annobón, isla bonita» en letra cursiva negra",
          wide: true,
        },
        {
          kind: "photo",
          src: "/images/productos/baby-tee-suelo.webp",
          width: 1600,
          height: 1200,
          alt: "La Annobón Baby Tee extendida sobre un suelo de madera gris",
          wide: true,
        },
        {
          kind: "video",
          src: "/videos/baby-tee-mar-color.mp4",
          poster: "/images/productos/baby-tee-mar-color-poster.webp",
          width: 576,
          height: 768,
          alt: "La Annobón Baby Tee flotando en el agua clara de la orilla",
        },
        {
          kind: "video",
          src: "/videos/baby-tee-mar.mp4",
          poster: "/images/productos/baby-tee-mar-poster.webp",
          width: 576,
          height: 768,
          alt: "La Annobón Baby Tee flotando en el mar, en blanco y negro",
        },
        {
          kind: "photo",
          src: "/images/productos/baby-tee-piscina.webp",
          width: 1600,
          height: 1200,
          alt: "La Annobón Baby Tee flotando en una piscina de agua turquesa",
          wide: true,
        },
        {
          kind: "photo",
          src: "/images/productos/baby-tee-penumbra.webp",
          width: 1600,
          height: 1200,
          alt: "La Annobón Baby Tee sobre el suelo de madera, en penumbra",
        },
        {
          kind: "photo",
          src: "/images/productos/baby-tee-sombra.webp",
          width: 1600,
          height: 1200,
          alt: "La Annobón Baby Tee sobre el suelo, a contraluz junto a una ventana",
        },
      ],
      info: [
        {
          title: "Detalles",
          body: [
            "Baby tee blanca de tejido acanalado, cuello redondo y manga corta.",
            "Estampado «Annobón, isla bonita» en letra cursiva negra.",
          ],
        },
        {
          title: "Talla y corte",
          body: [
            "Corte ajustado y corto, a la altura de la cintura. El tejido acanalado se adapta al cuerpo.",
            "Si la prefieres más holgada o más larga, elige una talla más.",
          ],
        },
        careInfo,
        preorderInfo,
      ],
    },
  ] satisfies Product[],
};

/** Espacio en las páginas de producto para las personas que ya llevan sus piezas de Olem. */
export const community = {
  eyebrow: "Comunidad",
  heading: "Olem, vivido",
  body: "Piezas destinadas a ser vividas. Si ya tienes la tuya, compártela etiquetando a @olem___studio y la traeremos aquí.",
  cta: "Compartir mi pieza",
  /** Fotos de la comunidad: añade { src, width, height, alt, handle } por cada una (en /public/images/comunidad). */
  posts: [] as { src: string; width: number; height: number; alt: string; handle: string }[],
};

export const getProduct = (slug: string) => drop.products.find((p) => p.slug === slug);

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
