import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generate default roadmap for 12 months, 4 weeks each, with structured tasks
const generateDefaultRoadmap = () => {
  const roadmap = {};
  for (let m = 1; m <= 12; m++) {
    roadmap[m] = {};
    for (let w = 1; w <= 4; w++) {
      roadmap[m][w] = {
        Senin: '',
        Selasa: '',
        Rabu: '',
        Kamis: '',
        Jumat: '',
        Sabtu: '',
        Minggu: ''
      };

      // Define default tasks per month/week
      if (m === 1) {
        if (w === 1) {
          roadmap[m][w] = {
            Senin: 'Riset niche (real estate/home services) & kumpulkan 5-10 referensi desain top performer (ATM: Amati)',
            Selasa: 'Wireframe halaman home portofolio #1 â€” struktur section, copy placeholder',
            Rabu: 'Build halaman home di Framer Î“Ã‡Ã¶ layout, komponen dasar',
            Kamis: 'Build halaman kedua (listing/services) + styling',
            Jumat: 'Build halaman ketiga (contact/about) + responsive check',
            Sabtu: 'Polish keseluruhan â€” animasi ringan, micro-interaction, copywriting final (3 jam)',
            Minggu: 'Review portofolio #1, catat kekurangan. Evaluasi mingguan CapCut & YT'
          };
        } else if (w === 2) {
          roadmap[m][w] = {
            Senin: 'Build portofolio #2 (niche sama, use case berbeda, pakai komponen dari portofolio #1) - Hari 1',
            Selasa: 'Build portofolio #2 (niche sama, use case berbeda, pakai komponen dari portofolio #1) - Hari 2',
            Rabu: 'Build portofolio #2 (niche sama, use case berbeda, pakai komponen dari portofolio #1) - Hari 3',
            Kamis: 'Build portofolio #3 (variasi ketiga / sub-niche spesifik) - Hari 1',
            Jumat: 'Build portofolio #3 (variasi ketiga / sub-niche spesifik) - Hari 2',
            Sabtu: 'Siapkan materi outreach â€” screenshot showcase, 1 halaman case study per portofolio, 2-3 draft pesan outreach',
            Minggu: 'Review semua portofolio, pastikan siap outreach minggu depan. Evaluasi mingguan CapCut & YT'
          };
        } else {
          roadmap[m][w] = {
            Senin: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Polish portofolio | 1 jam: Follow-up',
            Selasa: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Polish portofolio | 1 jam: Follow-up',
            Rabu: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Polish portofolio | 1 jam: Follow-up',
            Kamis: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Polish portofolio | 1 jam: Follow-up',
            Jumat: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Polish portofolio | 1 jam: Follow-up',
            Sabtu: 'Framer 3 jam (polish/materi outreach â€” batch, bukan harian)',
            Minggu: 'Review outreach & follow up, evaluasi mingguan CapCut & YT'
          };
        }
      } else if (m === 2) {
        roadmap[m][w] = {
          Senin: 'Kirim outreach aktif ke 10 target bisnis lokal baru (FB Group / Subreddit / Google Maps)',
          Selasa: 'Outreach aktif 10 kontak baru + follow-up prospek hari kemarin',
          Rabu: 'Outreach aktif 10 kontak baru. Kerjakan project test-task atau negosiasi jika ada respon',
          Kamis: 'Outreach aktif 10 kontak baru + tawarkan free audit untuk website bisnis lokal yang buruk',
          Jumat: 'Outreach aktif 10 kontak baru + follow-up massal seluruh kontak minggu ini',
          Sabtu: 'Sesi Polish & review portfolio Framer. Target closing klien pertama senilai $300',
          Minggu: 'Istirahat total + review mingguan perkembangan CapCut & YT'
        };
      } else if (m >= 3 && m <= 4) {
        roadmap[m][w] = {
          Senin: 'Outreach bisnis menengah (LinkedIn / Cold Email). Target rate per project naik ke $500',
          Selasa: 'Outreach 10 kontak baru + follow-up. Desain halaman template Framer komersial pertama',
          Rabu: 'Outreach 10 kontak baru. Lanjutkan build template Framer komersial (landing page + subpages)',
          Kamis: 'Outreach 10 kontak baru. Hubungi agensi web design untuk tawarkan jasa sub-kontrak Framer',
          Jumat: 'Outreach 10 kontak baru + follow-up. Selesaikan build template Framer komersial',
          Sabtu: 'Publish/upload template Framer ke platform directory / Gumroad untuk passive income',
          Minggu: 'Evaluasi performa bulanan, target income bulanan menembus $800'
        };
      } else if (m >= 5 && m <= 6) {
        roadmap[m][w] = {
          Senin: 'Outreach 5 kontak premium + buat postingan progress design di Twitter/X untuk exposure',
          Selasa: 'Outreach 5 kontak premium. Kerjakan project klien berjalan (Rate target $800/project)',
          Rabu: 'Outreach 5 kontak premium. Lanjutkan pengerjaan website klien / update template',
          Kamis: 'Outreach 5 kontak premium. Share tips Framer atau design showcase di Twitter/X / LinkedIn',
          Jumat: 'Outreach 5 kontak premium + follow-up. Selesaikan & kirim draft website ke klien',
          Sabtu: 'Tulis 1 tutorial pendek Framer atau rekap mingguan sebagai branding expert',
          Minggu: 'Review mingguan & istirahat total, target income $1000 - $1500/bulan'
        };
      } else if (m >= 7 && m <= 9) {
        roadmap[m][w] = {
          Senin: 'Outreach target agensi & bisnis kelas menengah atas (Target rate $1000 - $1500/project)',
          Selasa: 'Outreach premium. Kerjakan project klien berjalan. Buat penawaran retainer bulanan',
          Rabu: 'Outreach premium. Tawarkan paket maintenance bulanan $100/bulan ke seluruh mantan klien',
          Kamis: 'Outreach premium + share studi kasus kesuksesan proyek sebelumnya di sosial media',
          Jumat: 'Outreach premium + follow-up. Finalisasi proyek klien berjalan',
          Sabtu: 'Audit website prospek potensial secara detail untuk dikirim hari Senin depan',
          Minggu: 'Evaluasi finansial bulanan, target income $1500 - $2500/bulan'
        };
      } else {
        roadmap[m][w] = {
          Senin: 'Outreach target enterprise / agensi skala besar untuk project high-ticket ($2000+)',
          Selasa: 'Fokus pengerjaan project high-ticket berjalan. Kelola retainer maintenance',
          Rabu: 'Review retainer bulanan. Jika overload, delegasikan tugas minor ke rekan/freelancer lain',
          Kamis: 'Branding pasif di platform global. Kerjakan proyek high-ticket',
          Jumat: 'Outreach premium + follow-up. Selesaikan proyek mingguan',
          Sabtu: 'Scale up portfolio premium. Lakukan audit performa bisnis 12 bulan terakhir',
          Minggu: 'Evaluasi pencapaian target $3000/bulan, istirahat dan nikmati pencapaian'
        };
      }
    }
  }
  return roadmap;
};

const initialIntentions = [
  { id: 1, when: 'PAGI', trigger: 'sudah sarapan dan duduk di meja', response: 'langsung buka Suno dan generate 1 track â€” sebelum buka sosmed apapun.', note: 'Trigger fisik (duduk) lebih kuat dari trigger waktu. Urutan jelas = tidak ada decision fatigue.' },
  { id: 2, when: 'PAGI', trigger: 'sudah duduk di jam kerja Framer', response: 'langsung buka file portofolio/outreach terakhir â€” sebelum cek sosmed apa pun.', note: 'âš¡ Fokus Baru' },
  { id: 3, when: 'PAGI', trigger: 'portofolio sudah siap (Minggu 3 dst)', response: 'kirim 5 outreach dulu sebelum kerjakan hal lain di jam Framer.', note: 'âš¡ Fokus Baru' },
  { id: 4, when: 'SIANG', trigger: 'jam makan siang dan ada 10 menit', response: 'buka catatan dan tulis 1 kalimat: "Tadi aku sudah [X]. Besok aku akan [Y]."', note: 'Mencatat progress kecil mempertahankan momentum. Eksternalisasi pikiran = kepala lebih jernih.' }
];

const initialLadder = [
  { id: 1, stageNum: 'Bulan 1', stageName: 'Portofolio Framer', skill: 'Portofolio Framer siap (3 buah), mulai outreach. Target closing: 0-1 klien. CapCut & YT tetap jalan maintenance.', income: '0-1 Klien' },
  { id: 2, stageNum: 'Bulan 2', stageName: 'Closing Pertama', skill: 'Closing klien pertama. CapCut & YT tetap jalan maintenance.', income: 'Klien #1 ($300)' },
  { id: 3, stageNum: 'Bulan 3-4', stageName: 'Scaling Project', skill: 'Closing klien ke-2, ke-3. Rate $500/project. Mulai dapat passive income template.', income: '$500-1000/mo' },
  { id: 4, stageNum: 'Bulan 5-6', stageName: 'Stabil Income', skill: 'Stabil di $1000-1500/bln dari 2-3 klien berjalan + template sales.', income: '$1000-1500/mo' },
  { id: 5, stageNum: 'Bulan 7-9', stageName: 'High-Ticket retainer', skill: 'Closing project $1000+ dan retainer bulanan $100/bln.', income: '$1500-2500/mo' },
  { id: 6, stageNum: 'Bulan 10-12', stageName: 'Agency & retainers', skill: 'Stabil retainers + high-ticket project. Pemasukan konsisten menembus $3000/bln.', income: '$3000+/mo' }
];

const initialDaily = [
  { id: 1, char: 'ðŸŒ…', time: '05:00â€“06:00 Â· Pagi', name: 'Creative Block / YT', tasks: ['Render & upload video sesuai jadwal batch â€” TIDAK buka analytics/dashboard hari ini'] },
  { id: 2, char: 'âœ‚ï¸', time: '06:00â€“07:00 Â· Pagi', name: 'Capcut Block', tasks: ['Buat 3-5 template Capcut, upload langsung â€” evaluasi performa hari Minggu saja'] },
  { id: 3, char: 'ðŸŽ¨', time: 'Framer Block (4-6 jam)', name: 'Framer Development', tasks: ['Kerjakan sesuai Fase & Hari yang ditentukan di tab Jadwal'] }
];

const initialReframes = [
  { id: 1, old: 'Aku bersaing dengan expert Framer yang portofolionya sudah bagus dan berpengalaman.', new: 'Aku tidak perlu bersaing di arena yang sama. Cari niche kecil yang belum ramai â€” seperti dulu waktu closing klien pertama lewat FB grup, bukan platform besar penuh senior.' },
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
    'Bangun sedikit exposure pasif Framer di X (posting progress) â€” mulai bulan 4-6, bukan sekarang',
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
      }),

      // Framer Roadmap (12 Months * 4 Weeks * 7 Days)
      framerRoadmap: generateDefaultRoadmap(),
      updateRoadmapTask: (month, week, day, text) => set((state) => {
        const updated = { ...state.framerRoadmap };
        if (!updated[month]) updated[month] = {};
        if (!updated[month][week]) updated[month][week] = {};
        updated[month][week][day] = text;
        return { framerRoadmap: updated };
      }),
      resetRoadmap: () => set({ framerRoadmap: generateDefaultRoadmap() }),

      // Reset all defaults helper
      resetAllDefaults: () => set({
        notepad: initialNotepad,
        pinnedActions: {
          today: 'Riset niche Framer (real estate/home services) + kumpulkan 5-10 referensi desain top performer',
          week: 'Selesaikan Portofolio Framer #1 (3 halaman: home, listing/services, contact)'
        },
        intentions: initialIntentions,
        ladder: initialLadder,
        currentLadderStage: 1,
        dailyBlocks: initialDaily,
        weeklyReviews: initialWeeklyReviews,
        trackers: initialTrackers,
        reframes: initialReframes,
        coveyMatrix: initialCovey,
        mistakes: initialMistakes,
        blocklist: initialBlocklist,
        rewards: initialRewards,
        auditTasks: initialAuditTasks,
        quickTasks: [],
        deepWorkLogs: [],
        framerRoadmap: generateDefaultRoadmap()
      })
    }),
    {
      name: 'life-os-cream-storage-v3',
    }
  )
);

