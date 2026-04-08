import React, { useState } from 'react';
import { useStore } from './store';

const Plus = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const Trash2 = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

function Hero() {
  return (
    <div className="hero">
      <div className="hero-eyebrow">
        <span>Life Operating System — Evidence Based</span>
      </div>
      <h1>Dari UMR<br />menuju <em>Top 5%</em></h1>
      <p className="hero-desc">
        Sistem berbasis riset ilmiah valid yang dirancang spesifik untuk karakter Elang + Koala + Singa.
        Bukan motivasi kosong — tapi mekanisme kognitif nyata yang bisa diimplementasi hari ini.
      </p>
      <div className="char-row">
        <span className="chip s">🦁 Singa — hasil & berani</span>
        <span className="chip k">🐨 Koala — rutinitas & stabil</span>
        <span className="chip e">🦅 Elang — detail & proses</span>
      </div>
    </div>
  );
}

function ResearchBase() {
  return (
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#8b5cf615' }}>🔬</div>
        <div className="sec-title">Landasan Riset yang Valid</div>
        <div className="sec-ref">Peer-reviewed</div>
      </div>
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
          <div className="r-title">Default Mode Network</div>
          <div className="r-body">Otak memproses solusi kreatif saat tidak aktif, TAPI hanya jika masalah sudah di-load dulu via kerja keras sadar.</div>
        </div>
        <div className="r-card c4">
          <div className="r-label">Graybiel, 2008</div>
          <div className="r-title">Habit Loop & Basal Ganglia</div>
          <div className="r-body">Rutinitas yang diulang 60–90 hari menjadi otomatis — membebaskan otak sadar untuk kerja kreatif.</div>
        </div>
      </div>
    </div>
  );
}

function ImplementationIntentions({ store }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ when: 'PAGI', trigger: '', response: '', note: '' });

  const handleAdd = () => {
    if (form.trigger && form.response) {
      store.addIntention(form);
      setForm({ when: 'PAGI', trigger: '', response: '', note: '' });
      setAdding(false);
    }
  };

  return (
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#06b6d415' }}>⚡</div>
        <div className="sec-title">
          <span>Implementation Intentions Harian</span>
          <button className="btn btn-sm" onClick={() => setAdding(!adding)}><Plus size={14}/> {adding ? 'Batal' : 'Tambah'}</button>
        </div>
      </div>
      
      <div className="ii-builder">
        <div className="ii-header">Format: "Jika [TRIGGER] → maka [AKSI]"</div>
        
        {adding && (
          <div className="ii-row" style={{ background: 'var(--s2)' }}>
            <select className="input-field" value={form.when} onChange={e => setForm({...form, when: e.target.value})}>
              <option>PAGI</option><option>SIANG</option><option>SORE</option><option>MALAM</option><option>BURNOUT</option>
            </select>
            <div>
              <input className="input-field" placeholder="Jika [TRIGGER]..." value={form.trigger} onChange={e => setForm({...form, trigger: e.target.value})} />
              <input className="input-field" placeholder="Maka [AKSI]..." value={form.response} onChange={e => setForm({...form, response: e.target.value})} />
              <input className="input-field" placeholder="Catatan karakter (Opsional)" value={form.note} onChange={e => setForm({...form, note: e.target.value})} />
              <div className="flex-row mt-4">
                <button className="btn btn-primary" onClick={handleAdd}>Simpan</button>
              </div>
            </div>
            <div></div>
          </div>
        )}

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
  );
}

function IncomeLadder({ store }) {
  return (
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#f59e0b15' }}>📈</div>
        <div className="sec-title">Tangga Income — UMR ke Top 5%</div>
      </div>
      <div className="ladder">
        {store.ladder.map(item => (
          <div 
            key={item.id} 
            className={`ladder-item ${store.currentLadderStage === item.id ? 'current' : ''}`}
            onClick={() => store.setCurrentLadderStage(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="ladder-stage">
              <strong>{item.stageNum}</strong>
              {item.stageName}
            </div>
            <div className="ladder-skill">{item.skill}</div>
            <div className="ladder-income">{item.income}</div>
            {store.currentLadderStage === item.id && (
              <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 8, letterSpacing: 2, color: 'var(--green)', fontFamily: 'monospace' }}>
                POSISI SEKARANG
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DailySystem({ store }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ char: '🌅', time: '', name: '', tasks: '' });

  const handleAdd = () => {
    if (form.name) {
      store.addDailyBlock({ ...form, tasks: form.tasks.split('\n').filter(Boolean) });
      setForm({ char: '🌅', time: '', name: '', tasks: '' });
      setAdding(false);
    }
  };

  return (
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#10b98115' }}>🔄</div>
        <div className="sec-title">
          <span>Sistem Harian</span>
          <button className="btn btn-sm" onClick={() => setAdding(!adding)}><Plus size={14}/> {adding ? 'Batal' : 'Tambah'}</button>
        </div>
      </div>

      {adding && (
         <div className="card mb-4">
           <div className="flex-row">
             <input className="input-field" placeholder="Ikon (🌅)" value={form.char} onChange={e => setForm({...form, char: e.target.value})} style={{ width: '60px' }} />
             <input className="input-field" placeholder="Waktu (05:00 - 06:00)" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
             <input className="input-field" placeholder="Nama Blok (Creative Block)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
           </div>
           <textarea className="input-field" rows={3} placeholder="Tugas (satu per baris)" value={form.tasks} onChange={e => setForm({...form, tasks: e.target.value})} />
           <button className="btn btn-primary" onClick={handleAdd}>Simpan Block</button>
         </div>
      )}

      <div className="daily-wrap">
        {store.dailyBlocks.map(block => (
          <div className="daily-block" key={block.id}>
            <div className="db-char">{block.char}</div>
            <div className="db-time">
              <span>{block.time}</span>
              <button style={{ background:'transparent', border:'none', color:'var(--red)', cursor:'pointer' }} onClick={() => store.deleteDailyBlock(block.id)}><Trash2 size={12}/></button>
            </div>
            <div className="db-name">{block.name}</div>
            <ul className="db-tasks">
              {block.tasks.map((task, i) => <li key={i}>{task}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyReview({ store }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ q1: '', q2: '', q3: '' });

  const handleAdd = () => {
    if (form.q1 || form.q2 || form.q3) {
      store.addWeeklyReview(form);
      setForm({ q1: '', q2: '', q3: '' });
      setAdding(false);
    }
  };

  return (
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#8b5cf615' }}>📋</div>
        <div className="sec-title">
          <span>Review Mingguan</span>
          <button className="btn btn-sm" onClick={() => setAdding(!adding)}><Plus size={14}/> {adding ? 'Batal' : 'Tambah'}</button>
        </div>
      </div>

      {adding && (
        <div className="card mb-4">
          <div className="form-group">
            <label className="form-label">01. Apa yang sudah aku selesaikan minggu ini?</label>
            <textarea className="input-field" rows={2} value={form.q1} onChange={e => setForm({...form, q1: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">02. Apa satu hal yang menghambat terbesar?</label>
            <textarea className="input-field" rows={2} value={form.q2} onChange={e => setForm({...form, q2: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">03. Satu aksi konkret untuk minggu depan?</label>
            <textarea className="input-field" rows={2} value={form.q3} onChange={e => setForm({...form, q3: e.target.value})} />
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>Simpan Review</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {store.weeklyReviews.map(review => (
          <div className="card" key={review.id} style={{ position: 'relative' }}>
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
  );
}

function MindsetReframe({ store }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ old: '', new: '' });

  const handleAdd = () => {
    if (form.old && form.new) {
      store.addReframe(form);
      setForm({ old: '', new: '' });
      setAdding(false);
    }
  };

  return (
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#f9731615' }}>🔁</div>
        <div className="sec-title">
          <span>Reframe Pikiran</span>
          <button className="btn btn-sm" onClick={() => setAdding(!adding)}><Plus size={14}/> {adding ? 'Batal' : 'Tambah'}</button>
        </div>
      </div>

      <div className="reframe-grid">
        {adding && (
          <div className="rf-row" style={{ background: 'var(--s2)' }}>
            <input className="input-field" style={{ marginBottom: 0 }} placeholder="Mindset lama..." value={form.old} onChange={e => setForm({...form, old: e.target.value})} />
            <div className="rf-arrow">→</div>
            <input className="input-field" style={{ marginBottom: 0 }} placeholder="Mindset baru..." value={form.new} onChange={e => setForm({...form, new: e.target.value})} />
            <button className="btn btn-primary" onClick={handleAdd}>Simpan</button>
          </div>
        )}

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
  );
}

function ProgressTracker({ store }) {
  const [adding, setAdding] = useState(false);
  const [trackerName, setTrackerName] = useState('');

  const handleAdd = () => {
    if (trackerName) {
      store.addTracker(trackerName);
      setTrackerName('');
      setAdding(false);
    }
  };

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
    <div className="sec">
      <div className="sec-header">
        <div className="sec-icon" style={{ background: '#10b98115' }}>📊</div>
        <div className="sec-title">
          <span>Progress Tracker</span>
          <button className="btn btn-sm" onClick={() => setAdding(!adding)}><Plus size={14}/> {adding ? 'Batal' : 'Tambah'}</button>
        </div>
      </div>

      {adding && (
        <div className="card mb-4 flex-row">
          <input className="input-field" style={{ marginBottom: 0 }} placeholder="Nama Habit / Target Baru..." value={trackerName} onChange={e => setTrackerName(e.target.value)} />
          <button className="btn btn-primary" onClick={handleAdd}>Simpan</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {store.trackers.map(tracker => {
          const stats = getStats(tracker.history);
          const isDoneToday = tracker.history.includes(todayStr);

          return (
            <div className="card" key={tracker.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', padding: '16px 20px', marginBottom: '0' }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{tracker.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Total: {tracker.history.length} kali pencapaian</div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', background: 'var(--s2)', padding: '6px 12px', borderRadius: '8px' }}>
                  Mingguan<br/><strong style={{color:'var(--text)', fontSize: '14px'}}>{stats.weekly}</strong>
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', background: 'var(--s2)', padding: '6px 12px', borderRadius: '8px' }}>
                  Bulanan<br/><strong style={{color:'var(--text)', fontSize: '14px'}}>{stats.monthly}</strong>
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', background: 'var(--s2)', padding: '6px 12px', borderRadius: '8px' }}>
                  Tahunan<br/><strong style={{color:'var(--text)', fontSize: '14px'}}>{stats.yearly}</strong>
                </div>
                
                <button 
                  onClick={() => store.toggleTracker(tracker.id, todayStr)}
                  style={{
                    padding: '8px 16px', borderRadius: '8px', border: '1px solid', cursor: 'pointer', fontWeight: 600, fontSize: '13px', marginLeft: 'auto',
                    background: isDoneToday ? '#10b98120' : 'var(--s2)',
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
  );
}

export default function App() {
  const store = useStore();

  return (
    <div className="wrap">
      <Hero />
      <ResearchBase />
      <ImplementationIntentions store={store} />
      <IncomeLadder store={store} />
      <DailySystem store={store} />
      <ProgressTracker store={store} />
      <WeeklyReview store={store} />
      <MindsetReframe store={store} />
    </div>
  );
}
