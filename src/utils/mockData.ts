export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  año: number;
  editorial: string;
  disponible: boolean;
  descripcion: string;
  isbn: number;
  genero: string;
}

export interface Socio {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  direccion?: string;
  fechaAlta?: string;
}

export interface Prestamo {
  id: number;
  socioId: number;
  libroId: number;
  fechaPrestamo: Date;
  fechaDevolucionEstimada: Date;
  fechaDevolucionReal: Date | null;
  estado: string;
}

export interface Cuota {
  id: number;
  mes: number;
  año: number;
  valor: number;
  concepto: string;
} 

export interface CuotaPorSocio {
  id: number;
  socioId: number;
  cuotaId: number;
  fechaPago: Date;
  estado: string;
}

export const librosMock: Libro[] = [
  
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      año: 1967,
      editorial: "Sudamericana",
      disponible: true,
      descripcion: "Una saga familiar en Macondo que abarca varias generaciones.",
      isbn: 9780060114183,
      genero: "Novela"
    },
    {
      id: 2,
      titulo: "El Aleph",
      autor: "Jorge Luis Borges",
      año: 1949,
      editorial: "Losada",
      disponible: true,
      descripcion: "Colección de cuentos que exploran temas como el infinito y la eternidad.",
      isbn: 9788420692128,
      genero: "Literatura Clásica"
    },
    {
      id: 3,
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      año: 1605,
      editorial: "Francisco de Robles",
      disponible: false,
      descripcion: "Una de las mayores obras de la literatura universal.",
      isbn: 9780744525021,
      genero: "Literatura Clásica"
    },
    {
      id: 4,
      titulo: "1984",
      autor: "George Orwell",
      año: 1949,
      editorial: "Secker & Warburg",
      disponible: true,
      descripcion: "Una distopía que reflexiona sobre la vigilancia y la opresión.",
      isbn: 9780744525021,
      genero: "Terror"
    },
    {
      id: 5,
      titulo: "Crimen y castigo",
      autor: "Fiódor Dostoyevski",
      año: 1866,
      editorial: "The Russian Messenger",
      disponible: true,
      descripcion: "Un drama psicológico sobre la moralidad y el arrepentimiento.",
        isbn: 9780744525021,
      genero: "Drama"
    },
    {
      id: 6,
      titulo: "Orgullo y prejuicio",
      autor: "Jane Austen",
      año: 1813,
      editorial: "T. Egerton",
      disponible: false,
      descripcion: "Una comedia romántica que satiriza la sociedad inglesa del siglo XIX.",
      isbn: 9780744525021,
      genero: "Novela"
    },
    {
      id: 7,
      titulo: "Ulises",
      autor: "James Joyce",
      año: 1922,
      editorial: "Sylvia Beach",
      disponible: true,
      descripcion: "Un relato experimental que narra un día en la vida de Leopold Bloom.",
      isbn: 9780744525021,
      genero: "Ciencia Ficción"
    },
    {
      id: 8,
      titulo: "El señor de los anillos",
      autor: "J.R.R. Tolkien",
      año: 1954,
      editorial: "Allen & Unwin",
      disponible: true,
      descripcion: "Una épica fantasía sobre la lucha entre el bien y el mal.",
      isbn: 9780744525021,
      genero: "Fantasía"
    },
    {
      id: 9,
      titulo: "Matar a un ruiseñor",
      autor: "Harper Lee",
      año: 1960,
      editorial: "J.B. Lippincott & Co.",
      disponible: false,
      descripcion: "Una novela que aborda el racismo y la justicia en el sur de Estados Unidos.",
      isbn: 9780744525021,
      genero: "Novela"
    },
    {
      id: 10,
      titulo: "El extranjero",
      autor: "Albert Camus",
      año: 1942,
      editorial: "Gallimard",
      disponible: true,
      descripcion: "Una exploración del existencialismo a través de la vida de Meursault.",
      isbn: 9780744525021,
      genero: "Filosofía"
    },
    {
      id: 11,
      titulo: "Fahrenheit 451",
      autor: "Ray Bradbury",
      año: 1953,
      editorial: "Ballantine Books",
      disponible: true,
      descripcion: "Una distopía sobre una sociedad donde los libros están prohibidos.",
      isbn: 9780744525021,
      genero: "Ciencia Ficción"
    },
    {
      id: 12,
      titulo: "La metamorfosis",
      autor: "Franz Kafka",
      año: 1915,
      editorial: "Kurt Wolff",
      disponible: true,
      descripcion: "La historia de un hombre que se convierte en un insecto gigante.",
      isbn: 9780744525021,
      genero: "Ciencia Ficción"
    },
    {
      id: 13,
      titulo: "El Gran Gatsby",
      autor: "F. Scott Fitzgerald",
      año: 1925,
      editorial: "Charles Scribner's Sons",
      disponible: false,
      descripcion: "Un retrato de la era del jazz y la lucha por el sueño americano.",
      isbn: 9780744525021,
      genero: "Literatura Clásica"
    },
    {
      id: 14,
      titulo: "En busca del tiempo perdido",
      autor: "Marcel Proust",
      año: 1913,
      editorial: "Grasset",
      disponible: true,
      descripcion: "Una extensa obra que reflexiona sobre la memoria y el tiempo.",
      isbn: 9780744525021,
      genero: "Literatura Clásica"
    },
    {
      id: 15,
      titulo: "El hobbit",
      autor: "J.R.R. Tolkien",
      año: 1937,
      editorial: "Allen & Unwin",
      disponible: true,
      descripcion: "Las aventuras de Bilbo Bolsón en la Tierra Media.",
      isbn: 9780744525021,
      genero: "Fantasía"
    },
    {
      id: 16,
      titulo: "Hamlet",
      autor: "William Shakespeare",
      año: 1600,
      editorial: "N/A",
      disponible: true,
      descripcion: "Una tragedia que explora la venganza, la traición y la locura.",
      isbn: 9780744525021,
      genero: "Drama"
    },
    {
      id: 17,
      titulo: "La divina comedia",
      autor: "Dante Alighieri",
      año: 1320,
      editorial: "N/A",
      disponible: false,
      descripcion: "Un poema épico que describe un viaje por el infierno, el purgatorio y el paraíso.",
      isbn: 9780744525021,
      genero: "Literatura Clásica"
    },
    {
      id: 18,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      año: 1943,
      editorial: "Reynal & Hitchcock",
      disponible: true,
      descripcion: "Una historia poética sobre la vida y las relaciones humanas.",
      isbn: 9780744525021,
      genero: "Literatura Clásica"
    },
    {
      id: 19,
      titulo: "La Odisea",
      autor: "Homero",
      año: -800,
      editorial: "N/A",
      disponible: true,
      descripcion: "Las aventuras de Odiseo en su regreso a Ítaca.",
      isbn: 9780744525021,
      genero: "Literatura Clásica"
    },
    {
      id: 20,
      titulo: "Madame Bovary",
      autor: "Gustave Flaubert",
      año: 1857,
      editorial: "Revue de Paris",
      disponible: false,
      descripcion: "La historia de una mujer atrapada en un matrimonio insatisfactorio.",
      isbn: 9780744525021,
      genero: "Novela"
    }
];

export const sociosMock: Socio[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    dni: "12345678",
    email: "juan@email.com",
    telefono: "1234567890",
    direccion: "Calle 123",
    fechaAlta: "18/03/2024"
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    dni: "87654321",
    email: "maria@email.com",
    telefono: "0987654321",
    direccion: "Calle 456",
    fechaAlta: "18/03/2024"
  }
]; 


export const prestamosMock: Prestamo[] = [
  {
    id: 0,
    socioId: 1,
    libroId: 16,
    fechaPrestamo: new Date('2024-01-01T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-15T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Atrasado'
  },
  {
    id: 1,
    socioId: 1,
    libroId: 1,
    fechaPrestamo: new Date('2024-01-01T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-15T00:00:00'),
    fechaDevolucionReal: new Date('2024-01-13T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 2,
    socioId: 2,
    libroId: 2,
    fechaPrestamo: new Date('2024-01-02T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-16T00:00:00'),
    fechaDevolucionReal: new Date('2024-01-14T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 3,
    socioId: 1,
    libroId: 3,
    fechaPrestamo: new Date('2024-01-05T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-19T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Pendiente'
  },
  {
    id: 4,
    socioId: 1,
    libroId: 4,
    fechaPrestamo: new Date('2024-01-12T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-26T00:00:00'),
    fechaDevolucionReal: new Date('2024-01-25T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 5,
    socioId: 1,
    libroId: 5,
    fechaPrestamo: new Date('2024-01-15T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-20T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Pendiente'
  },
  {
    id: 6,
    socioId: 1,
    libroId: 6,
    fechaPrestamo: new Date('2024-01-18T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-23T00:00:00'),
    fechaDevolucionReal: new Date('2024-01-21T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 7,
    socioId: 1,
    libroId: 7,
    fechaPrestamo: new Date('2024-01-21T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-26T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Pendiente'
  },
  {
    id: 8,
    socioId: 1,
    libroId: 8,
    fechaPrestamo: new Date('2024-01-24T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-01-29T00:00:00'),
    fechaDevolucionReal: new Date('2024-01-27T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 9,
    socioId: 1,
    libroId: 9,
    fechaPrestamo: new Date('2024-01-27T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-02-01T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Pendiente'
  },
  {
    id: 10,
    socioId: 1,
    libroId: 10,
    fechaPrestamo: new Date('2024-01-30T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-02-04T00:00:00'),
    fechaDevolucionReal: new Date('2024-02-02T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 11,
    socioId: 1,
    libroId: 11,
    fechaPrestamo: new Date('2024-02-02T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-02-07T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Pendiente'
  },
  {
    id: 12,
    socioId: 1,
    libroId: 12,
    fechaPrestamo: new Date('2024-02-05T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-02-10T00:00:00'),
    fechaDevolucionReal: new Date('2024-02-08T00:00:00'),
    estado: 'Devuelto'
  },
  {
    id: 13,
    socioId: 1,
    libroId: 13,
    fechaPrestamo: new Date('2024-02-08T00:00:00'),
    fechaDevolucionEstimada: new Date('2024-02-22T00:00:00'),
    fechaDevolucionReal: null,
    estado: 'Pendiente'
  }
];

export const CuotasMock : Cuota[] = [
  {
    id: 1,
    mes: 1,
    año: 2024,
    valor: 100,
    concepto: 'Cuota mensual',
  },
  {
    id: 2,
    mes: 2,
    año: 2024,
    valor: 100,
    concepto: 'Macramé',
  },
  {
    id: 3,
    mes: 3,
    año: 2024,
    valor: 100,
    concepto: 'Inscripción',
  }
]

export const CuotasPorSocioMock : CuotaPorSocio[] = [
  {
    id: 1,
    socioId: 1,
    cuotaId: 1,
    fechaPago: new Date('2024-01-01T00:00:00'),
    estado: 'Pagado'
  },
  {
    id: 2,
    socioId: 1,
    cuotaId: 2,
    fechaPago: new Date('2024-01-01T00:00:00'),
    estado: 'Pagado'
  },
  {
    id: 3,
    socioId: 1,
    cuotaId: 3,
    fechaPago: new Date('2024-01-01T00:00:00'),
    estado: 'Pagado'
  }
]

export const Meses : {[key:string]:string} = {
  "1": "Enero",
  "2": "Febrero",
  "3": "Marzo",
  "4": "Abril",
  "5": "Mayo",
  "6": "Junio",
  "7": "Julio",
  "8": "Agosto",
  "9": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre"
} 

export const generos = [
  'Poesía',
  'Ciencia Ficción',
  'Fantasía',
  'Historia',
  'Biografía',
  'Ensayo',
  'Infantil',
  'Juvenil',
  'Literatura Clásica',
  'Drama',
  'Novela',
  'Terror'
  // Agrega más géneros según necesites
];