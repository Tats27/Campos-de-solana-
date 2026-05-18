
// ─── WINE DATA ───────────────────────────────────────────────────────────────
const initialWines = [
  {
    id: 1, name: "Reserva Especial Tempranillo", year: 2019,
    category: "Tinto", region: "Ribera del Duero",
    price: 42.90, stock: 48,
    description: "De profundo color rubí con ribetes granate. En nariz se aprecian notas de frutos rojos maduros, cereza negra y ciruela, con elegantes matices de vainilla y especias suaves procedentes de su crianza en barrica de roble francés.",
    image: "https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_pb_x600.png",
    tags: ["Roble Francés", "18 meses barrica", "D.O. Ribera"],
  },
  {
    id: 2, name: "Gran Selección Garnacha", year: 2018,
    category: "Tinto", region: "Campo de Borja",
    price: 68.50, stock: 22,
    description: "Expresión máxima de la vieja Garnacha. Aterciopelado y envolvente, con aromas de mora, regaliz y toques florales de violeta. Largo postgusto con notas de chocolate negro y café.",
    image: "https://images.vivino.com/thumbs/6pMzB6gDCCd_OkPezMPdwA_pb_x600.png",
    tags: ["Garnacha Vieja", "Crianza 24 meses", "Premium"],
  },
  {
    id: 3, name: "Blanco Verdejo sobre Lías", year: 2023,
    category: "Blanco", region: "Rueda",
    price: 24.90, stock: 65,
    description: "Fresco y vibrante. Aromas intensos de lima, pomelo y notas herbáceas características del Verdejo. En boca muestra gran cremosidad gracias a su crianza sobre lías durante 4 meses.",
    image: "https://images.vivino.com/thumbs/Qfu_ywANDFkJFNfHEqVqcQ_pb_x600.png",
    tags: ["Verdejo", "Sobre lías", "D.O. Rueda"],
  },
  {
    id: 4, name: "Rosado de Lágrima Garnacha", year: 2023,
    category: "Rosado", region: "Navarra",
    price: 18.50, stock: 80,
    description: "Rosado de color salmón brillante elaborado por el sistema de lágrima. Aromas de fresas silvestres, frambuesa y pétalos de rosa. Fresco, goloso y muy equilibrado.",
    image: "https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_pb_x600.png",
    tags: ["Lágrima", "Sin maceración", "Veraniego"],
  },
  {
    id: 5, name: "Cava Brut Nature Reserva", year: 2020,
    category: "Espumoso", region: "Penedès",
    price: 31.90, stock: 35,
    description: "Elaborado con Xarel·lo, Macabeo y Parellada bajo el método tradicional. 30 meses de crianza en botella. Burbuja fina y persistente, con notas de brioche, manzana verde y un toque mineral.",
    image: "https://images.vivino.com/thumbs/Qfu_ywANADFkJFNfHEqVqcQ_pb_x600.png",
    tags: ["Método Tradicional", "30 meses", "Brut Nature"],
  },
  {
    id: 6, name: "Tinto Crianza Mencía", year: 2021,
    category: "Tinto", region: "Bierzo",
    price: 29.90, stock: 55,
    description: "La Mencía en su expresión más elegante. Bierzo da lugar a un tinto de color púrpura intenso con aromas de frutos del bosque, pizarra húmeda y flores rojas. Tánico pero sedoso.",
    image: "https://images.vivino.com/thumbs/6pMzB6gDCCd_OkPezMPdwA_pb_x600.png",
    tags: ["Mencía", "Crianza D.O.", "Pizarroso"],
  },
];
export default initialWines;