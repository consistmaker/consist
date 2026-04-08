import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialIntentions = [
  { id: 1, when: 'PAGI', trigger: 'sudah sarapan dan duduk di meja', response: 'langsung buka Suno dan generate 1 track — sebelum buka sosmed apapun.', note: '🐨 Koala: trigger fisik (duduk) lebih kuat dari trigger waktu. 🦅 Elang: urutan jelas = tidak ada decision fatigue.' },
  { id: 2, when: 'SIANG', trigger: 'jam makan siang dan ada 10 menit', response: 'buka catatan dan tulis 1 kalimat: "Tadi aku sudah [X]. Besok aku akan [Y]."', note: '🦁 Singa: mencatat progress kecil mempertahankan momentum. 🦅 Elang: eksternalisasi pikiran = kepala lebih jernih.' }
];

const initialLadder = [
  { id: 1, stageNum: 'Tahap 1', stageName: 'Sekarang', skill: 'Gaji UMR + skill tunggal. Pengeluaran melebihi pemasukan. Belum ada income stream kedua yang aktif.', income: 'UMR' },
  { id: 2, stageNum: 'Tahap 2', stageName: 'Bulan 1–3', skill: 'Upload 10–20 video YouTube. Workflow otomatis terbentuk. Mulai dapat data: video mana yang perform. Belum ada income tapi sistem sudah berjalan.', income: '$0–50/mo' },
  { id: 3, stageNum: 'Tahap 3', stageName: 'Bulan 3–8', skill: 'YPP aktif. Income YT mulai masuk. Skill: musik AI + video editing + SEO YouTube terbentuk. Deliberate practice: perbaiki 1 hal per video.', income: '$100–500/mo' },
  { id: 4, stageNum: 'Tahap 4', stageName: 'Bulan 8–18', skill: 'YT stabil. Buka kembali microstock dengan strategi baru. Mulai Framer/Elementor template. Tiga income stream aktif bersamaan.', income: '$500–2k/mo' },
  { id: 5, stageNum: 'Tahap 5', stageName: 'Bulan 18–36', skill: 'Compounding konten + template sales + web design service. Skill set rare + valuable terbentuk. Income bisa scale tanpa linear tambah jam kerja.', income: '$2k–10k/mo' }
];

const initialDaily = [
  { id: 1, char: '🌅', time: '05:00–06:00 · Pagi', name: 'Creative Block', tasks: ['Baca catatan malam sebelumnya', 'Generate 1 track Suno ATAU buat visual AI', 'Sebelum buka sosmed apapun'] },
  { id: 2, char: '☀️', time: 'Kerja Utama · Siang', name: 'Kerja Utama', tasks: ['Fokus penuh ke pekerjaan utama', 'YouTube bukan prioritas jam ini', 'Jaga income primer tetap stabil'] },
  { id: 3, char: '🌙', time: '21:00–21:15 · Malam', name: 'Brain Load', tasks: ['Tulis 1 masalah kreatif di catatan', 'Tutup semua app — tidur'] }
];

const initialReframes = [
  { id: 1, old: '"Pengeluaran terus naik, pemasukan tidak cukup, aku gagal."', new: '"Aku sedang membangun income stream kedua. Gap finansial adalah motivasi, bukan bukti kegagalan."' },
  { id: 2, old: '"Kompetitor sudah ratusan video, aku baru mulai dari 0."', new: '"Mereka juga pernah di video ke-1. Yang aku perlukan hanya video ke-1 hari ini."' }
];

const initialTrackers = [
  { id: 1, name: 'Generate Track / Visual AI', history: [] },
  { id: 2, name: 'Upload 1 Video', history: [] }
];

const initialWeeklyReviews = [
  { id: 1, q1: 'Minggu ini aku sudah upload 2 video dan dapat 500 views, income $5.', q2: 'Terlalu perfeksionis saat editing, makan waktu lama.', q3: 'Jika edit jam 17:00, aku set timer 1 jam. Kalau habis, langsung render.' }
];

export const useStore = create(
  persist(
    (set) => ({
      intentions: initialIntentions,
      addIntention: (intention) => set((state) => ({ intentions: [...state.intentions, { ...intention, id: Date.now() }] })),
      deleteIntention: (id) => set((state) => ({ intentions: state.intentions.filter((i) => i.id !== id) })),
      
      currentLadderStage: 1,
      setCurrentLadderStage: (id) => set({ currentLadderStage: id }),
      ladder: initialLadder,
      updateLadder: (id, updated) => set((state) => ({ ladder: state.ladder.map(l => l.id === id ? { ...l, ...updated } : l) })),

      dailyBlocks: initialDaily,
      addDailyBlock: (block) => set((state) => ({ dailyBlocks: [...state.dailyBlocks, { ...block, id: Date.now(), tasks: block.tasks || [] }] })),
      deleteDailyBlock: (id) => set((state) => ({ dailyBlocks: state.dailyBlocks.filter((d) => d.id !== id) })),
      
      weeklyReviews: initialWeeklyReviews,
      addWeeklyReview: (review) => set((state) => ({ weeklyReviews: [...state.weeklyReviews, { ...review, id: Date.now() }] })),
      deleteWeeklyReview: (id) => set((state) => ({ weeklyReviews: state.weeklyReviews.filter((r) => r.id !== id) })),

      trackers: initialTrackers,
      addTracker: (name) => set((state) => ({ trackers: [...state.trackers, { id: Date.now(), name, history: [] }] })),
      deleteTracker: (id) => set((state) => ({ trackers: state.trackers.filter((t) => t.id !== id) })),
      toggleTracker: (id, dateStr) => set((state) => ({
        trackers: state.trackers.map(t => {
          if (t.id !== id) return t;
          const isDone = t.history.includes(dateStr);
          return { ...t, history: isDone ? t.history.filter(d => d !== dateStr) : [...t.history, dateStr] };
        })
      })),

      reframes: initialReframes,
      addReframe: (reframe) => set((state) => ({ reframes: [...state.reframes, { ...reframe, id: Date.now() }] })),
      deleteReframe: (id) => set((state) => ({ reframes: state.reframes.filter((r) => r.id !== id) }))
    }),
    {
      name: 'life-os-storage',
    }
  )
);
