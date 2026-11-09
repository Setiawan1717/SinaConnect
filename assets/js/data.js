/* =========================================================
   DATA PORTAL KADER — Rayon PMII Ibnu Sina FMIPA UM
   (Data simulasi; disimpan di memori browser selama sesi)
   ========================================================= */
// Kode Rahasia (Disimpan di sistem, tidak ditampilkan di layar pendaftaran)
// Untuk Anggota bisa ketik: ANGGOTA-SINA
// Untuk Admin bisa ketik: ADMIN-SINA
const SECRET_CODE_ANGGOTA = 'ANGGOTA-SINA';
const SECRET_CODE_ADMIN = 'ADMIN-SINA';

let registeredUsers = [
    {
        id: 1,
        role: 'anggota',
        nama: 'Nabila Putri',
        password: '123',
        gender: 'P',
        nim: '240332601122',
        prodi: 'S1 Kimia',
        hp: '081234567890',
        photoUrl: 'https://placehold.co/100x100/0f2557/facc15?text=NP',
        ktmName: 'KTM_Nabila_Kimia.jpg',
        ktmUrl: 'https://placehold.co/600x360/1e3a8a/ffffff?text=FOTO+KTM+-+NABILA+PUTRI+(S1+KIMIA)',
        mapabaName: 'Sertifikat_MAPABA_Nabila.pdf',
        mapabaUrl: 'https://placehold.co/600x360/eab308/0f2557?text=SERTIFIKAT+MAPABA+-+NABILA+PUTRI'
    },
    {
        id: 2,
        role: 'anggota',
        nama: 'Dimas Prasetyo',
        password: '123',
        gender: 'L',
        nim: '230322604411',
        prodi: 'S1 Fisika',
        hp: '085711223344',
        photoUrl: 'https://placehold.co/100x100/1e3a8a/ffffff?text=DP',
        ktmName: 'KTM_Dimas_Fisika.jpg',
        ktmUrl: 'https://placehold.co/600x360/0f2557/facc15?text=FOTO+KTM+-+DIMAS+PRASETYO+(S1+FISIKA)',
        mapabaName: 'Sertifikat_MAPABA_Dimas.pdf',
        mapabaUrl: 'https://placehold.co/600x360/eab308/0f2557?text=SERTIFIKAT+MAPABA+-+DIMAS+PRASETYO'
    },
    {
        id: 3,
        role: 'anggota',
        nama: 'Rania Zahra',
        password: '123',
        gender: 'P',
        nim: '240311608899',
        prodi: 'S1 Matematika',
        hp: '082199887766',
        photoUrl: 'https://placehold.co/100x100/065f46/facc15?text=RZ',
        ktmName: 'KTM_Rania_Matematika.jpg',
        ktmUrl: 'https://placehold.co/600x360/065f46/ffffff?text=FOTO+KTM+-+RANIA+ZAHRA+(S1+MATEMATIKA)',
        mapabaName: 'Sertifikat_MAPABA_Rania.pdf',
        mapabaUrl: 'https://placehold.co/600x360/eab308/0f2557?text=SERTIFIKAT+MAPABA+-+RANIA+ZAHRA'
    },
    {
        id: 4,
        role: 'anggota',
        nama: 'Riko Saputra',
        password: '123',
        gender: 'L',
        nim: '240341605533',
        prodi: 'S1 Biologi',
        hp: '081355667788',
        photoUrl: 'https://placehold.co/100x100/7c2d12/facc15?text=RS',
        ktmName: 'KTM_Riko_Biologi.jpg',
        ktmUrl: 'https://placehold.co/600x360/7c2d12/ffffff?text=FOTO+KTM+-+RIKO+SAPUTRA+(S1+BIOLOGI)',
        mapabaName: 'Sertifikat_MAPABA_Riko.pdf',
        mapabaUrl: 'https://placehold.co/600x360/eab308/0f2557?text=SERTIFIKAT+MAPABA+-+RIKO+SAPUTRA'
    },
    {
        id: 99,
        role: 'admin',
        nama: 'Ketua Kaderisasi',
        password: '123',
        gender: 'L',
        jabatan: 'Ketua Kaderisasi',
        prodi: 'S1 Fisika',
        photoUrl: 'https://placehold.co/100x100/eab308/0f2557?text=KK'
    }
];

let prokerData = [
    { id: 1, nama: 'MAPABA Raya Rayon Ibnu Sina', bidang: 'Bidang Kaderisasi', waktu: 'September', status: 'Terlaksana' },
    { id: 2, nama: 'Peluncuran Kelas Rutin Avicenna Space (5 Pelatihan)', bidang: 'Bidang Kaderisasi & Minat Bakat', waktu: 'Oktober – Mei', status: 'Sedang Berjalan' },
    { id: 3, nama: 'Klinik PKM & Mentorship Beasiswa (Radar x Lentera)', bidang: 'Biro Keilmuan & Sains', waktu: 'November – Februari', status: 'Sedang Berjalan' },
    { id: 4, nama: 'Penerbitan Antologi Puisi & Esai Aksara Sina', bidang: 'Biro Literasi & Jurnalistik', waktu: 'Maret', status: 'Akan Datang' },
    { id: 5, nama: 'Pelatihan Kader Dasar (PKD) Rayon Ibnu Sina', bidang: 'Bidang Kaderisasi', waktu: 'April', status: 'Akan Datang' }
];

let currentUser = registeredUsers[0];

// ==========================================
// DATA STORE 7 FITUR UTAMA
// ==========================================
const spaceData = [
    {
        id: 'kepenulisan',
        name: 'Kepenulisan',
        icon: 'fa-pen-fancy',
        schedule: 'Jumat, 15.30 WIB • Gazebo FMIPA UM',
        mentor: 'Sahabat Dimas (S1 Fisika) & Sahabati Aulia (S1 Biologi)',
        desc: 'Pelatihan penulisan esai ilmiah populer, opini media, karya tulis ilmiah (KTI), hingga sastra kreatif yang terhubung langsung dengan publikasi di Aksara Sina.',
        modules: [
            {
                meeting: 'Pertemuan 1',
                title: ' anatomi Esai Kritis & Ilmiah Populer',
                type: 'PDF Modul',
                content: 'Membahas struktur hook/pembuka yang memikat, perumusan tesis argumen, hingga cara memadukan data jurnal sains dengan analisis sosial khas PMII.'
            },
            {
                meeting: 'Pertemuan 2',
                title: 'Teknik Menembus Media Opini & Lomba Esai Nasional',
                type: 'Slide Materi',
                content: 'Panduan kurasi isu aktual, gaya bahasa media massa, serta bedah naskah juara lomba esai tingkat nasional.'
            },
            {
                meeting: 'Pertemuan 3',
                title: 'Penulisan Kreatif: Puisi & Cerpen Pergerakan',
                type: 'PDF Modul',
                content: 'Eksplorasi diksi, metafora laboratorium & kemanusiaan, serta praktik publikasi karya di rubrik Aksara Sina.'
            }
        ]
    },
    {
        id: 'kewirausahaan',
        name: 'Kewirausahaan',
        icon: 'fa-briefcase',
        schedule: 'Rabu, 16.00 WIB • Mabes Rayon Ibnu Sina',
        mentor: 'Sahabati Rania (S1 Matematika) & Tim Ekraf Rayon',
        desc: 'Inkubasi bisnis mahasiswa, manajemen produk kreatif, pembuatan proposal PKM-K, serta pengelolaan lapak kader di Avicenna Market.',
        modules: [
            {
                meeting: 'Pertemuan 1',
                title: 'Riset Produk Mahasiswa & Validasi Pasar Kampus',
                type: 'PDF Modul',
                content: 'Cara memetakan kebutuhan harian mahasiswa FMIPA (kuliner, alat praktikum, jasa akademik) dengan modal minim.'
            },
            {
                meeting: 'Pertemuan 2',
                title: 'Branding Visual & Strategi Jualan di Avicenna Market',
                type: 'Slide Materi',
                content: 'Teknik foto produk pakai HP, penulisan copywriting katalog, dan manajemen sistem pre-order (PO).'
            },
            {
                meeting: 'Pertemuan 3',
                title: 'Merancang Proposal PKM-Kewirausahaan (PKM-K)',
                type: 'Template Berkas',
                content: 'Panduan analisis kelayakan usaha (cashflow, BEP, B/C Ratio) berbasis produk inovasi sains.'
            }
        ]
    },
    {
        id: 'futsal',
        name: 'Futsal',
        icon: 'fa-futbol',
        schedule: 'Sabtu, 19.00 WIB • Champions Futsal Malang',
        mentor: 'Sahabat Bagas (S1 Pendidikan Matematika)',
        desc: 'Wadah olahraga rutin, kebugaran fisik kader, silaturahmi lintas angkatan, dan persiapan tim delegasi turnamen futsal antar-rayon/fakultas.',
        modules: [
            {
                meeting: 'Program 1',
                title: 'Panduan Pemanasan, Fisik Dasar & Pencegahan Cedera',
                type: 'Panduan Latihan',
                content: 'Rangkaian dynamic stretching, latihan ketahanan kardio, dan penanganan pertama kram/cedera engkel.'
            },
            {
                meeting: 'Program 2',
                title: 'Pola Taktik Formasi 1-2-1 (Diamond) & Rotasi Pemain',
                type: 'Papan Taktik',
                content: 'Skema transisi bertahan ke menyerang serta komunikasi lapangan saat sparing.'
            }
        ]
    },
    {
        id: 'sahabat-baca',
        name: 'Sahabat Baca',
        icon: 'fa-book-open',
        schedule: 'Minggu, 16.00 WIB • Taman / Mabes Rayon Ibnu Sina',
        mentor: 'Sahabat Fikri (S1 Kimia) & Biro Literasi',
        desc: 'Komunitas lingkar baca mingguan, bedah buku filsafat-sains, pemikiran Islam progresif, dan penulisan resensi buku untuk diterbitkan di Aksara Sina.',
        modules: [
            {
                meeting: 'Sesi Baca 1',
                title: ' Pengantar Filsafat Ilmu & Epistemologi Ibnu Sina',
                type: 'Diktat Diskusi',
                content: 'Membedah integrasi nalar burhani (rasional-empiris) dalam tradisi intelektual Islam dan sains modern.'
            },
            {
                meeting: 'Sesi Baca 2',
                title: 'Cara Membaca Efektif & Menulis Resensi Buku Kritis',
                type: 'PDF Panduan',
                content: 'Teknik mencatat poin kunci bab, membandingkan argumen penulis, dan menyusun ulasan buku 500 kata.'
            }
        ]
    },
    {
        id: 'space-5',
        name: 'Desain & Media Kreatif',
        icon: 'fa-palette',
        schedule: 'Kamis, 16.00 WIB • Mabes Rayon Ibnu Sina',
        mentor: 'Sahabat Reza (S1 Bioteknologi)',
        desc: 'Pelatihan desain grafis poster ilmiah, infografis lomba, dan pengelolaan media sosial pergerakan (Nama pelatihan ke-5 ini bisa diubah).',
        modules: [
            {
                meeting: 'Pertemuan 1',
                title: 'Fundamental Tipografi, Warna & Layout Poster Ilmiah',
                type: 'PDF Modul',
                content: 'Prinsip hierarki visual agar poster KTI/PKM dan konten organisasi terlihat rapi, kontras, dan mudah dibaca.'
            },
            {
                meeting: 'Pertemuan 2',
                title: 'Praktik Desain Infografis Sains untuk Kompetisi Nasional',
                type: 'Bahan Praktik',
                content: 'Mengubah data statistik dan reaksi laboratorium menjadi visual infografis yang memenangkan penilaian juri.'
            }
        ]
    }
];

const radarData = [
    {
        id: 1,
        title: 'Penerimaan Proposal PKM 8 Bidang Kemendikbudristek',
        category: 'KTI',
        organizer: 'Kemendikbudristek / Penalaran UM',
        deadline: 'Deadline H-8',
        urgent: true,
        isFree: true,
        poster: 'https://placehold.co/600x360/0f2557/facc15?text=POSTER+PKM+8+BIDANG',
        teamNote: 'Tim • 3 – 5 Orang (Lintas Angkatan / Jurusan)',
        igUrl: 'https://www.instagram.com/kemahasiswaan.um/',
        fullDesc: 'Program Kreativitas Mahasiswa (PKM) membuka pendanaan untuk PKM-RE (Riset Eksakta), PKM-K (Kewirausahaan), PKM-PM, PKM-PI, dan PKM-KC.\n\n• Terbuka bagi seluruh mahasiswa aktif S1 FMIPA UM\n• Bebas biaya pendaftaran (Gratis)\n• Didampingi langsung oleh tim klinik PKM Rayon PMII Ibnu Sina sampai tahap unggah Simbelmawa.'
    },
    {
        id: 2,
        title: 'Seleksi Olimpiade Nasional MIPA (ONMIPA-PT) Tingkat Fakultas',
        category: 'Olimpiade',
        organizer: 'FMIPA UM & BPTI Puspresnas',
        deadline: 'Deadline H-12',
        urgent: false,
        isFree: true,
        poster: 'https://placehold.co/600x360/1e3a8a/ffffff?text=POSTER+ONMIPA-PT+FMIPA+UM',
        teamNote: 'Individu • Perorangan (Matematika, Fisika, Kimia, Biologi)',
        igUrl: 'https://www.instagram.com/puspresnas/',
        fullDesc: 'Seleksi terbuka delegasi ONMIPA-PT untuk 4 bidang utama: Matematika, Fisika, Kimia, dan Biologi.\n\n• Peserta merupakan mahasiswa S1 maksimal semester 7\n• Pendaftaran gratis melalui kuota jurusan/fakultas\n• Tersedia bank soal tahun-tahun sebelumnya di menu Lentera Avicenna.'
    },
    {
        id: 3,
        title: 'Beasiswa Unggulan Masyarakat Berprestasi Kemendikbudristek',
        category: 'Beasiswa',
        organizer: 'Puslapdik Kemendikbudristek',
        deadline: 'Deadline H-5',
        urgent: true,
        isFree: true,
        poster: 'https://placehold.co/600x360/0f2557/eab308?text=POSTER+BEASISWA+UNGGULAN',
        teamNote: 'Individu • Mahasiswa Baru & On-Going (Maks Semester 3)',
        igUrl: 'https://www.instagram.com/puslapdik_dikbud/',
        fullDesc: 'Beasiswa penuh mencakup UKT per semester, biaya hidup bulanan, dan biaya buku.\n\n• Memiliki sertifikat prestasi akademik/non-akademik atau aktif berorganisasi\n• Menulis esai kontribusi dan rencana studi\n• Contoh berkas Mas/Mbak penerima beasiswa dapat dilihat di menu Lentera Avicenna.'
    },
    {
        id: 4,
        title: 'Lomba Esai Nasional Sains & Ekologi (LENSA) 2026',
        category: 'Esai',
        organizer: 'Forum Saintis Muda Indonesia',
        deadline: 'Deadline H-6',
        urgent: true,
        isFree: false,
        poster: 'https://placehold.co/600x360/334155/facc15?text=POSTER+LOMBA+ESAI+NASIONAL',
        teamNote: 'Individu / Tim • Maksimal 2 Orang per Tim',
        igUrl: 'https://www.instagram.com/fmipa.um/',
        fullDesc: 'Kompetisi esai ilmiah populer tingkat nasional dengan subtema Lingkungan, Energi Terbarukan, Pangan, dan Teknologi Tepat Guna.\n\n• Panjang naskah 1.500 – 2.500 kata\n• Biaya registrasi gelombang 1: Rp 35.000/karya\n• Total hadiah puluhan juta rupiah dan e-sertifikat nasional.'
    },
    {
        id: 5,
        title: 'Kompetisi Desain Poster Ilmiah & Infografis Sains Nasional',
        category: 'Desain',
        organizer: 'Asosiasi Mahasiswa MIPA Indonesia',
        deadline: 'Deadline H-15',
        urgent: false,
        isFree: true,
        poster: 'https://placehold.co/600x360/1d4ed8/ffffff?text=POSTER+LOMBA+DESAIN+INFOGRAFIS',
        teamNote: 'Individu / Tim • 1 – 2 Orang',
        igUrl: 'https://www.instagram.com/fmipa.um/',
        fullDesc: 'Lomba desain poster edukasi sains masyarakat untuk mahasiswa seluruh Indonesia.\n\n• Karya orisinal ukuran A3 resolusi tinggi\n• Pendaftaran Gratis\n• Cocok untuk kader yang mengikuti kelas Desain & Media di Avicenna Space.'
    },
    {
        id: 6,
        title: 'Lomba Karya Tulis Ilmiah Nasional (LKTIN) Green Science Innovation',
        category: 'KTI',
        organizer: 'BEM FMIPA Tingkat Nasional',
        deadline: 'Deadline H-19',
        urgent: false,
        isFree: true,
        poster: 'https://placehold.co/600x360/065f46/facc15?text=POSTER+LKTIN+GREEN+SCIENCE',
        teamNote: 'Tim • 2 – 3 Orang (Boleh Lintas Prodi)',
        igUrl: 'https://www.instagram.com/bemfmipaum/',
        fullDesc: 'Tahap pengumpulan abstrak dibuka secara GRATIS untuk seluruh mahasiswa aktif.\n\n• Subtema: Bioteknologi, Kimia Hijau, Material Maju, dan Komputasi Sains\n• Tim yang lolos abstrak akan mempresentasikan Full Paper di babak final.'
    }
];

const lenteraData = [
    // TAB 1: KULIAH FMIPA
    {
        id: 101,
        tab: 'kuliah',
        jurusan: 'Matematika',
        title: 'Diktat Kalkulus Diferensial & Integral + Pembahasan Soal UTS/UAS',
        contributor: 'Tim Akademik Matematika Ibnu Sina',
        type: 'PDF • 48 Halaman',
        summary: 'Rangkuman teorema limit, turunan, integral lipat, dan pembahasan soal ujian tahun lalu di FMIPA UM.'
    },
    {
        id: 102,
        tab: 'kuliah',
        jurusan: 'Fisika',
        title: 'Panduan Lengkap Laporan Praktikum Fisika Dasar I & Rambat Ralat',
        contributor: 'Sahabat Ahmad Fauzi (Asisten Lab Fisika)',
        type: 'PDF • 32 Halaman',
        summary: 'Format penulisan laprak, cara menghitung ketidakpastian pengukuran (ralat mutlak & relatif), serta grafik regresi linear.'
    },
    {
        id: 103,
        tab: 'kuliah',
        jurusan: 'Kimia',
        title: 'Ringkasan Stoikiometri, Kesetimbangan Asam-Basa & MSDS Bahan Lab',
        contributor: 'Sahabati Nabila Putri (S1 Kimia)',
        type: 'PDF • 40 Halaman',
        summary: 'Kumpulan rumus cepat Kimia Dasar, prosedur keselamatan kerja laboratorium (K3), dan contoh perhitungan titrasi.'
    },
    {
        id: 104,
        tab: 'kuliah',
        jurusan: 'Biologi',
        title: 'Atlas Preparat Biologi Umum & Panduan Taksonomi Tumbuhan',
        contributor: 'Kader Biologi Rayon Ibnu Sina',
        type: 'PDF • 55 Halaman',
        summary: 'Dokumentasi hasil pengamatan mikroskop beserta klasifikasi ilmiah untuk memudahkan penyusunan laporan praktikum.'
    },
    {
        id: 105,
        tab: 'kuliah',
        jurusan: 'IPA',
        title: 'Modul Integrasi Sains Terpadu & Media Pembelajaran IPA',
        contributor: 'Kader Pendidikan IPA Ibnu Sina',
        type: 'PDF • 28 Halaman',
        summary: 'Rangkuman konsep fisika-kimia-biologi terpadu dan ide alat peraga sains sekolah menengah.'
    },

    // TAB 2: KADERISASI PMII
    {
        id: 201,
        tab: 'kaderisasi',
        jurusan: 'Kaderisasi',
        title: 'Modul Utama MAPABA: Nilai Dasar Pergerakan (NDP) PMII',
        contributor: 'Bidang Kaderisasi Rayon Ibnu Sina',
        type: 'Modul Resmi • 36 Halaman',
        summary: 'Penjelasan mendalam mengenai Tauhid, Hablumminallah, Hablumminannas, dan Hablumminal’alam sebagai kerangka berpikir kader sains.'
    },
    {
        id: 202,
        tab: 'kaderisasi',
        jurusan: 'Kaderisasi',
        title: 'Aswaja sebagai Manhajul Fikr (Metode Berpikir) Saintis Pergerakan',
        contributor: 'Bidang Kaderisasi Rayon Ibnu Sina',
        type: 'Modul Resmi • 24 Halaman',
        summary: 'Memahami prinsip Tawassuth, Tawazun, Ta’adul, dan Tasamuh dalam konteks akademik maupun kehidupan sosial.'
    },
    {
        id: 203,
        tab: 'kaderisasi',
        jurusan: 'Kaderisasi',
        title: 'Diktat Analisis Sosial (Ansos) & Advokasi Lingkungan Berbasis Data Lab',
        contributor: 'Tim Instruktur PKD Ibnu Sina',
        type: 'Diktat • 30 Halaman',
        summary: 'Panduan memadukan riset pengujian sampel laboratorium FMIPA dengan pemetaan masalah sosial masyarakat.'
    },

    // TAB 3: ARSIP MAS/MBAK (BEASISWA & LOMBA)
    {
        id: 301,
        tab: 'arsip',
        jurusan: 'Arsip Prestasi',
        title: '[Arsip Lolos Pendanaan] Proposal PKM-RE: Bioplastik Kitosan Limbah Kulit Udang',
        contributor: 'Mas Rizky dkk. (Kader Kimia & Biologi Angkatan 21)',
        type: 'Berkas Proposal Asli + Catatan Reviewer',
        summary: 'Contoh penyusunan Bab 1–3, format RAB yang lolos penilaian Simbelmawa, serta tips memilih judul riset eksakta.'
    },
    {
        id: 302,
        tab: 'arsip',
        jurusan: 'Arsip Prestasi',
        title: '[Arsip Awardee] Esai & Motivation Letter Lolos Beasiswa Unggulan & Djarum',
        contributor: 'Mbak Aulia & Mas Farhan (Alumni Rayon Ibnu Sina)',
        type: 'Bundel Dokumen + Tips Wawancara',
        summary: 'Berisi 3 contoh esai asli yang lolos seleksi berkas serta daftar 20 pertanyaan wawancara beasiswa yang paling sering muncul.'
    },
    {
        id: 303,
        tab: 'arsip',
        jurusan: 'Arsip Prestasi',
        title: '[Arsip Juara 1 LKTI Nasional] Full Paper & Slide Presentasi Finalis',
        contributor: 'Tim Riset Ibnu Sina (Fisika & Matematika)',
        type: 'Full Paper + PPT Pitching',
        summary: 'Referensi tata letak karya tulis ilmiah, pembuatan abstrak yang kuat, dan desain slide presentasi 10 menit di depan dewan juri.'
    },
    {
        id: 304,
        tab: 'arsip',
        jurusan: 'Arsip Prestasi',
        title: '[Arsip Pembahasan] Bank Soal Seleksi ONMIPA-PT Tingkat Fakultas & Wilayah',
        contributor: 'Delegasi ONMIPA Rayon Ibnu Sina',
        type: 'Bundel Soal & Solusi',
        summary: 'Kumpulan soal latihan dan pembahasan rinci dari Mas/Mbak kader yang pernah mewakili FMIPA UM di ajang ONMIPA.'
    }
];

const aksaraData = [
    {
        id: 1,
        title: 'Tuhan di Antara Tabung Reaksi dan Deret Tak Hingga',
        category: 'Puisi',
        author: 'Sahabati Laila (S1 Kimia)',
        date: '2 Hari Lalu',
        likes: 24,
        excerpt: 'Di laboratorium yang dingin, kami menakar larutan dengan pipet presisi. Namun di luar jendela kaca, ada keadilan sosial yang tak selesai dihitung dengan rumus konsentrasi...',
        fullText: 'Di laboratorium yang dingin,\nkami menakar larutan dengan pipet presisi.\nSetiap tetes indikator mengubah warna menjadi pasti.\n\nNamun di luar jendela kaca,\nada nasib petani dan sungai tercemar\nyang tak selesai dihitung dengan rumus konsentrasi.\n\nMaka kami belajar mengeja dzikir di dalam fikir,\nagar sains tak berhenti menjadi menara gading,\nmelainkan lentera yang turun menyapa bumi.'
    },
    {
        id: 2,
        title: 'Mengapa Mahasiswa Sains Tidak Boleh Netral Terhadap Krisis Iklim?',
        category: 'Opini & Esai',
        author: 'Sahabat Dimas (S1 Fisika)',
        date: '4 Hari Lalu',
        likes: 31,
        excerpt: 'Data pemanasan global lahir dari instrumen saintifik, tetapi kebijakan publik sering kali mengabaikannya. Di sinilah kader PMII FMIPA memikul tanggung jawab ganda...',
        fullText: 'Data pemanasan global lahir dari instrumen saintifik, tetapi kebijakan publik sering kali mengabaikannya. Banyak ilmuwan merasa tugasnya selesai setelah jurnal terbit.\n\nSebagai kader PMII di lingkungan FMIPA UM, kita memiliki tanggung jawab epistemologis sekaligus moral: memastikan angka-angka hasil pengujian laboratorium diterjemahkan menjadi advokasi kebijakan yang berpihak pada kelestarian ekologis dan masyarakat kecil.'
    },
    {
        id: 3,
        title: 'Resensi Buku: "Filsafat Sains Menurut Ibnu Sina" — Relevansinya bagi Mahasiswa MIPA',
        category: 'Resensi Buku',
        author: 'Lingkar Sahabat Baca Ibnu Sina',
        date: '1 Minggu Lalu',
        likes: 19,
        excerpt: 'Hasil bedah buku mingguan komunitas Sahabat Baca: bagaimana sang polimatik Islam memadukan observasi empiris kedokteran-fisika dengan ketajaman logika...',
        fullText: 'Buku ini membuka mata kita bahwa Ibnu Sina (Avicenna) bukan sekadar simbol nama rayon. Ia adalah teladan bagaimana seorang peneliti melakukan eksperimen empiris secara ketat sembari menjaga kedalaman spiritual dan keberpihakan pada kemanusiaan.'
    },
    {
        id: 4,
        title: 'Catatan Malam Sebelum Laporan Praktikum Dikumpulkan',
        category: 'Cerpen',
        author: 'Sahabat Riko (S1 Biologi)',
        date: '2 Minggu Lalu',
        likes: 27,
        excerpt: 'Jam dinding mabes rayon sudah menunjuk pukul sebelas malam. Di meja kayu, kertas milimeter blok berserakan berdampingan dengan cangkir kopi yang tinggal ampas...',
        fullText: 'Jam dinding mabes rayon sudah menunjuk pukul sebelas malam. Di meja kayu, kertas milimeter blok berserakan berdampingan dengan cangkir kopi yang tinggal ampas.\n\n"Garis regresimu miring, Sahabat," tegur Mas Fauzi sambil tersenyum, lalu duduk membantu memeriksa hitungan ralatku. Malam itu aku sadar, di rayon ini aku tidak pernah sendirian menghadapi kerasnya perkuliahan.'
    }
];

const marketData = [
    {
        id: 1,
        name: 'Jas Laboratorium Standar FMIPA + Bordir Nama',
        category: 'ATK & Kebutuhan Lab',
        price: 'Rp 115.000',
        seller: 'Tim Kewirausahaan Avicenna Space',
        badge: 'Ready Stock',
        poster: 'https://placehold.co/600x360/0f2557/facc15?text=FOTO+JAS+LABORATORIUM+FMIPA',
        desc: 'Ukuran S–XXL bahan Oxford tebal • COD langsung di Gazebo FMIPA UM'
    },
    {
        id: 2,
        name: 'Paket ATK Praktikum (Kertas Milimeter Blok, Kalkulator & Modul)',
        category: 'ATK & Kebutuhan Lab',
        price: 'Rp 18.000',
        seller: 'Sahabati Rani (S1 Matematika)',
        badge: 'COD FMIPA',
        poster: 'https://placehold.co/600x360/1e3a8a/ffffff?text=FOTO+PAKET+ATK+PRAKTIKUM',
        desc: 'Paket hemat perlengkapan laprak & ujian • Siap antar ke gedung kuliah FMIPA'
    },
    {
        id: 3,
        name: 'Risol Mayo & Rice Bowl Ayam Teriyaki (PO Harian)',
        category: 'Makanan & Minuman',
        price: 'Rp 12.000',
        seller: 'Sahabati Dinda (S1 Kimia)',
        badge: 'PO Harian',
        poster: 'https://placehold.co/600x360/065f46/facc15?text=FOTO+RISOL+MAYO+%26+RICE+BOWL',
        desc: 'Sarapan & makan siang sela praktikum • Pengantaran jam 11.30 di lobi jurusan'
    },
    {
        id: 4,
        name: 'Jasa Olah Data Statistik (SPSS / R / Python) & Layout KTI',
        category: 'Jasa & Merch',
        price: 'Mulai Rp 35.000',
        seller: 'Sahabat Ilham (S1 Matematika)',
        badge: 'Fast Respon',
        poster: 'https://placehold.co/600x360/334155/facc15?text=POSTER+JASA+OLAH+DATA+STATISTIK',
        desc: 'Konsultasi uji statistik riset, grafik jurnal & perapian daftar pustaka Mendeley'
    },
    {
        id: 5,
        name: 'Kaos & Totebag Eksklusif "Saintis Pergerakan — Ibnu Sina"',
        category: 'Jasa & Merch',
        price: 'Rp 75.000',
        seller: 'Biro Ekraf Rayon Ibnu Sina',
        badge: 'Official Merch',
        poster: 'https://placehold.co/600x360/1d4ed8/ffffff?text=FOTO+MERCH+SAINTIS+PERGERAKAN',
        desc: 'Cotton Combed 24s adem • Sebagian keuntungan untuk kas kegiatan kaderisasi'
    },
    {
        id: 6,
        name: 'Kopi Botol Literan & Matcha Dingin "Sina Brew"',
        category: 'Makanan & Minuman',
        price: 'Rp 15.000',
        seller: 'Sahabat Zaki (S1 Fisika)',
        badge: 'Ready Dingin',
        poster: 'https://placehold.co/600x360/78350f/facc15?text=FOTO+KOPI+SINA+BREW+250ML',
        desc: 'Teman begadang ngerjakan laprak & diskusi malam • Ukuran 250ml & 500ml'
    }
];

const agendaData = [
    {
        day: 'Jumat',
        date: '15 Nov • 15.30 WIB',
        category: 'Avicenna Space',
        title: 'Kelas Kepenulisan #3: Bedah Kerangka Esai & Klinik KTI',
        location: 'Gazebo FMIPA UM',
        pj: 'Sahabat Dimas',
        gcalDates: '20261115T083000Z/20261115T103000Z'
    },
    {
        day: 'Sabtu',
        date: '16 Nov • 19.00 WIB',
        category: 'Avicenna Space',
        title: 'Latihan Rutin & Sparing Komunitas Futsal Ibnu Sina',
        location: 'Champions Futsal Malang',
        pj: 'Sahabat Bagas',
        gcalDates: '20261116T120000Z/20261116T140000Z'
    },
    {
        day: 'Minggu',
        date: '17 Nov • 16.00 WIB',
        category: 'Avicenna Space',
        title: 'Lingkar Sahabat Baca: Diskusi Buku & Ulasan Karya',
        location: 'Mabes Rayon PMII Ibnu Sina',
        pj: 'Sahabat Fikri',
        gcalDates: '20261117T090000Z/20261117T110000Z'
    },
    {
        day: 'Rabu',
        date: '20 Nov • 16.00 WIB',
        category: 'Avicenna Space',
        title: 'Kelas Kewirausahaan: Praktik Katalog Produk & Ide PKM-K',
        location: 'Mabes Rayon PMII Ibnu Sina',
        pj: 'Sahabati Rania',
        gcalDates: '20261120T090000Z/20261120T110000Z'
    },
    {
        day: 'Kamis',
        date: '21 Nov • 18.30 WIB',
        category: 'Kegiatan Rayon',
        title: 'Rutinan Dzikir, Tahlil & Kajian Epistemologi Sains',
        location: 'Mabes Rayon PMII Ibnu Sina',
        pj: 'Bidang Kaderisasi & Keagamaan',
        gcalDates: '20261121T113000Z/20261121T133000Z'
    }
];
