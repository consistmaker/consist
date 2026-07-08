import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialIntentions = [
  { id: 1, when: 'PAGI', trigger: 'sudah sarapan dan duduk di meja', response: 'langsung buka Suno dan generate 1 track — sebelum buka sosmed apapun.', note: '🐨 Koala: trigger fisik (duduk) lebih kuat dari trigger waktu. 🦅 Elang: urutan jelas = tidak ada decision fatigue.' },
  { id: 2, when: 'PAGI', trigger: 'sudah duduk di jam kerja Framer', response: 'langsung buka file portofolio/outreach terakhir — sebelum cek sosmed apa pun.', note: '⚡ Fokus Baru' },
  { id: 3, when: 'PAGI', trigger: 'portofolio sudah siap (Minggu 3 dst)', response: 'kirim 5 outreach dulu sebelum kerjakan hal lain di jam Framer.', note: '⚡ Fokus Baru' },
  { id: 4, when: 'SIANG', trigger: 'jam makan siang dan ada 10 menit', response: 'buka catatan dan tulis 1 kalimat: "Tadi aku sudah [X]. Besok aku akan [Y]."', note: '🦁 Singa: mencatat progress kecil mempertahankan momentum. 🦅 Elang: eksternalisasi pikiran = kepala lebih jernih.' }
];

const initialLadder = [
  { id: 1, stageNum: 'Bulan 1', stageName: 'Portofolio Framer', skill: 'Portofolio Framer siap (3 buah), mulai outreach. Target closing: 0-1 klien. CapCut & YT tetap jalan maintenance.', income: '0-1 Klien' },
  { id: 2, stageNum: 'Bulan 2', stageName: 'Closing Pertama', skill: 'Closing klien pertama. CapCut & YT tetap jalan maintenance.', income: 'Klien #1' },
  { id: 3, stageNum: 'Bulan 3-4', stageName: 'Scaling Project', skill: 'Closing klien ke-2, ke-3. Mulai bisa hitung rate per project.', income: 'Rate/Project' },
  { id: 4, stageNum: 'Bulan 5-6', stageName: 'Stabil Income', skill: 'Stabil di $300-1000/bln dari 2-3 klien berjalan. Mulai sisihkan sedikit waktu untuk exposure pasif jangka panjang.', income: '$300-1000/mo' }
];

const initialDaily = [
  { id: 1, char: '🌅', time: '05:00–06:00 · Pagi', name: 'Creative Block / YT', tasks: ['Render & upload video sesuai jadwal batch — TIDAK buka analytics/dashboard hari ini'] },
  { id: 2, char: '✂️', time: '06:00–07:00 · Pagi', name: 'Capcut Block', tasks: ['Buat 3-5 template Capcut, upload langsung — evaluasi performa hari Minggu saja'] },
  { id: 3, char: '🎨', time: 'Framer Block (4-6 jam)', name: 'Framer Development', tasks: ['Kerjakan sesuai Fase & Hari yang ditentukan di tab Jadwal'] }
];

const initialReframes = [
  { id: 1, old: 'Aku bersaing dengan expert Framer yang portofolionya sudah bagus dan berpengalaman.', new: 'Aku tidak perlu bersaing di arena yang sama. Cari niche kecil yang belum ramai — seperti dulu waktu closing klien pertama lewat FB grup, bukan platform besar penuh senior.' },
  { id: 2, old: 'Pengeluaran terus naik, pemasukan tidak cukup, aku gagal.', new: 'Aku sedang membangun income stream kedua. Gap finansial adalah motivasi, bukan bukti kegagalan.' },
  { id: 3, old: 'Kompetitor sudah ratusan video, aku baru mulai dari 0.', new: 'Mereka juga pernah di video ke-1. Yang aku perlukan hanya video ke-1 hari ini.' }
];

const initialTrackers = [
  { id: 1, name: 'Buat Template Capcut', history: [] },
  { id: 2, name: 'Portofolio Framer Selesai (Target: 3)', history: [] },
  { id: 3, name: 'Outreach Terkirim (Target: 5-10/hari)', history: [] },
  { id: 4, name: 'Klien Closing (Total Tahunan)', history: [] }
];

const initialWeeklyReviews = [
  { id: 1, q1: 'Portofolio #1 selesai tepat waktu.', q2: 'Waktu habis untuk polish berlebihan di satu section.', q3: 'Jika edit jam 17:00, aku set timer 1 jam. Kalau habis, langsung render.' }
];

const initialCovey = {
  q1: ['Pengeluaran otw 4jt per bulan', 'Tambahan Penghasilan $300-1000/bln dari Framer dalam 6 bulan'],
  q2: [
    'Bangun sedikit exposure pasif Framer di X (posting progress) — mulai bulan 4-6, bukan sekarang',
    'Pelajari 1 skill AI-assisted design tambahan per bulan (biar kualitas Framer naik bertahap, bukan sekaligus M-shape)'
  ],
  q3: ['Cek notifikasi sosmed di luar jam kerja', 'Ganti-ganti niche/strategi sebelum 1 siklus penuh selesai'],
  q4: ['Microstock upload (ditinggal dulu sesuai keputusan)', 'CapCut level pro/kompetisi tinggi (timeline tidak cocok untuk 6 bulan)']
};

const initialNotepad = `Fokus 6 bulan: Framer jadi prioritas utama (siklus closing tercepat & terbukti), CapCut & YT jadi maintenance ringan (1 jam masing-masing). Microstock ditinggal dulu. Ukuran sukses harian = checklist selesai, bukan hasil. Ukuran sukses 6 bulan = siklus closing klien terbukti berulang, bukan langsung capai $10k.

Embrace Boredom: Multitasking membuat otak lelah dan butuh gratifikasi instan. Fokus pada satu tugas demi Deep Work.
Deep Work: Lakukan sesi kerja terfokus tanpa distraksi HP atau sosmed.
Atomic Habits: Meningkat 1% setiap hari akan berakumulasi luar biasa dalam jangka panjang.`;

const initialMistakes = [
  { id: 1, date: '2026-07-08', text: 'Buka analytics YT di hari Rabu' }
];

const initialBlocklist = [
  'facebook.com', 'instagram.com', 'tiktok.com', 'samehadaku.care', 'drakorindo.co', 'rebahinxxi.rest', 'manhwa'
];

const initialRewards = [
  'Grand Chase 30 Menit', 'Buka IG wirilett & geraldvincentt', 'Lihat Konten naikkelas & ekonom'
];

const initialAuditTasks = [
  { id: 1, text: 'Framer: task hari ini selesai (build/outreach sesuai fase)', done: false },
  { id: 2, text: 'CapCut: 3-5 template dibuat & upload', done: false },
  { id: 3, text: 'YT: render & upload sesuai jadwal, TIDAK cek performa', done: false }
];

export const useStore = create(
  persist(
    (set) => ({
      // Notepad
      notepad: initialNotepad,
      setNotepad: (text) => set({ notepad: text }),

      // Pinned Actions
      pinnedActions: {
        today: 'Riset niche Framer (real estate/home services) + kumpulkan 5-10 referensi desain top performer',
        week: 'Selesaikan Portofolio Framer #1 (3 halaman: home, listing/services, contact)'
      },
      setPinnedActions: (actions) => set({ pinnedActions: actions }),

      // Intentions
      intentions: initialIntentions,
      addIntention: (intention) => set((state) => ({ intentions: [...state.intentions, { ...intention, id: Date.now() }] })),
      deleteIntention: (id) => set((state) => ({ intentions: state.intentions.filter((i) => i.id !== id) })),
      
      // Income Ladder
      currentLadderStage: 1,
      setCurrentLadderStage: (id) => set({ currentLadderStage: id }),
      ladder: initialLadder,
      updateLadder: (id, updated) => set((state) => ({ ladder: state.ladder.map(l => l.id === id ? { ...l, ...updated } : l) })),
      addLadderStage: (stage) => set((state) => ({ ladder: [...state.ladder, { ...stage, id: Date.now() }] })),

      // Daily Systems
      dailyBlocks: initialDaily,
      addDailyBlock: (block) => set((state) => ({ dailyBlocks: [...state.dailyBlocks, { ...block, id: Date.now(), tasks: block.tasks || [] }] })),
      deleteDailyBlock: (id) => set((state) => ({ dailyBlocks: state.dailyBlocks.filter((d) => d.id !== id) })),
      
      // Weekly Reviews
      weeklyReviews: initialWeeklyReviews,
      addWeeklyReview: (review) => set((state) => ({ weeklyReviews: [...state.weeklyReviews, { ...review, id: Date.now() }] })),
      deleteWeeklyReview: (id) => set((state) => ({ weeklyReviews: state.weeklyReviews.filter((r) => r.id !== id) })),

      // Progress Trackers
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

      // Reframes
      reframes: initialReframes,
      addReframe: (reframe) => set((state) => ({ reframes: [...state.reframes, { ...reframe, id: Date.now() }] })),
      deleteReframe: (id) => set((state) => ({ reframes: state.reframes.filter((r) => r.id !== id) })),

      // Covey Matrix
      coveyMatrix: initialCovey,
      updateCovey: (key, items) => set((state) => ({
        coveyMatrix: { ...state.coveyMatrix, [key]: items }
      })),

      // Mistakes
      mistakes: initialMistakes,
      addMistake: (text) => set((state) => ({
        mistakes: [...state.mistakes, { id: Date.now(), date: new Date().toISOString().split('T')[0], text }]
      })),
      deleteMistake: (id) => set((state) => ({
        mistakes: state.mistakes.filter(m => m.id !== id)
      })),

      // Blocklist
      blocklist: initialBlocklist,
      addBlocklistItem: (item) => set((state) => ({
        blocklist: [...state.blocklist.filter(i => i !== item), item]
      })),
      deleteBlocklistItem: (item) => set((state) => ({
        blocklist: state.blocklist.filter(i => i !== item)
      })),

      // Rewards
      rewards: initialRewards,
      addReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
      deleteReward: (reward) => set((state) => ({ rewards: state.rewards.filter(r => r !== reward) })),

      // Audit Tasks
      auditTasks: initialAuditTasks,
      toggleAuditTask: (id) => set((state) => {
        const updated = state.auditTasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
        // Save today's completion trend
        const todayStr = new Date().toISOString().split('T')[0];
        const doneCount = updated.filter(t => t.done).length;
        const totalCount = updated.length;
        const ratio = totalCount > 0 ? doneCount / totalCount : 0;
        
        return {
          auditTasks: updated,
          auditHistory: {
            ...(state.auditHistory || {}),
            [todayStr]: ratio
          }
        };
      }),
      resetAuditTasks: () => set((state) => ({
        auditTasks: state.auditTasks.map(t => ({ ...t, done: false }))
      })),
      addAuditTask: (text) => set((state) => ({
        auditTasks: [...state.auditTasks, { id: Date.now(), text, done: false }]
      })),
      deleteAuditTask: (id) => set((state) => ({
        auditTasks: state.auditTasks.filter(t => t.id !== id)
      })),

      // Audit History for trends
      auditHistory: {},

      // Quick Tasks
      quickTasks: [],
      addQuickTask: (text) => set((state) => ({
        quickTasks: [...state.quickTasks, { id: Date.now(), text, done: false }]
      })),
      toggleQuickTask: (id) => set((state) => ({
        quickTasks: state.quickTasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
      })),
      deleteQuickTask: (id) => set((state) => ({
        quickTasks: state.quickTasks.filter(t => t.id !== id)
      })),

      // Deep Work log
      deepWorkLogs: [],
      logDeepWork: (minutes) => set((state) => {
        const todayStr = new Date().toISOString().split('T')[0];
        const existingLogIndex = state.deepWorkLogs.findIndex(l => l.date === todayStr);
        if (existingLogIndex > -1) {
          const updated = [...state.deepWorkLogs];
          updated[existingLogIndex].minutes += minutes;
          return { deepWorkLogs: updated };
        } else {
          return { deepWorkLogs: [...state.deepWorkLogs, { date: todayStr, minutes }] };
        }
      })
    }),
    {
      name: 'life-os-framer-storage',
    }
  )
);
