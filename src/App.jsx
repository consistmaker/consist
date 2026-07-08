import React, { useState, useEffect } from 'react';
import { useStore } from './store';

// Inline SVG Icons
const Plus = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
);
const Trash2 = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
);
const Check = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const Clock = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const AlertTriangle = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const Layout = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
);
const Calendar = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="18" y2="10"/></svg>
);
const Grid = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18M12 3v18"/></svg>
);
const TrendingUp = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const FileText = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/></svg>
);

export default function App() {
  const store = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="layout-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span style={{ fontSize: '20px', marginRight: '8px' }}>🤖</span>
          <strong>LifeOS v2.0</strong>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Layout size={18} />
            <span>Fokus Harian</span>
          </button>
          <button className={`nav-item ${activeTab === 'jadwal' ? 'active' : ''}`} onClick={() => setActiveTab('jadwal')}>
            <Calendar size={18} />
            <span>Jadwal & Fase</span>
          </button>
          <button className={`nav-item ${activeTab === 'matrix' ? 'active' : ''}`} onClick={() => setActiveTab('matrix')}>
            <Grid size={18} />
            <span>Matrix & Mindset</span>
          </button>
          <button className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
            <TrendingUp size={18} />
            <span>Tracker & Habit</span>
          </button>
          <button className={`nav-item ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>
            <FileText size={18} />
            <span>Review & Proyeksi</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="footer-status">Framer + CapCut Focus</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="wrap">
          {activeTab === 'dashboard' && <TabDashboard store={store} />}
          {activeTab === 'jadwal' && <TabJadwal store={store} />}
          {activeTab === 'matrix' && <TabMatrix store={store} />}
          {activeTab === 'tracker' && <TabTracker store={store} />}
          {activeTab === 'review' && <TabReview store={store} />}
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   TAB: DASHBOARD (FOKUS HARIAN)
   ========================================================================== */
function TabDashboard({ store }) {
  const [pinnedEdit, setPinnedEdit] = useState(false);
  const [pinnedForm, setPinnedForm] = useState({ today: store.pinnedActions?.today || '', week: store.pinnedActions?.week || '' });
  const [quickInput, setQuickInput] = useState('');

  const savePinned = () => {
    store.setPinnedActions(pinnedForm);
    setPinnedEdit(false);
  };

  return (
    <div className="tab-section">
      {/* 1. Header / Kategori Utama */}
      <div className="hero">
        <div className="hero-eyebrow">
          <span>Life Operating System — Evidence Based</span>
        </div>
        <h1>Dari UMR<br />menuju <em>Top 1% Nasional</em></h1>
        <p className="hero-desc">
          Kamu punya 4-6 jam/hari untuk Framer, ditambah 1 jam CapCut dan 1 jam YT (maintenance) — total ini fokus utama penghasilan tambahan.
        </p>
        <div className="char-row">
          <span className="chip s">💼 Kerja+Survey</span>
          <span className="chip k">📚 Kuliah Online</span>
          <span className="chip e">🎵 YouTube Music</span>
          <span className="chip s">👨‍👩‍👧 Keluarga+Anak</span>
          <span className="chip k" style={{ borderColor: 'var(--singa)', color: 'var(--singa)', background: '#f9731612' }}>🎨 Framer Template</span>
          <span className="chip e" style={{ borderColor: 'var(--koala)', color: 'var(--koala)', background: '#06b6d412' }}>✂️ CapCut</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-col">
          
          {/* 3. Pinned Actions (Fokus Utama) */}
          <div className="card">
            <div className="card-header-flex">
              <h3 className="card-title">📌 Pinned Actions (Fokus Utama)</h3>
              <button className="btn btn-sm" onClick={() => {
                if (pinnedEdit) savePinned();
                else setPinnedEdit(true);
              }}>{pinnedEdit ? 'Simpan' : 'Edit'}</button>
            </div>
            
            {pinnedEdit ? (
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label className="form-label">📌 HARI INI</label>
                <input className="input-field" value={pinnedForm.today} onChange={e => setPinnedForm({ ...pinnedForm, today: e.target.value })} />
                <label className="form-label">📌 MINGGU INI</label>
                <input className="input-field" value={pinnedForm.week} onChange={e => setPinnedForm({ ...pinnedForm, week: e.target.value })} />
              </div>
            ) : (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pinned-item">
                  <span className="pinned-label">HARI INI:</span>
                  <span className="pinned-text">{store.pinnedActions?.today || 'Belum diisi'}</span>
                </div>
                <div className="pinned-item">
                  <span className="pinned-label">MINGGU INI:</span>
                  <span className="pinned-text">{store.pinnedActions?.week || 'Belum diisi'}</span>
                </div>
              </div>
            )}
          </div>

          {/* 11. Audit Produktivitas Harian & Checklist */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '12px' }}>✅ Checklist Tugas Utama (Sistem)</h3>
            <div className="checklist-container">
              {store.auditTasks.map(task => (
                <label key={task.id} className="checklist-item">
                  <input type="checkbox" checked={task.done} onChange={() => store.toggleAuditTask(task.id)} />
                  <span className={`checklist-label ${task.done ? 'done' : ''}`}>{task.text}</span>
                </label>
              ))}
            </div>

            {/* 13. Tugas Cepat (Quick Tasks) */}
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 className="card-subtitle">⚡ Tugas Cepat (Urgent & Penting)</h4>
              <div className="flex-row" style={{ margin: '8px 0' }}>
                <input className="input-field" style={{ marginBottom: 0 }} placeholder="Tambah tugas cepat..." value={quickInput} onChange={e => setQuickInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (store.addQuickTask(quickInput), setQuickInput(''))} />
                <button className="btn btn-primary" style={{ padding: '10px' }} onClick={() => { if (quickInput) { store.addQuickTask(quickInput); setQuickInput(''); } }}><Plus size={16}/></button>
              </div>
              <div className="checklist-container">
                {store.quickTasks.map(task => (
                  <div key={task.id} className="checklist-item" style={{ justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input type="checkbox" checked={task.done} onChange={() => store.toggleQuickTask(task.id)} />
                      <span className={`checklist-label ${task.done ? 'done' : ''}`}>{task.text}</span>
                    </label>
                    <button className="btn-icon" onClick={() => store.deleteQuickTask(task.id)}><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-col">
          {/* 7. Deep Work Timer & Protokol Trigger */}
          <div className="card">
            <h3 className="card-title">⏱️ Deep Work Session</h3>
            <DeepWorkTimer store={store} />
            <div className="trigger-note" style={{ marginTop: '16px', background: '#ef444408', border: '1px solid #ef44441a', padding: '12px', borderRadius: '8px' }}>
              <span className="trigger-title" style={{ color: 'var(--red)', fontWeight: 'bold', display: 'block', fontSize: '12px', marginBottom: '4px' }}>🚨 PROTOKOL BURN OUT / STRES:</span>
              <p style={{ fontSize: '11px', color: 'var(--muted2)', lineHeight: '1.5' }}>
                Jika merasa stress berlebih/tidak bisa produktif, batasi kerja YT/CapCut ke batas minimal (5 menit cek analitik), cari udara segar, dan hubungi bantuan profesional jika stress menetap &gt; 30 hari.
              </p>
            </div>
          </div>

          {/* 2. Notepad (Catatan Penting) */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '10px' }}>📝 Notepad (Catatan Penting)</h3>
            <textarea 
              className="input-field" 
              style={{ minHeight: '180px', fontFamily: 'inherit', fontSize: '12px', lineHeight: '1.6' }} 
              value={store.notepad} 
              onChange={e => store.setNotepad(e.target.value)}
              placeholder="Tulis catatan strategismu di sini..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Deep Work Timer Component
function DeepWorkTimer({ store }) {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [logInput, setLogInput] = useState('');

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      store.logDeepWork(60);
      alert('Sesi Deep Work 60 menit selesai! Log telah ditambahkan ke dashboard.');
      setTimeLeft(3600);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => { setIsRunning(false); setTimeLeft(3600); };
  
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleManualLog = () => {
    const mins = parseInt(logInput, 10);
    if (!isNaN(mins) && mins > 0) {
      store.logDeepWork(mins);
      setLogInput('');
      alert(`Manual Log: ${mins} menit ditambahkan!`);
    }
  };

  return (
    <div className="timer-box" style={{ textAlign: 'center', padding: '10px 0' }}>
      <div className="timer-display" style={{ fontFamily: 'monospace', fontSize: '48px', fontWeight: 'bold', letterSpacing: '2px', color: isRunning ? 'var(--koala)' : 'var(--text)' }}>
        {formatTime(timeLeft)}
      </div>
      <div className="flex-row" style={{ justifyContent: 'center', marginTop: '12px' }}>
        <button className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`} onClick={toggle}>
          {isRunning ? 'Pause' : 'Start Session'}
        </button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>

      <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <span style={{ fontSize: '11px', color: 'var(--muted2)' }}>Atau Log Manual Durasi Kerja (Menit):</span>
        <div className="flex-row" style={{ marginTop: '6px' }}>
          <input className="input-field" style={{ marginBottom: 0, padding: '6px 10px', fontSize: '12px' }} type="number" placeholder="Contoh: 45" value={logInput} onChange={e => setLogInput(e.target.value)} />
          <button className="btn btn-sm" onClick={handleManualLog}>Log Menit</button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   TAB: JADWAL & FASE HARIAN
   ========================================================================== */
function TabJadwal({ store }) {
  const [fase, setFase] = useState('fase1');
  const [minggu, setMinggu] = useState('minggu1');

  // Hardcoded Schedule Details based on requirements
  const getFramerSchedule = () => {
    if (fase === 'fase1') {
      if (minggu === 'minggu1') {
        return {
          Senin: 'Riset niche (real estate/home services) + kumpulkan 5-10 referensi desain top performer (ATM: Amati)',
          Selasa: 'Wireframe halaman home portofolio #1 — struktur section, copy placeholder',
          Rabu: 'Build halaman home di Framer — layout, komponen dasar',
          Kamis: 'Build halaman kedua (listing/services) + styling',
          Jumat: 'Build halaman ketiga (contact/about) + responsive check',
          Sabtu: 'Polish keseluruhan — animasi ringan, micro-interaction, copywriting final (masuk slot Sabtu 3 jam)',
          Minggu: 'Review portofolio #1, catat kekurangan. Evaluasi mingguan CapCut & YT'
        };
      } else {
        return {
          Senin: 'Build portofolio #2 (niche sama, use case berbeda, pakai komponen dari portofolio #1) - Hari 1',
          Selasa: 'Build portofolio #2 (niche sama, use case berbeda, pakai komponen dari portofolio #1) - Hari 2',
          Rabu: 'Build portofolio #2 (niche sama, use case berbeda, pakai komponen dari portofolio #1) - Hari 3',
          Kamis: 'Build portofolio #3 (variasi ketiga / sub-niche spesifik) - Hari 1',
          Jumat: 'Build portofolio #3 (variasi ketiga / sub-niche spesifik) - Hari 2',
          Sabtu: 'Siapkan materi outreach — screenshot showcase, 1 halaman case study per portofolio, 2-3 draft pesan outreach',
          Minggu: 'Review semua portofolio, pastikan siap outreach minggu depan. Evaluasi mingguan CapCut & YT'
        };
      }
    } else {
      return {
        Senin: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Negosiasi/proyek klien atau polish portofolio | 1 jam: Follow-up prospek',
        Selasa: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Negosiasi/proyek klien atau polish portofolio | 1 jam: Follow-up prospek',
        Rabu: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Negosiasi/proyek klien atau polish portofolio | 1 jam: Follow-up prospek',
        Kamis: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Negosiasi/proyek klien atau polish portofolio | 1 jam: Follow-up prospek',
        Jumat: '1-2 jam: Apply/outreach aktif (target 5-10 kontak di FB/subreddits/cold DM) | 2-3 jam: Negosiasi/proyek klien atau polish portofolio | 1 jam: Follow-up prospek',
        Sabtu: 'Framer 3 jam (polish/materi outreach — batch, bukan harian) + Kuliah + Keluarga',
        Minggu: 'Keluarga + Review Mingguan (Framer, CapCut, YT) + Istirahat'
      };
    }
  };

  const framerSchedule = getFramerSchedule();

  return (
    <div className="tab-section">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#8b5cf615' }}>📋</div>
        <div className="sec-title">Jadwal Harian & Fokus Strategis</div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="card-title">Pilih Fase Operasional</h3>
        <div className="flex-row mt-4" style={{ flexWrap: 'wrap' }}>
          <button className={`btn ${fase === 'fase1' ? 'btn-primary' : ''}`} onClick={() => setFase('fase1')}>FASE 1: Bangun Portofolio (Minggu 1-2)</button>
          <button className={`btn ${fase === 'fase2' ? 'btn-primary' : ''}`} onClick={() => setFase('fase2')}>FASE 2: Outreach Aktif (Minggu 3+)</button>
        </div>

        {fase === 'fase1' && (
          <div className="flex-row mt-4" style={{ paddingLeft: '12px', borderLeft: '2px solid var(--elang)' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted2)' }}>Fase 1 Minggu Ke:</span>
            <button className={`btn btn-sm ${minggu === 'minggu1' ? 'btn-primary' : ''}`} onClick={() => setMinggu('minggu1')}>Minggu 1 (Portofolio #1)</button>
            <button className={`btn btn-sm ${minggu === 'minggu2' ? 'btn-primary' : ''}`} onClick={() => setMinggu('minggu2')}>Minggu 2 (Portofolio #2 & #3)</button>
          </div>
        )}
      </div>

      {/* RPH blocks */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>⚡ Pembagian Kerja Harian (Weekday)</h3>
        <div className="ladder" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="ladder-item" style={{ gridTemplateColumns: '120px 1fr' }}>
            <div className="ladder-stage"><strong>YT (1 Jam)</strong></div>
            <div className="ladder-skill">Render & upload video sesuai jadwal batch — <strong>TIDAK</strong> buka analytics/dashboard hari ini.</div>
          </div>
          <div className="ladder-item" style={{ gridTemplateColumns: '120px 1fr' }}>
            <div className="ladder-stage"><strong>CapCut (1 Jam)</strong></div>
            <div className="ladder-skill">Buat 3-5 template Capcut, upload langsung — evaluasi performa hari Minggu saja.</div>
          </div>
          <div className="ladder-item current" style={{ gridTemplateColumns: '120px 1fr' }}>
            <div className="ladder-stage"><strong>Framer (4-6 Jam)</strong></div>
            <div className="ladder-skill">Pekerjaan utama membangun portofolio / melakukan outreach aktif (lihat jadwal harian di bawah).</div>
          </div>
        </div>
      </div>

      {/* Weekday Schedule Timeline */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>📅 Alur Harian Terjadwal (Framer Task)</h3>
        <div className="schedule-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(framerSchedule).map(([day, task]) => {
            const isWeekend = day === 'Sabtu' || day === 'Minggu';
            return (
              <div key={day} className="timeline-row" style={{ display: 'grid', gridTemplateColumns: '100px 1fr', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: isWeekend ? '#8b5cf604' : 'transparent' }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: isWeekend ? 'var(--elang)' : 'var(--koala)' }}>{day.toUpperCase()}</div>
                <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.5' }}>{task}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sabtu & Minggu notes */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '10px' }}>⚠️ Catatan Akhir Pekan</h3>
        <p style={{ fontSize: '12px', color: 'var(--muted2)', lineHeight: '1.6' }}>
          <strong>Sabtu:</strong> Sesi terpanjang tanpa gangguan. Gunakan 3 jam murni untuk memoles / meracik materi outreach Framer secara batch, bukan melakukan riset harian dari awal.
          <br /><br />
          <strong>Minggu:</strong> Hari keluarga murni + review mingguan 15 menit untuk mengukur performa Framer, CapCut, dan YT. Istirahatkan pikiran agar basal ganglia optimal di hari Senin.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   TAB: MATRIX & PRIORITAS
   ========================================================================== */
function TabMatrix({ store }) {
  const [q1Input, setQ1Input] = useState('');
  const [q2Input, setQ2Input] = useState('');
  const [q3Input, setQ3Input] = useState('');
  const [q4Input, setQ4Input] = useState('');

  const [intentForm, setIntentForm] = useState({ when: 'PAGI', trigger: '', response: '', note: '' });

  const handleAddCovey = (quadrant, text, setInput) => {
    if (text) {
      const items = store.coveyMatrix[quadrant] || [];
      store.updateCovey(quadrant, [...items, text]);
      setInput('');
    }
  };

  const handleDeleteCovey = (quadrant, index) => {
    const items = [...(store.coveyMatrix[quadrant] || [])];
    items.splice(index, 1);
    store.updateCovey(quadrant, items);
  };

  const handleAddIntention = () => {
    if (intentForm.trigger && intentForm.response) {
      store.addIntention(intentForm);
      setIntentForm({ when: 'PAGI', trigger: '', response: '', note: '' });
    }
  };

  return (
    <div className="tab-section">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#f59e0b15' }}>📈</div>
        <div className="sec-title">Prioritas Energi & Rencana Aksi</div>
      </div>

      {/* Covey Matrix */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>🧭 Covey Matrix (Prioritas Tindakan)</h3>
        <div className="covey-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          
          {/* Q1 */}
          <div className="covey-box" style={{ border: '1px solid var(--red)', background: '#ef444404', padding: '16px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--red)', fontWeight: 'bold', fontSize: '13px', fontFamily: 'monospace', marginBottom: '8px' }}>Q1 · LAKUKAN SEKARANG (PENTING + MENDESAK)</h4>
            <div className="flex-row" style={{ marginBottom: '8px' }}>
              <input className="input-field" style={{ marginBottom: 0, padding: '6px' }} placeholder="Tambah item..." value={q1Input} onChange={e => setQ1Input(e.target.value)} />
              <button className="btn btn-sm btn-primary" onClick={() => handleAddCovey('q1', q1Input, setQ1Input)}><Plus size={14}/></button>
            </div>
            <ul style={{ paddingLeft: '16px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {store.coveyMatrix.q1.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item}</span>
                  <button className="btn-icon" onClick={() => handleDeleteCovey('q1', index)}><Trash2 size={12}/></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Q2 */}
          <div className="covey-box" style={{ border: '1px solid var(--elang)', background: '#8b5cf604', padding: '16px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--elang)', fontWeight: 'bold', fontSize: '13px', fontFamily: 'monospace', marginBottom: '8px' }}>Q2 · JADWALKAN (PENTING + TIDAK MENDESAK)</h4>
            <div className="flex-row" style={{ marginBottom: '8px' }}>
              <input className="input-field" style={{ marginBottom: 0, padding: '6px' }} placeholder="Tambah item..." value={q2Input} onChange={e => setQ2Input(e.target.value)} />
              <button className="btn btn-sm btn-primary" onClick={() => handleAddCovey('q2', q2Input, setQ2Input)}><Plus size={14}/></button>
            </div>
            <ul style={{ paddingLeft: '16px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {store.coveyMatrix.q2.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item}</span>
                  <button className="btn-icon" onClick={() => handleDeleteCovey('q2', index)}><Trash2 size={12}/></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Q3 */}
          <div className="covey-box" style={{ border: '1px solid var(--gold)', background: '#f59e0b04', padding: '16px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '13px', fontFamily: 'monospace', marginBottom: '8px' }}>Q3 · BATASI (TIDAK PENTING + MENDESAK)</h4>
            <div className="flex-row" style={{ marginBottom: '8px' }}>
              <input className="input-field" style={{ marginBottom: 0, padding: '6px' }} placeholder="Tambah item..." value={q3Input} onChange={e => setQ3Input(e.target.value)} />
              <button className="btn btn-sm btn-primary" onClick={() => handleAddCovey('q3', q3Input, setQ3Input)}><Plus size={14}/></button>
            </div>
            <ul style={{ paddingLeft: '16px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {store.coveyMatrix.q3.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item}</span>
                  <button className="btn-icon" onClick={() => handleDeleteCovey('q3', index)}><Trash2 size={12}/></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Q4 */}
          <div className="covey-box" style={{ border: '1px solid var(--muted)', background: '#ffffff02', padding: '16px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--muted2)', fontWeight: 'bold', fontSize: '13px', fontFamily: 'monospace', marginBottom: '8px' }}>Q4 · ELIMINASI (TIDAK PENTING + TIDAK MENDESAK)</h4>
            <div className="flex-row" style={{ marginBottom: '8px' }}>
              <input className="input-field" style={{ marginBottom: 0, padding: '6px' }} placeholder="Tambah item..." value={q4Input} onChange={e => setQ4Input(e.target.value)} />
              <button className="btn btn-sm btn-primary" onClick={() => handleAddCovey('q4', q4Input, setQ4Input)}><Plus size={14}/></button>
            </div>
            <ul style={{ paddingLeft: '16px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {store.coveyMatrix.q4.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item}</span>
                  <button className="btn-icon" onClick={() => handleDeleteCovey('q4', index)}><Trash2 size={12}/></button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 9. Implementation Intentions Harian */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '12px' }}>⚡ Protokol Trigger & Aksi Harian (Intentions)</h3>
        
        <div className="flex-row" style={{ background: 'var(--s2)', padding: '16px', borderRadius: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <select className="input-field" style={{ width: '120px', marginBottom: 0 }} value={intentForm.when} onChange={e => setIntentForm({...intentForm, when: e.target.value})}>
            <option>PAGI</option><option>SIANG</option><option>SORE</option><option>MALAM</option><option>BURNOUT</option>
          </select>
          <input className="input-field" style={{ flex: '1', minWidth: '150px', marginBottom: 0 }} placeholder="Jika [TRIGGER]..." value={intentForm.trigger} onChange={e => setIntentForm({...intentForm, trigger: e.target.value})} />
          <input className="input-field" style={{ flex: '1', minWidth: '150px', marginBottom: 0 }} placeholder="Maka [AKSI]..." value={intentForm.response} onChange={e => setIntentForm({...intentForm, response: e.target.value})} />
          <button className="btn btn-primary" onClick={handleAddIntention}><Plus size={16} /> Tambah</button>
        </div>

        <div className="ii-builder">
          {store.intentions.map(item => (
            <div className="ii-row" key={item.id}>
              <div className="ii-when">{item.when}</div>
              <div className="ii-action">
                Jika <span className="trigger">{item.trigger}</span>, maka aku akan <span className="response">{item.response}</span>
                {item.note && <div className="ii-note">{item.note}</div>}
              </div>
              <button className="btn btn-danger" style={{ padding: '6px' }} onClick={() => store.deleteIntention(item.id)}><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Landasan Riset yang Valid */}
      <ResearchBase />
    </div>
  );
}

/* ==========================================================================
   TAB: TRACKER & HABIT
   ========================================================================== */
function TabTracker({ store }) {
  const [habitName, setHabitName] = useState('');
  const [blockInput, setBlockInput] = useState('');
  const [rewardInput, setRewardInput] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];
  const today = new Date();

  const getStats = (history) => {
    let weekly = 0, monthly = 0, yearly = 0;
    history.forEach(dStr => {
      const d = new Date(dStr);
      if (d.getFullYear() === today.getFullYear()) yearly++;
      if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()) monthly++;
      const diffTime = Math.abs(today - d);
      if (diffTime <= 7 * 24 * 60 * 60 * 1000) weekly++;
    });
    return { weekly, monthly, yearly };
  };

  return (
    <div className="tab-section">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#10b98115' }}>📊</div>
        <div className="sec-title">Pelacakan Progres & Kebiasaan Buruk</div>
      </div>

      {/* 18. Progress Tracker */}
      <div className="card">
        <h3 className="card-title">📈 Tracker Kebiasaan Utama</h3>
        <div className="flex-row" style={{ margin: '12px 0' }}>
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="Nama target habit baru (contoh: Klien Closing)..." value={habitName} onChange={e => setHabitName(e.target.value)} />
          <button className="btn btn-primary" onClick={() => { if (habitName) { store.addTracker(habitName); setHabitName(''); } }}><Plus size={16}/> Tambah</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {store.trackers.map(tracker => {
            const stats = getStats(tracker.history);
            const isDoneToday = tracker.history.includes(todayStr);

            return (
              <div className="card" key={tracker.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', padding: '16px 20px', marginBottom: '0', background: 'var(--s2)' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{tracker.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Total: {tracker.history.length} kali pencapaian</div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', background: 'var(--s1)', padding: '6px 12px', borderRadius: '8px' }}>
                    Mingguan<br/><strong style={{color:'var(--text)', fontSize: '14px'}}>{stats.weekly}</strong>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', background: 'var(--s1)', padding: '6px 12px', borderRadius: '8px' }}>
                    Bulanan<br/><strong style={{color:'var(--text)', fontSize: '14px'}}>{stats.monthly}</strong>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', background: 'var(--s1)', padding: '6px 12px', borderRadius: '8px' }}>
                    Tahunan<br/><strong style={{color:'var(--text)', fontSize: '14px'}}>{stats.yearly}</strong>
                  </div>
                  
                  <button 
                    onClick={() => store.toggleTracker(tracker.id, todayStr)}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', border: '1px solid', cursor: 'pointer', fontWeight: 600, fontSize: '13px', marginLeft: 'auto',
                      background: isDoneToday ? '#10b98120' : 'var(--s1)',
                      color: isDoneToday ? 'var(--green)' : 'var(--text)',
                      borderColor: isDoneToday ? 'var(--green)' : 'var(--border)'
                    }}
                  >
                    {isDoneToday ? '✓ Selesai Hari Ini' : 'Tandai Selesai'}
                  </button>
                  <button className="btn btn-danger" style={{ padding: '8px' }} onClick={() => store.deleteTracker(tracker.id)}>
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 12. Mistake & Bad Habit Tracker */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '12px' }}>⚠️ Mistake & Bad Habit Tracker</h3>
        <span style={{ fontSize: '11px', color: 'var(--muted2)' }}>Pilih jenis kesalahan harian untuk dicatat & dipantau:</span>
        
        <div className="flex-row" style={{ flexWrap: 'wrap', gap: '8px', margin: '8px 0 16px 0' }}>
          <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Skip outreach harian')}>🔴 Skip outreach harian</button>
          <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Skip render/upload CapCut atau YT')}>🔴 Skip render/upload CapCut atau YT</button>
          <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Buka analytics YT/CapCut di luar hari Minggu')}>🔴 Buka analytics di luar hari Minggu</button>
          <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Ganti niche/strategi sebelum 1 siklus penuh selesai')}>🔴 Ganti niche sebelum selesai siklus</button>
        </div>

        <div className="checklist-container">
          {store.mistakes.map(item => (
            <div key={item.id} className="checklist-item" style={{ justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px' }}><strong style={{ color: 'var(--red)', fontFamily: 'monospace' }}>[{item.date}]</strong> {item.text}</span>
              <button className="btn-icon" onClick={() => store.deleteMistake(item.id)}><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* 14. Distraction Blocklist */}
      <div className="card">
        <h3 className="card-title">🛡️ Distraction Blocklist</h3>
        <p style={{ fontSize: '11px', color: 'var(--muted2)', margin: '4px 0 12px 0', lineHeight: '1.4' }}>
          <em>Note: Jika outreach dilakukan lewat Facebook Groups, pastikan akses FB tetap perlu dibuka untuk kerja — jangan blokir total di jam kerja Framer, cukup blokir di luar jam itu.</em>
        </p>
        <div className="flex-row">
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="Tambah situs diblokir (contoh: facebook.com)..." value={blockInput} onChange={e => setBlockInput(e.target.value)} />
          <button className="btn btn-primary" onClick={() => { if (blockInput) { store.addBlocklistItem(blockInput); setBlockInput(''); } }}><Plus size={16} /> Tambah</button>
        </div>
        <div className="flex-row mt-4" style={{ flexWrap: 'wrap', gap: '8px' }}>
          {store.blocklist.map(item => (
            <span key={item} className="chip" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderColor: 'var(--red)', color: 'var(--red)', background: '#ef444408' }}>
              <span>{item}</span>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--red)', cursor: 'pointer', padding: 0 }} onClick={() => store.deleteBlocklistItem(item)}>×</button>
            </span>
          ))}
        </div>
      </div>

      {/* 16. Daily Rewards — Self-Motivation */}
      <div className="card">
        <h3 className="card-title">🎁 Daily Rewards (Self-Motivation)</h3>
        <p style={{ fontSize: '11px', color: 'var(--muted2)', margin: '4px 0 12px 0' }}>Buka hadiah ini hanya jika seluruh checklist harian selesai 100%.</p>
        <div className="flex-row">
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="Tambah reward..." value={rewardInput} onChange={e => setRewardInput(e.target.value)} />
          <button className="btn btn-primary" onClick={() => { if (rewardInput) { store.addReward(rewardInput); setRewardInput(''); } }}><Plus size={16} /> Tambah</button>
        </div>
        <ul className="db-tasks mt-4">
          {store.rewards.map(item => (
            <li key={item} style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
              <span>{item}</span>
              <button className="btn-icon" onClick={() => store.deleteReward(item)}><Trash2 size={12} /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ==========================================================================
   TAB: REVIEW & PROYEKSI
   ========================================================================== */
function TabReview({ store }) {
  const [stageName, setStageName] = useState('');
  const [stageNum, setStageNum] = useState('');
  const [stageSkill, setStageSkill] = useState('');
  const [stageIncome, setStageIncome] = useState('');

  const [revForm, setRevForm] = useState({ q1: '', q2: '', q3: '' });
  const [refOld, setRefOld] = useState('');
  const [refNew, setRefNew] = useState('');

  const handleAddReview = () => {
    if (revForm.q1 || revForm.q2 || revForm.q3) {
      store.addWeeklyReview(revForm);
      setRevForm({ q1: '', q2: '', q3: '' });
    }
  };

  const handleAddReframe = () => {
    if (refOld && refNew) {
      store.addReframe({ old: refOld, new: refNew });
      setRefOld('');
      setRefNew('');
    }
  };

  const handleAddStage = () => {
    if (stageName && stageNum) {
      store.addLadderStage({ stageNum, stageName, skill: stageSkill, income: stageIncome });
      setStageName('');
      setStageNum('');
      setStageSkill('');
      setStageIncome('');
    }
  };

  // Get total Deep Work Logged
  const totalMinutes = store.deepWorkLogs.reduce((acc, curr) => acc + curr.minutes, 0);

  return (
    <div className="tab-section">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#8b5cf615' }}>📋</div>
        <div className="sec-title">Review Mingguan & Proyeksi Finansial</div>
      </div>

      {/* 10. Proyeksi Income — Tangga Income */}
      <div className="card">
        <h3 className="card-title">📈 Tangga Income — Proyeksi Realistis</h3>
        <p style={{ fontSize: '11px', color: 'var(--muted2)', marginBottom: '16px' }}>Klik tangga untuk mengatur tahapan/posisi tokomu saat ini.</p>
        
        {/* Form add stage */}
        <div className="form-group" style={{ background: 'var(--s2)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Tambah Tahapan Baru</span>
          <div className="flex-row" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <input className="input-field" style={{ width: '120px', marginBottom: 0 }} placeholder="Tahap (Bulan 1)" value={stageNum} onChange={e => setStageNum(e.target.value)} />
            <input className="input-field" style={{ flex: '1', minWidth: '150px', marginBottom: 0 }} placeholder="Nama Target" value={stageName} onChange={e => setStageName(e.target.value)} />
            <input className="input-field" style={{ flex: '2', minWidth: '200px', marginBottom: 0 }} placeholder="Keterangan / Strategi" value={stageSkill} onChange={e => setStageSkill(e.target.value)} />
            <input className="input-field" style={{ width: '120px', marginBottom: 0 }} placeholder="Income/Klien" value={stageIncome} onChange={e => setStageIncome(e.target.value)} />
            <button className="btn btn-primary" onClick={handleAddStage}><Plus size={16}/></button>
          </div>
        </div>

        <div className="ladder">
          {store.ladder.map(item => (
            <div 
              key={item.id} 
              className={`ladder-item ${store.currentLadderStage === item.id ? 'current' : ''}`}
              onClick={() => store.setCurrentLadderStage(item.id)}
              style={{ cursor: 'pointer', background: 'var(--s2)', marginBottom: '8px', border: '1px solid var(--border)' }}
            >
              <div className="ladder-stage">
                <strong>{item.stageNum}</strong>
                {item.stageName}
              </div>
              <div className="ladder-skill">{item.skill}</div>
              <div className="ladder-income" style={{ color: 'var(--gold)' }}>{item.income}</div>
              {store.currentLadderStage === item.id && (
                <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 8, letterSpacing: 2, color: 'var(--green)', fontFamily: 'monospace' }}>
                  POSISI SEKARANG
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 19. Review Mingguan */}
      <div className="card">
        <h3 className="card-title">📝 Buat Review Mingguan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
          <div className="form-group">
            <label className="form-label">01. Pencapaian: Apa yang sudah aku selesaikan minggu ini?</label>
            <textarea className="input-field" rows={2} placeholder="Tulis capaian konkret..." value={revForm.q1} onChange={e => setRevForm({ ...revForm, q1: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">02. Hambatan: Apa satu hal yang menghambat terbesar?</label>
            <textarea className="input-field" rows={2} placeholder="Cukup sebutkan satu hambatan..." value={revForm.q2} onChange={e => setRevForm({ ...revForm, q2: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">03. Aksi Selanjutnya: Satu aksi konkret / penyesuaian minggu depan?</label>
            <textarea className="input-field" rows={2} placeholder="Jika X maka Y..." value={revForm.q3} onChange={e => setRevForm({ ...revForm, q3: e.target.value })} />
          </div>
          <button className="btn btn-primary" onClick={handleAddReview}>Simpan Review Mingguan</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {store.weeklyReviews.map(review => (
            <div className="card" key={review.id} style={{ position: 'relative', background: 'var(--s2)', border: '1px solid var(--border)' }}>
              <button className="btn btn-danger" style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px' }} onClick={() => store.deleteWeeklyReview(review.id)}>
                <Trash2 size={14}/>
              </button>
              <div className="review-grid" style={{ marginTop: '20px' }}>
                <div>
                  <div className="rv-num">01</div>
                  <div className="rv-q">Penyelesaian</div>
                  <div className="rv-hint">{review.q1}</div>
                </div>
                <div>
                  <div className="rv-num">02</div>
                  <div className="rv-q">Hambatan</div>
                  <div className="rv-hint">{review.q2}</div>
                </div>
                <div>
                  <div className="rv-num">03</div>
                  <div className="rv-q">Aksi Konkret</div>
                  <div className="rv-hint">{review.q3}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 20. Reframe Pikiran */}
      <div className="card">
        <h3 className="card-title">🔁 Reframe Pikiran (Kognitif)</h3>
        <div className="form-group mt-4" style={{ background: 'var(--s2)', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Tambah Reframe Mindset</span>
          <div className="flex-row">
            <input className="input-field" style={{ marginBottom: 0 }} placeholder="Mindset lama..." value={refOld} onChange={e => setRefOld(e.target.value)} />
            <div style={{ color: 'var(--muted2)' }}>→</div>
            <input className="input-field" style={{ marginBottom: 0 }} placeholder="Mindset baru..." value={refNew} onChange={e => setRefNew(e.target.value)} />
            <button className="btn btn-primary" onClick={handleAddReframe}>Simpan</button>
          </div>
        </div>

        <div className="reframe-grid mt-4">
          {store.reframes.map(item => (
            <div className="rf-row" key={item.id}>
              <div className="rf-old">{item.old}</div>
              <div className="rf-arrow">→</div>
              <div className="rf-new">{item.new}</div>
              <button className="btn btn-danger" style={{ padding: '6px' }} onClick={() => store.deleteReframe(item.id)}><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* 17. Arsip & History Pencapaian */}
      <div className="card">
        <h3 className="card-title">📊 Arsip & History Pencapaian</h3>
        <div className="flex-row mt-4" style={{ gap: '20px' }}>
          <div style={{ flex: 1, padding: '20px', background: 'var(--s2)', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Waktu Deep Work</span>
            <h4 style={{ fontSize: '28px', color: 'var(--elang)', marginTop: '8px' }}>{(totalMinutes / 60).toFixed(1)} Jam</h4>
          </div>
          <div style={{ flex: 1, padding: '20px', background: 'var(--s2)', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Review Mingguan</span>
            <h4 style={{ fontSize: '28px', color: 'var(--koala)', marginTop: '8px' }}>{store.weeklyReviews.length} Laporan</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

// ResearchBase Component (8)
function ResearchBase() {
  return (
    <div className="card" style={{ marginTop: '24px' }}>
      <h3 className="card-title" style={{ marginBottom: '16px' }}>🔬 Landasan Riset yang Valid (Peer-reviewed)</h3>
      <div className="research-grid" style={{ gap: '12px' }}>
        <div className="r-card c1" style={{ padding: '16px' }}>
          <div className="r-label" style={{ fontSize: '8px' }}>Gollwitzer, 1999 · Psych Review</div>
          <div className="r-title" style={{ fontSize: '13px' }}>Implementation Intentions</div>
          <div className="r-body" style={{ fontSize: '11px' }}>Format "Jika X → maka Y" meningkatkan follow-through 2–3x dibanding goal biasa. Bekerja di level non-conscious habit loop.</div>
        </div>
        <div className="r-card c2" style={{ padding: '16px' }}>
          <div className="r-label" style={{ fontSize: '8px' }}>Locke & Latham, 2002</div>
          <div className="r-title" style={{ fontSize: '13px' }}>Goal-Setting Theory</div>
          <div className="r-body" style={{ fontSize: '11px' }}>Goal yang spesifik + menantang + ada feedback menghasilkan performa 16–25% lebih tinggi secara konsisten.</div>
        </div>
        <div className="r-card c3" style={{ padding: '16px' }}>
          <div className="r-label" style={{ fontSize: '8px' }}>Beaty et al., 2016 · PNAS</div>
          <div className="r-title" style={{ fontSize: '13px' }}>DMN & Kreativitas</div>
          <div className="r-body" style={{ fontSize: '11px' }}>Otak memproses solusi kreatif saat tidak aktif, TAPI hanya jika masalah sudah di-load dulu via kerja keras sadar.</div>
        </div>
        <div className="r-card c4" style={{ padding: '16px' }}>
          <div className="r-label" style={{ fontSize: '8px' }}>Graybiel, 2008 · Neurosci</div>
          <div className="r-title" style={{ fontSize: '13px' }}>Habit Loop & Basal Ganglia</div>
          <div className="r-body" style={{ fontSize: '11px' }}>Rutinitas yang diulang 60–90 hari menjadi otomatis di basal ganglia — membebaskan otak sadar untuk kerja kreatif.</div>
        </div>
      </div>
    </div>
  );
}
