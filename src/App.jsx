import React, { useState, useEffect } from 'react';
import { useStore } from './store';

// Inline Icons
const Plus = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
);
const Trash2 = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
);
const Edit2 = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);

export default function App() {
  const store = useStore();
  const [activeView, setActiveView] = useState('workspace');
  const [currentUser, setCurrentUser] = useState('ngawurrpp0001@gmail.com');

  const [newBlock, setNewBlock] = useState({ char: '🌅', time: '', name: '', tasks: '' });
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [quickInput, setQuickInput] = useState('');
  const [matrixForm, setMatrixForm] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [customMistake, setCustomMistake] = useState('');
  const [blockInput, setBlockInput] = useState('');
  const [habitName, setHabitName] = useState('');
  const [rewardInput, setRewardInput] = useState('');
  const [revForm, setRevForm] = useState({ q1: '', q2: '', q3: '' });
  const [refOld, setRefOld] = useState('');
  const [refNew, setRefNew] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [editingDay, setEditingDay] = useState(null);
  const [editingText, setEditingText] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleResetDefaults = () => {
    if (window.confirm('Apakah Anda yakin ingin memuat ulang semua data ke setelan default? Tindakan ini akan menimpa data Anda saat ini.')) {
      store.resetAllDefaults();
      alert('Setelan default berhasil dimuat!');
    }
  };

  const handleAddDailyBlock = () => {
    if (newBlock.name) {
      store.addDailyBlock({ ...newBlock, tasks: newBlock.tasks.split('\n').filter(Boolean) });
      setNewBlock({ char: '🌅', time: '', name: '', tasks: '' });
      setShowAddBlock(false);
    }
  };

  const handleSaveRoadmapTask = (day) => {
    store.updateRoadmapTask(selectedMonth, selectedWeek, day, editingText);
    setEditingDay(null);
    setEditingText('');
  };

  const handleStartEditRoadmap = (day, currentText) => {
    setEditingDay(day);
    setEditingText(currentText);
  };

  const coveyMatrix = store.coveyMatrix || { q1: [], q2: [], q3: [], q4: [] };

  return (
    <div className="app-container">
      {/* Top Header Controls */}
      <div className="header-meta">
        <span className="user-email">👤 {currentUser}</span>
        <div className="header-buttons">
          <button className="btn-meta" onClick={handleResetDefaults}>🔄 Masukkan Default</button>
          <button className="btn-meta" onClick={() => setCurrentUser(currentUser ? '' : 'ngawurrpp0001@gmail.com')}>
            {currentUser ? '🚪 Keluar' : '🔑 Masuk'}
          </button>
        </div>
      </div>

      {/* 1. Header */}
      <header className="main-header">
        <span className="eyebrow">SISTEM HARIAN PERSONAL — DIKALIBRASI UNTUK KONDISINU</span>
        <h1 className="title-glow">Dari UMR<br />ke <span className="highlight">Top 1% Nasional</span></h1>
        
        <div className="category-row">
          <span className="chip active">💼 KERJA + SURVEY</span>
          <span className="chip">📚 KULIAH ONLINE</span>
          <span className="chip">🎵 YOUTUBE MUSIC</span>
          <span className="chip">👨‍👩‍👧 KELUARGA + ANAK</span>
          <span className="chip highlight-chip-framer">🎨 Framer Template</span>
          <span className="chip highlight-chip-capcut">✂️ CapCut</span>
        </div>

        <p className="subtitle-desc">
          Kamu punya 4-6 jam/hari untuk Framer, ditambah 1 jam CapCut dan 1 jam YT (maintenance) — total ini fokus utama penghasilan tambahan.
        </p>
      </header>

      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button className={`tab-btn orange ${activeView === 'workspace' ? 'active' : ''}`} onClick={() => setActiveView('workspace')}>
          📁 Workspace Utama
        </button>
        <button className={`tab-btn gray ${activeView === 'analytics' ? 'active' : ''}`} onClick={() => setActiveView('analytics')}>
          📊 Dashboard Analitik
        </button>
      </div>

      {activeView === 'workspace' ? (
        <div className="workspace-layout">
          {/* LEFT COLUMN */}
          <div className="layout-col main-panel">
            
            {/* Notepad */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">📄</span>
                <h3 className="card-title">Notepad (Catatan Penting)</h3>
              </div>
              <textarea 
                className="notepad-textarea" 
                value={store.notepad || ''} 
                onChange={e => store.setNotepad(e.target.value)}
                placeholder="Tulis catatan penting Anda di sini..."
              />
            </div>

            {/* Pinned Actions */}
            <div className="pinned-grid">
              <div className="pinned-card">
                <div className="pinned-header">📌 HARI INI</div>
                <textarea 
                  className="pinned-input" 
                  value={store.pinnedActions?.today || ''} 
                  onChange={e => store.setPinnedActions({ ...store.pinnedActions, today: e.target.value })}
                  placeholder="Fokus hari ini..."
                />
              </div>
              <div className="pinned-card">
                <div className="pinned-header">📌 MINGGU INI</div>
                <textarea 
                  className="pinned-input" 
                  value={store.pinnedActions?.week || ''} 
                  onChange={e => store.setPinnedActions({ ...store.pinnedActions, week: e.target.value })}
                  placeholder="Fokus minggu ini..."
                />
              </div>
            </div>

            {/* Jadwal Harian / RPH */}
            <div className="card">
              <div className="card-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="card-icon">📅</span>
                  <h3 className="card-title">Jadwal Harian — Rencana Pekan Harian (RPH)</h3>
                </div>
                <button className="btn btn-sm" onClick={() => setShowAddBlock(!showAddBlock)}>
                  <Plus size={14} /> {showAddBlock ? 'Batal' : 'Tambah Blok'}
                </button>
              </div>

              {showAddBlock && (
                <div className="form-box">
                  <div className="flex-row">
                    <input className="input-field" style={{ width: '60px' }} placeholder="Ikon" value={newBlock.char} onChange={e => setNewBlock({ ...newBlock, char: e.target.value })} />
                    <input className="input-field" placeholder="Waktu (e.g. 05:00 - 06:00)" value={newBlock.time} onChange={e => setNewBlock({ ...newBlock, time: e.target.value })} />
                    <input className="input-field" placeholder="Nama Blok" value={newBlock.name} onChange={e => setNewBlock({ ...newBlock, name: e.target.value })} />
                  </div>
                  <textarea className="input-field" rows={2} placeholder="Tugas (satu per baris)" value={newBlock.tasks} onChange={e => setNewBlock({ ...newBlock, tasks: e.target.value })} />
                  <button className="btn btn-primary" onClick={handleAddDailyBlock}>Simpan Blok Jadwal</button>
                </div>
              )}

              <div className="daily-blocks-list">
                {(store.dailyBlocks || []).map(block => (
                  <div className="daily-block-card" key={block.id}>
                    <div className="block-meta">
                      <span className="block-icon">{block.char}</span>
                      <div>
                        <h4 className="block-title">{block.name}</h4>
                        <span className="block-time">{block.time}</span>
                      </div>
                    </div>
                    <div className="block-tasks">
                      <ul>
                        {(block.tasks || []).map((t, idx) => <li key={idx}>• {t}</li>)}
                      </ul>
                    </div>
                    <button className="btn-delete-block" onClick={() => store.deleteDailyBlock(block.id)}><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>

              {/* RPH Roadmap */}
              <div className="roadmap-framer-section">
                <div className="roadmap-controls">
                  <div className="roadmap-select-group">
                    <label>Fase / Bulan:</label>
                    <select value={selectedMonth} onChange={e => { setSelectedMonth(parseInt(e.target.value)); setSelectedWeek(1); }}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                        <option key={m} value={m}>Bulan {m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="roadmap-select-group">
                    <label>Minggu:</label>
                    <select value={selectedWeek} onChange={e => setSelectedWeek(parseInt(e.target.value))}>
                      {[1, 2, 3, 4].map(w => (
                        <option key={w} value={w}>Minggu {w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="roadmap-days-list">
                  <span className="roadmap-subtitle">📅 Alokasi Tugas Blok Framer (Bulan {selectedMonth} Minggu {selectedWeek}):</span>
                  {Object.entries((store.framerRoadmap || {})[selectedMonth]?.[selectedWeek] || {}).map(([day, task]) => (
                    <div key={day} className="roadmap-day-row">
                      <span className="day-name">{day}</span>
                      <div className="day-task-content">
                        {editingDay === day ? (
                          <div className="flex-row w-full">
                            <input className="input-field" style={{ marginBottom: 0 }} value={editingText} onChange={e => setEditingText(e.target.value)} />
                            <button className="btn btn-sm btn-primary" onClick={() => handleSaveRoadmapTask(day)}>Simpan</button>
                            <button className="btn btn-sm" onClick={() => setEditingDay(null)}>Batal</button>
                          </div>
                        ) : (
                          <>
                            <span className="day-task-text">{task || 'Istirahat / Tidak ada alokasi'}</span>
                            <button className="btn-icon-edit" onClick={() => handleStartEditRoadmap(day, task)}><Edit2 size={12} /></button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sabtu & Minggu */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">🗓️</span>
                <h3 className="card-title">Sabtu & Minggu — Berbeda Dari Weekday</h3>
              </div>
              
              <div className="weekend-grid">
                <div className="weekend-col">
                  <div className="day-header">Senin-Jumat</div>
                  <div className="day-body-chips">
                    <span className="week-chip orange">Framer (fase)</span>
                    <span className="week-chip">Kerja Utama</span>
                    <span className="week-chip">Kuliah</span>
                  </div>
                </div>
                <div className="weekend-col">
                  <div className="day-header">Sabtu</div>
                  <div className="day-body-chips">
                    <span className="week-chip orange">Framer 3 Jam</span>
                    <span className="week-chip">Kuliah</span>
                    <span className="week-chip">Keluarga</span>
                  </div>
                </div>
                <div className="weekend-col">
                  <div className="day-header">Minggu</div>
                  <div className="day-body-chips">
                    <span className="week-chip green">Keluarga</span>
                    <span className="week-chip">Review OS</span>
                    <span className="week-chip">Istirahat</span>
                  </div>
                </div>
              </div>

              <div className="weekend-notes">
                <p><strong>Sabtu:</strong> Sesi Framer terpanjang tanpa gangguan (3 jam) untuk polish/materi outreach — lakukan secara batch, bukan harian.</p>
                <p><strong>Minggu:</strong> Hari keluarga murni + review mingguan 15 menit. Tidak ada produksi. Koala butuh hari reset penuh.</p>
              </div>
            </div>

            {/* Covey Matrix */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">🎯</span>
                <h3 className="card-title">Prioritas Energi — Covey Matrix</h3>
              </div>
              <div className="covey-matrix-grid">
                {[
                  { key: 'q1', label: 'Q1 · Lakukan Sekarang (Penting + Mendesak)', cls: 'q1' },
                  { key: 'q2', label: 'Q2 · Jadwalkan (Penting + Tidak Mendesak)', cls: 'q2' },
                  { key: 'q3', label: 'Q3 · Batasi (Tidak Penting + Mendesak)', cls: 'q3' },
                  { key: 'q4', label: 'Q4 · Eliminasi (Tidak Penting + Tidak Mendesak)', cls: 'q4' },
                ].map(({ key, label, cls }) => (
                  <div key={key} className={`covey-quadrant ${cls}`}>
                    <span className="q-label">{label}</span>
                    <div className="flex-row">
                      <input className="input-field" style={{ marginBottom: 0, padding: '4px 8px' }} placeholder="Tambah item..."
                        value={matrixForm[key]}
                        onChange={e => setMatrixForm({ ...matrixForm, [key]: e.target.value })}
                        onKeyDown={e => { if (e.key === 'Enter' && matrixForm[key]) { store.updateCovey(key, [...(coveyMatrix[key] || []), matrixForm[key]]); setMatrixForm({ ...matrixForm, [key]: '' }); }}}
                      />
                      <button className="btn btn-sm btn-primary" onClick={() => { if (matrixForm[key]) { store.updateCovey(key, [...(coveyMatrix[key] || []), matrixForm[key]]); setMatrixForm({ ...matrixForm, [key]: '' }); }}}><Plus size={14}/></button>
                    </div>
                    <ul>
                      {(coveyMatrix[key] || []).map((item, i) => (
                        <li key={i}>
                          <span>{item}</span>
                          <button className="btn-icon" onClick={() => { const upd = [...(coveyMatrix[key] || [])]; upd.splice(i, 1); store.updateCovey(key, upd); }}><Trash2 size={12}/></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Burnout Warning */}
            <div className="card bg-stress">
              <h4 className="stress-title">🚨 Protokol Burn Out / Stres</h4>
              <p className="stress-desc">
                Jika merasa stress berlebih/tidak bisa produktif, batasi kerja YT/CapCut ke batas minimal (5 menit cek analitik), cari udara segar, dan hubungi bantuan profesional jika stress menetap &gt; 30 hari.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="layout-col side-panel">
            
            {/* Deep Work Console */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">⚡</span>
                <h3 className="card-title">Analisis Fokus & Deep Work</h3>
              </div>
              <DeepWorkConsole store={store} />
            </div>

            {/* Checklist Harian */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">✅</span>
                <h3 className="card-title">Tugas Utama (Checklist Harian)</h3>
              </div>
              <div className="checklist-group">
                {(store.auditTasks || []).map(task => (
                  <label key={task.id} className="habit-check-row">
                    <input type="checkbox" checked={task.done} onChange={() => store.toggleAuditTask(task.id)} />
                    <span className={task.done ? 'checked-text' : ''}>{task.text}</span>
                  </label>
                ))}
              </div>
              
              <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span className="card-subtitle">⚡ Tugas Cepat (Quick Tasks)</span>
                <div className="flex-row" style={{ marginTop: '8px', marginBottom: '8px' }}>
                  <input className="input-field" style={{ marginBottom: 0 }} placeholder="Tambah tugas cepat..." value={quickInput} onChange={e => setQuickInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && quickInput && (store.addQuickTask(quickInput), setQuickInput(''))} />
                  <button className="btn btn-primary" onClick={() => { if (quickInput) { store.addQuickTask(quickInput); setQuickInput(''); } }}><Plus size={16}/></button>
                </div>
                <div className="checklist-group">
                  {(store.quickTasks || []).map(t => (
                    <div key={t.id} className="quick-task-row">
                      <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="checkbox" checked={t.done} onChange={() => store.toggleQuickTask(t.id)} />
                        <span className={t.done ? 'checked-text' : ''}>{t.text}</span>
                      </label>
                      <button className="btn-icon" onClick={() => store.deleteQuickTask(t.id)}><Trash2 size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Rewards */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">🎁</span>
                <h3 className="card-title">Daily Rewards</h3>
              </div>
              <p className="card-desc">Buka hadiah ini hanya jika seluruh checklist harian selesai 100%.</p>
              <div className="flex-row">
                <input className="input-field" style={{ marginBottom: 0 }} placeholder="Tambah reward..." value={rewardInput} onChange={e => setRewardInput(e.target.value)} />
                <button className="btn btn-primary" onClick={() => { if (rewardInput) { store.addReward(rewardInput); setRewardInput(''); } }}><Plus size={16}/></button>
              </div>
              <ul className="reward-list">
                {(store.rewards || []).map(item => (
                  <li key={item}>
                    <span>🎁 {item}</span>
                    <button className="btn-icon" onClick={() => store.deleteReward(item)}><Trash2 size={12}/></button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress Tracker */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">📈</span>
                <h3 className="card-title">Progress Tracker</h3>
              </div>
              <div className="flex-row" style={{ marginBottom: '12px' }}>
                <input className="input-field" style={{ marginBottom: 0 }} placeholder="Habit baru..." value={habitName} onChange={e => setHabitName(e.target.value)} onKeyDown={e => e.key === 'Enter' && habitName && (store.addTracker(habitName), setHabitName(''))} />
                <button className="btn btn-primary" onClick={() => { if (habitName) { store.addTracker(habitName); setHabitName(''); } }}><Plus size={16}/></button>
              </div>
              <div className="trackers-list">
                {(store.trackers || []).map(tracker => {
                  const getStats = (history) => {
                    let weekly = 0, monthly = 0, yearly = 0;
                    const today = new Date();
                    (history || []).forEach(dStr => {
                      const d = new Date(dStr);
                      if (d.getFullYear() === today.getFullYear()) yearly++;
                      if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()) monthly++;
                      if (Math.abs(today - d) <= 7 * 24 * 60 * 60 * 1000) weekly++;
                    });
                    return { weekly, monthly, yearly };
                  };
                  const stats = getStats(tracker.history);
                  const isDoneToday = (tracker.history || []).includes(todayStr);
                  return (
                    <div className="tracker-row-card" key={tracker.id}>
                      <div className="tracker-info">
                        <strong>{tracker.name}</strong>
                        <span>Total: {(tracker.history || []).length} kali</span>
                      </div>
                      <div className="tracker-mini-stats">
                        <span>W: {stats.weekly}</span>
                        <span>M: {stats.monthly}</span>
                        <span>Y: {stats.yearly}</span>
                      </div>
                      <button className={`btn-check-in ${isDoneToday ? 'done' : ''}`} onClick={() => store.toggleTracker(tracker.id, todayStr)}>
                        {isDoneToday ? '✓' : '+'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mistake Tracker */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">⚠️</span>
                <h3 className="card-title">Mistake & Bad Habit Tracker</h3>
              </div>
              <div className="mistake-picker-row">
                <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Skip outreach harian')}>Skip outreach</button>
                <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Skip render/upload CapCut atau YT')}>Skip upload</button>
                <button className="btn btn-sm btn-danger" onClick={() => store.addMistake('Buka analytics YT/CapCut di luar hari Minggu')}>Buka analitik</button>
              </div>
              <div className="flex-row mt-2">
                <input className="input-field" style={{ marginBottom: 0 }} placeholder="Input kesalahan custom..." value={customMistake} onChange={e => setCustomMistake(e.target.value)} />
                <button className="btn btn-primary" onClick={() => { if (customMistake) { store.addMistake(customMistake); setCustomMistake(''); } }}><Plus size={16}/></button>
              </div>
              <div className="mistakes-log">
                {(store.mistakes || []).map(m => (
                  <div key={m.id} className="mistake-log-item">
                    <span><strong>[{m.date}]</strong> {m.text}</span>
                    <button className="btn-icon" onClick={() => store.deleteMistake(m.id)}><Trash2 size={12}/></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Distraction Blocklist */}
            <div className="card">
              <div className="card-header">
                <span className="card-icon">🛡️</span>
                <h3 className="card-title">Distraction Blocklist</h3>
              </div>
              <div className="flex-row">
                <input className="input-field" style={{ marginBottom: 0 }} placeholder="Tambah blocklist..." value={blockInput} onChange={e => setBlockInput(e.target.value)} />
                <button className="btn btn-primary" onClick={() => { if (blockInput) { store.addBlocklistItem(blockInput); setBlockInput(''); } }}><Plus size={16}/></button>
              </div>
              <div className="blocklist-chips mt-4">
                {(store.blocklist || []).map(item => (
                  <span className="block-chip" key={item}>
                    {item}
                    <button className="btn-close-chip" onClick={() => store.deleteBlocklistItem(item)}>×</button>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ANALYTICS VIEW */
        <div className="analytics-view">
          
          {/* Tangga Income */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '16px' }}>Tangga Income — Proyeksi Realistis UMR ke Top 1%</h3>
            <div className="ladder-list">
              {(store.ladder || []).map(item => (
                <div 
                  key={item.id} 
                  className={`ladder-row-item ${store.currentLadderStage === item.id ? 'active' : ''}`}
                  onClick={() => store.setCurrentLadderStage(item.id)}
                >
                  <div className="ladder-col-stage">
                    <strong>{item.stageNum}</strong>
                    <span>{item.stageName}</span>
                  </div>
                  <div className="ladder-col-desc">{item.skill}</div>
                  <div className="ladder-col-income">{item.income}</div>
                  {store.currentLadderStage === item.id && (
                    <span className="ladder-badge">POSISI SEKARANG</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Review Mingguan */}
          <div className="card">
            <h3 className="card-title">Review Mingguan</h3>
            <div className="review-form mt-4">
              <div className="form-group">
                <label className="form-label">01. Apa yang sudah aku selesaikan minggu ini?</label>
                <textarea className="input-field" rows={2} value={revForm.q1} onChange={e => setRevForm({ ...revForm, q1: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">02. Apa satu hal yang menghambat terbesar?</label>
                <textarea className="input-field" rows={2} value={revForm.q2} onChange={e => setRevForm({ ...revForm, q2: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">03. Satu aksi konkret / penyesuaian untuk minggu depan?</label>
                <textarea className="input-field" rows={2} value={revForm.q3} onChange={e => setRevForm({ ...revForm, q3: e.target.value })} />
              </div>
              <button className="btn btn-primary" onClick={() => { if (revForm.q1 || revForm.q2 || revForm.q3) { store.addWeeklyReview(revForm); setRevForm({ q1: '', q2: '', q3: '' }); } }}>Simpan Review Mingguan</button>
            </div>

            <div className="reviews-history mt-4">
              {(store.weeklyReviews || []).map(review => (
                <div key={review.id} className="history-review-card">
                  <button className="btn-delete-review" onClick={() => store.deleteWeeklyReview(review.id)}><Trash2 size={14}/></button>
                  <div className="review-flex-cols">
                    <div><div className="num-circle">01</div><strong>Penyelesaian</strong><p>{review.q1}</p></div>
                    <div><div className="num-circle">02</div><strong>Hambatan</strong><p>{review.q2}</p></div>
                    <div><div className="num-circle">03</div><strong>Aksi Konkret</strong><p>{review.q3}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reframe Pikiran */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '16px' }}>Reframe Pikiran (Kognitif)</h3>
            <div className="flex-row">
              <input className="input-field" style={{ marginBottom: 0 }} placeholder="Pikiran lama..." value={refOld} onChange={e => setRefOld(e.target.value)} />
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <input className="input-field" style={{ marginBottom: 0 }} placeholder="Reframe baru..." value={refNew} onChange={e => setRefNew(e.target.value)} />
              <button className="btn btn-primary" onClick={() => { if (refOld && refNew) { store.addReframe({ old: refOld, new: refNew }); setRefOld(''); setRefNew(''); } }}>Simpan</button>
            </div>
            <div className="reframes-list mt-4">
              {(store.reframes || []).map(item => (
                <div className="reframe-row-card" key={item.id}>
                  <div className="reframe-old-text">{item.old}</div>
                  <div className="reframe-arrow-icon">→</div>
                  <div className="reframe-new-text">{item.new}</div>
                  <button className="btn-icon" onClick={() => store.deleteReframe(item.id)}><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Research Base */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '16px' }}>🔬 Landasan Riset yang Valid (Peer-reviewed)</h3>
            <div className="research-grid">
              <div className="r-card c1">
                <div className="r-label">Gollwitzer, 1999 · Psych Review</div>
                <div className="r-title">Implementation Intentions</div>
                <div className="r-body">Format "Jika X → maka Y" meningkatkan follow-through 2–3x dibanding goal biasa. Bekerja di level non-conscious habit loop.</div>
              </div>
              <div className="r-card c2">
                <div className="r-label">Locke & Latham, 2002</div>
                <div className="r-title">Goal-Setting Theory</div>
                <div className="r-body">Goal yang spesifik + menantang + ada feedback menghasilkan performa 16–25% lebih tinggi secara konsisten.</div>
              </div>
              <div className="r-card c3">
                <div className="r-label">Beaty et al., 2016 · PNAS</div>
                <div className="r-title">DMN & Kreativitas</div>
                <div className="r-body">Otak memproses solusi kreatif saat tidak aktif, TAPI hanya jika masalah sudah di-load dulu via kerja keras sadar.</div>
              </div>
              <div className="r-card c4">
                <div className="r-label">Graybiel, 2008 · Neurosci</div>
                <div className="r-title">Habit Loop & Basal Ganglia</div>
                <div className="r-body">Rutinitas yang diulang 60–90 hari menjadi otomatis di basal ganglia — membebaskan otak sadar untuk kerja kreatif.</div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// Deep Work Console
function DeepWorkConsole({ store }) {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isRunning, setIsRunning] = useState(false);
  const [logVal, setLogVal] = useState('');

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      store.logDeepWork(60);
      alert('Sesi Deep Work 60 menit selesai! Log ditambahkan.');
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
    const mins = parseInt(logVal, 10);
    if (!isNaN(mins) && mins > 0) { store.logDeepWork(mins); setLogVal(''); alert(`Manual Log: ${mins} menit ditambahkan.`); }
  };

  const deepWorkLogs = store.deepWorkLogs || [];
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = deepWorkLogs.find(l => l.date === todayStr);
  const deepWorkToday = todayLog ? todayLog.minutes : 0;
  const totalMinutes = deepWorkLogs.reduce((acc, curr) => acc + curr.minutes, 0);
  const totalSessions = deepWorkLogs.length;
  const averageSession = totalSessions > 0 ? (totalMinutes / totalSessions).toFixed(0) : 0;

  const getLast7Days = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      const log = deepWorkLogs.find(l => l.date === dStr);
      data.push({ label: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), value: log ? log.minutes : 0 });
    }
    return data;
  };
  const last7Days = getLast7Days();
  const maxMins = Math.max(...last7Days.map(d => d.value), 60);

  return (
    <div className="deep-work-console">
      <div className="stats-row-grid">
        <div className="stat-card">
          <span className="stat-label">DEEP WORK HARI INI</span>
          <span className="stat-value text-orange">{deepWorkToday} menit</span>
          <span className="stat-sub">Target: 240m</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">7 HARI TERAKHIR</span>
          <span className="stat-value">{totalMinutes} menit</span>
          <span className="stat-sub">Minggu ini</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">RATA-RATA SESI</span>
          <span className="stat-value">{averageSession} menit</span>
          <span className="stat-sub">Per sesi kerja</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">TOTAL SESI</span>
          <span className="stat-value">{totalSessions} sesi</span>
          <span className="stat-sub">Sepanjang waktu</span>
        </div>
      </div>

      <div className="deep-work-timer-section">
        <span className="timer-title">⏱️ Deep Work Session Timer</span>
        <div className="timer-display-cream">{formatTime(timeLeft)}</div>
        <div className="flex-row" style={{ justifyContent: 'center', marginTop: '10px' }}>
          <button className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`} onClick={toggle}>{isRunning ? 'Pause' : 'Start Session'}</button>
          <button className="btn" onClick={reset}>Reset</button>
        </div>
        <div className="manual-log-row">
          <input className="input-field" style={{ marginBottom: 0, padding: '4px 8px', fontSize: '12px' }} type="number" placeholder="Input menit..." value={logVal} onChange={e => setLogVal(e.target.value)} />
          <button className="btn btn-sm" onClick={handleManualLog}>Log Menit</button>
        </div>
      </div>

      <div className="trend-chart-box">
        <span className="chart-title">📈 Tren Deep Work (7 Hari Terakhir)</span>
        <div className="chart-bars-wrap">
          {last7Days.map((day, idx) => {
            const pct = (day.value / maxMins) * 100;
            return (
              <div key={idx} className="chart-bar-col">
                <div className="chart-bar-container">
                  <div className="chart-bar-fill" style={{ height: `${pct}%` }} title={`${day.value} menit`} />
                </div>
                <span className="chart-bar-label">{day.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
