import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const data = [
  {
    name: "Struktur Data",
    description: "Array, Linked List, Stack, Queue, Tree, Graph",
    quizzes: [
      {
        name: "Array & Kompleksitas Waktu",
        description: "Dasar array dan analisis Big-O",
        questions: [
          {
            text: "Apa kompleksitas waktu untuk mengakses elemen pada array berdasarkan index?",
            optionA: "O(n)",
            optionB: "O(log n)",
            optionC: "O(1)",
            optionD: "O(n^2)",
            correctAnswer: "C",
            explanation: "Array memiliki akses langsung ke elemen berdasarkan index, sehingga kompleksitasnya O(1).",
          },
          {
            text: "Apa kelemahan utama array dibandingkan linked list?",
            optionA: "Akses elemen lebih lambat",
            optionB: "Ukurannya bersifat statis/tetap",
            optionC: "Tidak bisa menyimpan data",
            optionD: "Tidak mendukung perulangan",
            correctAnswer: "B",
            explanation: "Array memiliki ukuran tetap saat dideklarasikan, sedangkan linked list bisa tumbuh secara dinamis.",
          },
        ],
      },
      {
        name: "Stack & Queue",
        description: "Prinsip LIFO, FIFO, dan implementasinya",
        questions: [
          {
            text: "Struktur data apa yang menggunakan prinsip LIFO (Last In First Out)?",
            optionA: "Queue",
            optionB: "Stack",
            optionC: "Array",
            optionD: "Linked List",
            correctAnswer: "B",
            explanation: "Stack menggunakan prinsip LIFO, elemen yang terakhir masuk adalah yang pertama keluar.",
          },
          {
            text: "Struktur data apa yang cocok digunakan untuk implementasi antrian (queue)?",
            optionA: "Stack",
            optionB: "Linked List",
            optionC: "Tree",
            optionD: "Hash Table",
            correctAnswer: "B",
            explanation: "Linked List cocok untuk queue karena memudahkan penambahan dan penghapusan elemen di kedua ujung.",
          },
          {
            text: "Operasi 'push' dan 'pop' pada stack digunakan untuk?",
            optionA: "Menambah dan menghapus elemen di awal",
            optionB: "Menambah dan menghapus elemen di tengah",
            optionC: "Menambah dan menghapus elemen di atas stack",
            optionD: "Mengurutkan elemen dalam stack",
            correctAnswer: "C",
            explanation: "Push menambahkan elemen ke atas stack, pop menghapus elemen teratas.",
          },
        ],
      },
    ],
  },
  {
    name: "Algoritma",
    description: "Sorting, Searching, Recursion, Complexity",
    quizzes: [
      {
        name: "Sorting & Searching",
        description: "Algoritma pengurutan dan pencarian data",
        questions: [
          {
            text: "Algoritma sorting apa yang memiliki kompleksitas rata-rata O(n log n)?",
            optionA: "Bubble Sort",
            optionB: "Insertion Sort",
            optionC: "Merge Sort",
            optionD: "Selection Sort",
            correctAnswer: "C",
            explanation: "Merge Sort menggunakan pendekatan divide and conquer dengan kompleksitas O(n log n).",
          },
          {
            text: "Apa nama algoritma pencarian yang membagi data menjadi dua bagian secara berulang?",
            optionA: "Linear Search",
            optionB: "Binary Search",
            optionC: "Bubble Search",
            optionD: "Hash Search",
            correctAnswer: "B",
            explanation: "Binary Search bekerja dengan membagi data terurut menjadi dua bagian secara berulang.",
          },
          {
            text: "Algoritma sorting paling sederhana yang membandingkan dan menukar elemen bersebelahan secara berulang disebut?",
            optionA: "Bubble Sort",
            optionB: "Merge Sort",
            optionC: "Quick Sort",
            optionD: "Heap Sort",
            correctAnswer: "A",
            explanation: "Bubble Sort membandingkan dua elemen bersebelahan dan menukarnya jika urutannya salah, diulang hingga data terurut.",
          },
        ],
      },
      {
        name: "Rekursi & Kompleksitas",
        description: "Pemikiran rekursif dan analisis Big-O",
        questions: [
          {
            text: "Teknik pemrograman yang memanggil fungsi dirinya sendiri disebut?",
            optionA: "Iterasi",
            optionB: "Rekursi",
            optionC: "Looping",
            optionD: "Branching",
            correctAnswer: "B",
            explanation: "Rekursi adalah teknik di mana sebuah fungsi memanggil dirinya sendiri.",
          },
          {
            text: "Apa risiko utama jika fungsi rekursif tidak memiliki base case?",
            optionA: "Program berjalan lebih cepat",
            optionB: "Stack overflow karena pemanggilan tak terbatas",
            optionC: "Hasil selalu salah",
            optionD: "Memori otomatis dibersihkan",
            correctAnswer: "B",
            explanation: "Tanpa base case, fungsi akan memanggil dirinya sendiri tanpa henti hingga memori stack penuh (stack overflow).",
          },
          {
            text: "Kompleksitas waktu dari algoritma dengan dua perulangan bersarang berukuran n adalah?",
            optionA: "O(n)",
            optionB: "O(log n)",
            optionC: "O(n log n)",
            optionD: "O(n^2)",
            correctAnswer: "D",
            explanation: "Dua perulangan bersarang yang masing-masing berjalan n kali menghasilkan kompleksitas O(n^2).",
          },
        ],
      },
    ],
  },
  {
    name: "Basis Data",
    description: "SQL, Normalisasi, ERD, Relasi",
    quizzes: [
      {
        name: "Dasar SQL",
        description: "Perintah-perintah dasar SQL",
        questions: [
          {
            text: "Perintah SQL apa yang digunakan untuk mengambil data dari tabel?",
            optionA: "INSERT",
            optionB: "UPDATE",
            optionC: "SELECT",
            optionD: "DELETE",
            correctAnswer: "C",
            explanation: "SELECT digunakan untuk mengambil/membaca data dari tabel.",
          },
          {
            text: "Perintah SQL untuk menambahkan baris data baru ke dalam tabel adalah?",
            optionA: "INSERT",
            optionB: "CREATE",
            optionC: "ALTER",
            optionD: "SELECT",
            correctAnswer: "A",
            explanation: "INSERT digunakan untuk menambahkan data baru ke dalam tabel.",
          },
          {
            text: "Klausa SQL yang digunakan untuk memfilter baris berdasarkan kondisi tertentu adalah?",
            optionA: "ORDER BY",
            optionB: "GROUP BY",
            optionC: "WHERE",
            optionD: "HAVING",
            correctAnswer: "C",
            explanation: "WHERE digunakan untuk memfilter baris data berdasarkan kondisi yang ditentukan.",
          },
        ],
      },
      {
        name: "Normalisasi & Relasi",
        description: "Desain database, normalisasi, dan relasi antar tabel",
        questions: [
          {
            text: "Apa tujuan utama dari normalisasi database?",
            optionA: "Mempercepat query",
            optionB: "Mengurangi redundansi data",
            optionC: "Menambah jumlah tabel",
            optionD: "Mempersulit relasi",
            correctAnswer: "B",
            explanation: "Normalisasi bertujuan mengurangi redundansi dan menjaga integritas data.",
          },
          {
            text: "Relasi yang menghubungkan satu baris di tabel A dengan banyak baris di tabel B disebut?",
            optionA: "One-to-One",
            optionB: "One-to-Many",
            optionC: "Many-to-Many",
            optionD: "Self Relation",
            correctAnswer: "B",
            explanation: "One-to-Many berarti satu record di tabel A bisa berelasi dengan banyak record di tabel B.",
          },
          {
            text: "Primary key pada sebuah tabel digunakan untuk?",
            optionA: "Mengurutkan data secara otomatis",
            optionB: "Mengidentifikasi setiap baris secara unik",
            optionC: "Menghapus data secara otomatis",
            optionD: "Menyimpan data dalam bentuk teks",
            correctAnswer: "B",
            explanation: "Primary key memastikan setiap baris dalam tabel memiliki identitas unik yang tidak boleh duplikat.",
          },
        ],
      },
    ],
  },
];

async function main() {
  for (const topic of data) {
    const createdTopic = await prisma.topic.create({
      data: {
        name: topic.name,
        description: topic.description,
        quizzes: {
          create: topic.quizzes.map((quiz) => ({
            name: quiz.name,
            description: quiz.description,
            questions: {
              create: quiz.questions,
            },
          })),
        },
      },
    });

    console.log(`Topic "${createdTopic.name}" seeded with ${topic.quizzes.length} quiz.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });