/* =========================================================
   PORTAL KADER — Rayon PMII Ibnu Sina FMIPA UM
   Logika aplikasi (vanilla JS, tanpa framework)
   Data ada di assets/js/data.js
   ========================================================= */

/* ---------- 1. Utilitas ---------- */
const $ = (id) => document.getElementById(id);

function esc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        if (!file) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}

function getInitials(nama, fallback) {
    return nama.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || fallback;
}

function getSapaan(user) {
    return user.gender === 'P' ? 'Sahabati' : 'Sahabat';
}

function isAdmin() {
    return Boolean(currentUser && currentUser.role === 'admin');
}

const IMG_FALLBACK = `onerror="this.style.opacity=0"`;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 2. Konfigurasi tampilan ---------- */
const PRODI_OPTIONS = [
    'S1 Matematika', 'S1 Pendidikan Matematika', 'S1 Fisika', 'S1 Pendidikan Fisika',
    'S1 Kimia', 'S1 Pendidikan Kimia', 'S1 Biologi', 'S1 Pendidikan Biologi',
    'S1 Pendidikan IPA', 'S1 Bioteknologi'
];

const NAV_ITEMS = [
    { key: 'beranda', label: 'Beranda',  icon: 'fa-house',             desc: 'Ringkasan ekosistem kader' },
    { key: 'space',   label: 'Space',    icon: 'fa-rocket',            num: 1, desc: '5 kelas pelatihan minat-bakat' },
    { key: 'radar',   label: 'Radar',    icon: 'fa-satellite-dish',    num: 2, desc: 'Info lomba & beasiswa' },
    { key: 'lentera', label: 'Lentera',  icon: 'fa-book-open-reader',  num: 3, desc: 'Bank materi & arsip berkas' },
    { key: 'aksara',  label: 'Aksara',   icon: 'fa-feather-pointed',   num: 4, desc: 'Publikasi karya tulis kader' },
    { key: 'market',  label: 'Market',   icon: 'fa-store',             num: 5, desc: 'Etalase usaha kader' },
    { key: 'agenda',  label: 'Agenda',   icon: 'fa-calendar-check',    num: 6, desc: 'Kalender kegiatan rayon' },
    { key: 'profil',  label: 'Profil',   icon: 'fa-sitemap',           num: 7, desc: 'Visi-misi, struktur & proker' },
    { key: 'anggota', label: 'Anggota',  icon: 'fa-users-gear',        admin: true, desc: 'Database anggota (admin)' }
];

const FEATURE_NAMES = {
    space: 'Avicenna Space', radar: 'Radar Avicenna', lentera: 'Lentera Avicenna', aksara: 'Aksara Sina',
    market: 'Avicenna Market', agenda: 'Agenda Avicenna', profil: 'Profil Avicenna'
};

const viewMeta = {
    beranda: { title: 'Beranda Ekosistem Kader', subtitle: 'Pusat aktivitas, pengembangan diri, dan literasi kader Rayon PMII Ibnu Sina FMIPA UM' },
    space:   { title: '1. Avicenna Space', subtitle: 'Informasi 5 pelatihan minat-bakat kader beserta modul materi pertemuannya' },
    radar:   { title: '2. Radar Avicenna', subtitle: 'Informasi Lomba & Beasiswa Terbuka + Grup Tanya Sahabat' },
    lentera: { title: '3. Lentera Avicenna', subtitle: 'Bank Materi Kuliah FMIPA, Materi Kaderisasi, & Arsip Berkas Mas/Mbak Lolos Seleksi' },
    aksara:  { title: '4. Aksara Sina', subtitle: 'Publikasi Karya Tulis Kader: Puisi, Cerpen, Opini, dan Resensi Buku' },
    market:  { title: '5. Avicenna Market', subtitle: 'Tempat Kader Mempromosikan Barang Jualan: ATK, Makanan, & Jasa' },
    agenda:  { title: '6. Agenda Avicenna', subtitle: 'Kalender Kegiatan Rayon dan Jadwal Kumpul Mingguan Avicenna Space' },
    profil:  { title: '7. Profil Avicenna', subtitle: 'Profil Kepengurusan, Visi-Misi, Struktur Organisasi, dan Program Kerja' },
    anggota: { title: 'Data Anggota Kader (Panel Admin)', subtitle: 'Kelola biodata anggota terdaftar, kontak WhatsApp, Foto KTM, dan Sertifikat MAPABA' }
};

const FILTERS = {
    radar: [
        { value: 'Semua', label: 'Semua' }, { value: 'Esai', label: 'Esai' }, { value: 'KTI', label: 'KTI / PKM' },
        { value: 'Desain', label: 'Desain' }, { value: 'Olimpiade', label: 'Olimpiade' }, { value: 'Beasiswa', label: 'Beasiswa' }
    ],
    jurusan: [
        { value: 'Semua', label: 'Semua Jurusan' }, { value: 'Matematika', label: 'Matematika' }, { value: 'Fisika', label: 'Fisika' },
        { value: 'Kimia', label: 'Kimia' }, { value: 'Biologi', label: 'Biologi' }, { value: 'IPA', label: 'Pendidikan IPA' }
    ],
    aksara: [
        { value: 'Semua', label: 'Semua Karya' }, { value: 'Puisi', label: 'Puisi' }, { value: 'Cerpen', label: 'Cerpen' },
        { value: 'Opini & Esai', label: 'Opini & Esai' }, { value: 'Resensi Buku', label: 'Resensi Buku' }
    ],
    market: [
        { value: 'Semua', label: 'Semua Produk' }, { value: 'ATK & Kebutuhan Lab', label: 'ATK & Kebutuhan Lab' },
        { value: 'Makanan & Minuman', label: 'Makanan & Minuman' }, { value: 'Jasa & Merch', label: 'Jasa & Merch' }
    ],
    agenda: [
        { value: 'Semua', label: 'Semua' }, { value: 'Avicenna Space', label: 'Jadwal Space' }, { value: 'Kegiatan Rayon', label: 'Agenda Rayon' }
    ]
};

const LENTERA_TABS = [
    { key: 'kuliah',     label: '1. Materi Kuliah FMIPA',        desc: 'Diktat, modul praktikum & soal ujian',    icon: 'fa-graduation-cap' },
    { key: 'kaderisasi', label: '2. Materi Kaderisasi PMII',     desc: 'NDP, Aswaja, Ansos & modul MAPABA/PKD',   icon: 'fa-flag' },
    { key: 'arsip',      label: '3. Arsip Lomba & Beasiswa',     desc: 'Proposal lolos PKM, esai juara & motlet', icon: 'fa-trophy' }
];

const AKSARA_CHIP = { 'Puisi': 'chip-rose', 'Cerpen': 'chip-violet', 'Opini & Esai': 'chip-navy', 'Resensi Buku': 'chip-teal' };
const PROKER_STATUS = { 'Terlaksana': 'status-done', 'Sedang Berjalan': 'status-run', 'Akan Datang': 'status-next' };

/* ---------- 3. State ---------- */
let activeView = 'beranda';
let activeSpaceId = 'kepenulisan';
let activeRadarFilter = 'Semua';
let activeLenteraTab = 'kuliah';
let activeLenteraJurusan = 'Semua';
let activeAksaraFilter = 'Semua';
let activeMarketFilter = 'Semua';
let activeAgendaFilter = 'Semua';

/* ---------- 4. Navigasi ---------- */
function visibleNavItems() {
    return NAV_ITEMS.filter(item => !item.admin || isAdmin());
}

function renderNav() {
    const memberCount = registeredUsers.filter(u => u.role === 'anggota').length;
    const nav = $('mainnav');
    const indicator = $('nav-indicator');
    nav.innerHTML = '';
    nav.appendChild(indicator);

    visibleNavItems().forEach(item => {
        if (item.admin) {
            const sep = document.createElement('span');
            sep.className = 'nav-sep';
            nav.appendChild(sep);
        }
        const btn = document.createElement('button');
        btn.className = 'nav-link' + (item.key === activeView ? ' is-active' : '');
        btn.dataset.nav = item.key;
        btn.title = item.num ? `${item.num}. ${FEATURE_NAMES[item.key]}` : item.label;
        btn.innerHTML = `<i class="fa-solid ${item.icon}"></i><span class="nav-text">${item.label}</span>${
            item.admin ? `<span class="nav-badge" id="sidebar-anggota-count">${memberCount}</span>` : ''}`;
        btn.addEventListener('click', () => switchView(item.key));
        nav.appendChild(btn);
    });

    $('sheet-grid').innerHTML = visibleNavItems().map((item, i) => `
        <button class="sheet-link${item.key === activeView ? ' is-active' : ''}" style="--i:${i}" onclick="closeMenuSheet(); switchView('${item.key}')">
            <i class="fa-solid ${item.icon}"></i>
            <span>${item.num ? item.num + '. ' : ''}${esc(item.label)}${item.admin ? ` (${memberCount})` : ''}</span>
        </button>
    `).join('');

    requestAnimationFrame(moveNavIndicator);
}

function moveNavIndicator() {
    const indicator = $('nav-indicator');
    const active = document.querySelector('#mainnav .nav-link.is-active');
    if (!indicator) return;
    if (!active || active.offsetParent === null) { indicator.style.opacity = 0; return; }
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
    indicator.style.opacity = 1;
}

function switchView(viewKey) {
    if (viewKey === 'anggota' && !isAdmin()) {
        showToast('Menu Data Anggota hanya dapat diakses oleh Admin Pengurus.');
        return;
    }
    const target = $(`view-${viewKey}`);
    if (!target) return;
    activeView = viewKey;

    document.querySelectorAll('.view').forEach(sec => { sec.hidden = sec !== target; });
    target.classList.remove('is-entering');
    void target.offsetWidth; // mulai ulang animasi masuk
    target.classList.add('is-entering');

    document.querySelectorAll('[data-nav]').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.nav === viewKey);
    });
    const inBottomNav = ['beranda', 'space', 'radar', 'aksara'].includes(viewKey);
    document.querySelector('.bn-item[data-nav="more"]').classList.toggle('is-active', !inBottomNav);
    document.querySelectorAll('.sheet-link').forEach((el, i) => {
        el.classList.toggle('is-active', visibleNavItems()[i]?.key === viewKey);
    });
    moveNavIndicator();

    const meta = viewMeta[viewKey];
    if (meta) {
        $('header-title').textContent = meta.title;
        $('header-subtitle').textContent = meta.subtitle;
        document.title = `${meta.title} — Rayon PMII Ibnu Sina`;
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    if (viewKey === 'beranda') runCountUp();
}

function openMenuSheet() {
    renderNav();
    $('menu-sheet').hidden = false;
    lockScroll(true);
}

function closeMenuSheet() {
    $('menu-sheet').hidden = true;
    lockScroll(false);
}

/* Kunci scroll halaman saat ada modal/lembar terbuka */
let scrollLocks = 0;
function lockScroll(on) {
    scrollLocks = Math.max(0, scrollLocks + (on ? 1 : -1));
    const gateOpen = !$('auth-gate').hidden;
    document.body.classList.toggle('no-scroll', scrollLocks > 0 || gateOpen);
}

/* ---------- 5. Komponen kecil ---------- */
function renderSegmented(containerId, options, activeValue, handlerName) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = options.map(o => `
        <button class="seg-btn${o.value === activeValue ? ' is-active' : ''}" onclick="${handlerName}('${esc(o.value)}')">${esc(o.label)}</button>
    `).join('');
}

function emptyState(icon, text) {
    return `<div class="empty"><i class="fa-solid ${icon}"></i><p>${text}</p></div>`;
}

function adminDeleteBtn(call, title) {
    return isAdmin()
        ? `<button class="icon-btn danger" onclick="${call}" title="${esc(title)}" aria-label="${esc(title)}"><i class="fa-solid fa-trash-can"></i></button>`
        : '';
}

/* ---------- 6. Beranda ---------- */
function renderFeatures() {
    $('home-features').innerHTML = NAV_ITEMS.filter(n => n.num).map((n, i) => `
        <button class="feature" data-accent="${n.key}" style="--i:${i}" onclick="switchView('${n.key}')">
            <i class="fa-solid ${n.icon}"></i>
            <span>
                <span class="fnum">0${n.num}</span>
                <b>${FEATURE_NAMES[n.key]}</b>
                <small>${n.desc}</small>
            </span>
        </button>
    `).join('');
}

function renderBerandaPreviews() {
    const agendaBox = $('beranda-agenda-preview');
    if (agendaBox) {
        agendaBox.innerHTML = agendaData.slice(0, 3).map((a, i) => {
            const [tgl] = a.date.split('•');
            const [num] = tgl.trim().split(' ');
            return `
                <button class="mini" style="--i:${i}" onclick="switchView('agenda')">
                    <span class="date-tile"><small>${esc(a.day.substring(0, 3))}</small><b>${esc(num)}</b></span>
                    <div><strong>${esc(a.title)}</strong><small>${esc(a.date)} • ${esc(a.location)}</small></div>
                    <i class="fa-solid fa-chevron-right go"></i>
                </button>`;
        }).join('') || emptyState('fa-calendar', 'Belum ada agenda.');
    }

    const aksaraBox = $('beranda-aksara-preview');
    if (aksaraBox) {
        aksaraBox.innerHTML = aksaraData.slice(0, 3).map((k, i) => `
            <button class="mini" style="--i:${i}" onclick="switchView('aksara')">
                <span class="quote-mark">&ldquo;</span>
                <div><strong>${esc(k.title)}</strong><small>${esc(k.category)} • Oleh: ${esc(k.author)}</small></div>
                <i class="fa-solid fa-chevron-right go"></i>
            </button>
        `).join('') || emptyState('fa-feather', 'Belum ada karya.');
    }
}

function updateCounters() {
    const set = (id, n) => { const el = $(id); if (el) { el.dataset.count = n; el.textContent = n; } };
    set('home-space-count', spaceData.length);
    set('home-radar-count', radarData.length);
    set('home-lentera-count', lenteraData.length);
    set('home-aksara-count', aksaraData.length);
    const header = $('header-radar-count');
    if (header) header.innerHTML = `<b>${radarData.length}</b> Info Lomba & Beasiswa`;
}

function runCountUp() {
    if (prefersReducedMotion) return;
    document.querySelectorAll('#view-beranda [data-count]').forEach(el => {
        const target = Number(el.dataset.count) || 0;
        const start = performance.now();
        const dur = 900;
        const tick = (now) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

/* ---------- 7. Avicenna Space ---------- */
function renderSpaceTabs() {
    const container = $('space-tabs');
    if (!container) return;
    container.innerHTML = spaceData.map((item, idx) => `
        <button class="class-card${item.id === activeSpaceId ? ' is-active' : ''}" style="--i:${idx}" onclick="selectSpace('${item.id}')">
            <span class="cc-top">
                <span class="cc-ico"><i class="fa-solid ${item.icon}"></i></span>
                <span class="cc-idx">#${idx + 1}</span>
            </span>
            <span>
                <b>${esc(item.name)}</b>
                <small>${item.modules.length} Materi Tersedia</small>
            </span>
        </button>
    `).join('');
}

function selectSpace(spaceId) {
    activeSpaceId = spaceId;
    renderSpaceTabs();
    renderSpaceDetail();
}

function renderSpaceDetail() {
    const space = spaceData.find(s => s.id === activeSpaceId) || spaceData[0];
    const container = $('space-detail-container');
    if (!container || !space) return;

    const modules = space.modules.map((m, mIdx) => `
        <div class="module" data-n="${mIdx + 1}" style="--i:${mIdx}">
            <div class="card card-hover">
                <div class="module-top">
                    <span class="module-meet">${esc(m.meeting)}</span>
                    <span style="display:flex;align-items:center;gap:4px">
                        <span class="chip chip-gold">${esc(m.type)}</span>
                        ${adminDeleteBtn(`deleteSpaceModule('${space.id}', ${mIdx})`, 'Hapus Modul (Admin)')}
                    </span>
                </div>
                <h4>${esc(m.title.trim())}</h4>
                <p>${esc(m.content)}</p>
                <div class="module-foot">
                    <button class="btn btn-ghost btn-sm" onclick="openSpaceModule('${space.id}', ${mIdx})"><i class="fa-solid fa-book-open-reader"></i> Baca & Unduh Materi</button>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="space-detail">
            <aside class="class-info">
                <div class="big-ico"><i class="fa-solid ${space.icon}"></i></div>
                <div>
                    <span class="chip" style="background:rgba(255,255,255,.12);color:#fff">Komunitas Pelatihan Aktif</span>
                    <h3 style="margin-top:12px">Kelas ${esc(space.name)}</h3>
                </div>
                <p>${esc(space.desc)}</p>
                <div class="info-rows">
                    <div class="info-row"><i class="fa-regular fa-clock"></i><div><small>Jadwal & Lokasi</small>${esc(space.schedule)}</div></div>
                    <div class="info-row"><i class="fa-solid fa-user-tie"></i><div><small>Koordinator / Mentor</small>${esc(space.mentor)}</div></div>
                </div>
                <div class="btns">
                    <button class="btn btn-wa btn-sm" onclick="showToast('Membuka Grup WhatsApp Kelas ${esc(space.name)}...')"><i class="fa-brands fa-whatsapp"></i> Grup WA Kelas</button>
                    <button class="btn btn-glass btn-sm" onclick="switchView('agenda')"><i class="fa-regular fa-calendar"></i> Lihat Jadwal Kumpul</button>
                </div>
            </aside>
            <div>
                <div class="modules-head">
                    <h3><i class="fa-solid fa-folder-open" style="color:var(--gold)"></i> Modul & Materi (${esc(space.name)})</h3>
                    ${isAdmin() ? `<button class="btn btn-admin btn-sm" onclick="openAddSpaceModuleModal()"><i class="fa-solid fa-plus"></i> Tambah Modul di Kelas Ini</button>` : ''}
                </div>
                <div class="timeline stagger">
                    ${modules || emptyState('fa-folder-open', 'Belum ada modul di kelas ini.')}
                </div>
            </div>
        </div>
    `;
}

function openSpaceModule(spaceId, idx) {
    const space = spaceData.find(s => s.id === spaceId);
    const m = space && space.modules[idx];
    if (!m) return;
    openReaderModal(`${space.name} • ${m.meeting}`, m.title.trim(), m.content, space.mentor);
}

function openAddSpaceModuleModal() {
    $('admin-space-select').innerHTML = spaceData.map(s =>
        `<option value="${esc(s.id)}"${s.id === activeSpaceId ? ' selected' : ''}>Kelas ${esc(s.name)}</option>`
    ).join('');
    openModal('modal-admin-space-module');
}

function submitAdminSpaceModule(e) {
    e.preventDefault();
    const targetId = $('admin-space-select').value;
    const meeting = $('admin-space-meeting').value.trim();
    const type = $('admin-space-type').value.trim();
    const title = $('admin-space-title').value.trim();
    const content = $('admin-space-content').value.trim();

    const targetSpace = spaceData.find(s => s.id === targetId);
    if (!targetSpace) return;
    targetSpace.modules.push({ meeting, title, type, content });
    activeSpaceId = targetId;
    renderSpaceTabs();
    renderSpaceDetail();
    closeModal('modal-admin-space-module');
    e.target.reset();
    showToast(`Modul "${title}" berhasil ditambahkan ke Kelas ${targetSpace.name}!`);
}

function deleteSpaceModule(spaceId, moduleIdx) {
    const targetSpace = spaceData.find(s => s.id === spaceId);
    if (!targetSpace || !targetSpace.modules[moduleIdx]) return;
    const [removed] = targetSpace.modules.splice(moduleIdx, 1);
    renderSpaceTabs();
    renderSpaceDetail();
    showToast(`Modul "${removed.title.trim()}" telah dihapus oleh Admin.`);
}

function openEditFifthSpaceModal() {
    $('input-space5-name').value = spaceData[4].name;
    openModal('modal-edit-space5');
}

function setSpace5Preset(name) {
    $('input-space5-name').value = name;
}

function saveFifthSpaceName() {
    const val = $('input-space5-name').value.trim();
    if (!val) return;
    spaceData[4].name = val;
    renderSpaceTabs();
    renderSpaceDetail();
    closeModal('modal-edit-space5');
    showToast(`Nama pelatihan ke-5 diubah menjadi "${val}"`);
}

/* ---------- 8. Radar Avicenna ---------- */
function filterRadar(cat) {
    activeRadarFilter = cat;
    renderRadar();
}

function renderRadar() {
    updateCounters();
    renderSegmented('radar-filters', FILTERS.radar, activeRadarFilter, 'filterRadar');

    const query = ($('radar-search')?.value || '').toLowerCase();
    const filtered = radarData.filter(item => {
        const matchCat = activeRadarFilter === 'Semua' || item.category === activeRadarFilter;
        const matchQ = item.title.toLowerCase().includes(query) || item.organizer.toLowerCase().includes(query);
        return matchCat && matchQ;
    });

    const grid = $('radar-grid');
    if (!grid) return;
    grid.innerHTML = filtered.map((item, i) => `
        <article class="card card-hover poster-card" style="--i:${i}">
            <div class="poster" onclick="openRadarDetailModal(${item.id})">
                <img src="${esc(item.poster)}" alt="${esc(item.title)}" loading="lazy" ${IMG_FALLBACK}>
                <div class="poster-tags">
                    <span class="chip chip-coral">${esc(item.category)}</span>
                    <span class="chip ${item.urgent ? 'chip-dark chip-pulse' : 'chip-gold'}"><i class="fa-regular fa-clock"></i> ${esc(item.deadline)}</span>
                </div>
                ${item.isFree ? `<span class="ribbon"><i class="fa-solid fa-tag"></i> Gratis</span>` : ''}
            </div>
            <div class="poster-body">
                <h3>${esc(item.title)}</h3>
                <p class="meta"><i class="fa-solid fa-building-columns"></i> ${esc(item.organizer)}</p>
                <div class="note"><i class="fa-solid fa-user-group"></i><span>${esc(item.teamNote)}</span></div>
                <div class="poster-foot">
                    <button class="btn btn-primary go-btn" onclick="openRadarDetailModal(${item.id})">Gas Kepoin <i class="fa-solid fa-arrow-right"></i></button>
                    ${adminDeleteBtn(`deleteRadarItem(${item.id})`, 'Hapus Info Lomba (Admin)')}
                </div>
            </div>
        </article>
    `).join('') || emptyState('fa-satellite-dish', 'Belum ada info yang cocok dengan pencarianmu.');
}

async function submitAdminRadar(e) {
    e.preventDefault();
    const form = e.target;
    const title = $('admin-radar-title').value.trim();
    const category = $('admin-radar-cat').value;
    const deadline = $('admin-radar-deadline').value.trim();
    const organizer = $('admin-radar-org').value.trim();
    const isFree = $('admin-radar-free').value === 'true';
    const teamNote = $('admin-radar-team').value.trim();
    const igUrl = $('admin-radar-ig').value.trim() || 'https://www.instagram.com/fmipa.um/';
    const fullDesc = $('admin-radar-desc').value.trim();
    const posterData = await readFileAsDataURL($('admin-radar-poster').files[0]);
    const poster = posterData || `https://placehold.co/600x360/0f2557/facc15?text=${encodeURIComponent(title.substring(0, 22).toUpperCase())}`;

    radarData.unshift({ id: Date.now(), title, category, organizer, deadline, urgent: true, isFree, poster, teamNote, igUrl, fullDesc });

    form.reset();
    closeModal('modal-admin-radar');
    renderRadar();
    showToast('Info lomba/beasiswa baru berhasil ditambahkan ke Radar Avicenna!');
}

function deleteRadarItem(id) {
    const idx = radarData.findIndex(r => r.id === id);
    if (idx === -1) return;
    const [removed] = radarData.splice(idx, 1);
    renderRadar();
    showToast(`Info "${removed.title}" dihapus oleh Admin.`);
}

function openRadarDetailModal(id) {
    const item = radarData.find(r => r.id === id);
    if (!item) return;
    $('detail-radar-category').textContent = item.category;
    $('detail-radar-deadline').textContent = item.deadline;
    const img = $('detail-radar-poster');
    img.style.opacity = 1;
    img.onerror = () => { img.style.opacity = 0; };
    img.src = item.poster;
    $('detail-radar-title').textContent = item.title;
    $('detail-radar-organizer').textContent = `Penyelenggara: ${item.organizer}`;
    $('detail-radar-team').textContent = item.teamNote;
    $('detail-radar-desc').textContent = item.fullDesc;
    $('detail-radar-ig-btn').href = item.igUrl || 'https://www.instagram.com/';
    $('detail-radar-free-badge').hidden = !item.isFree;
    openModal('modal-detail-radar');
}

function goToLenteraArchive() {
    switchView('lentera');
    switchLenteraTab('arsip');
    showToast('Menampilkan Arsip Berkas Mas/Mbak di Lentera Avicenna');
}

/* ---------- 9. Lentera Avicenna ---------- */
function switchLenteraTab(tab) {
    activeLenteraTab = tab;
    renderLentera();
}

function filterLenteraJurusan(jur) {
    activeLenteraJurusan = jur;
    renderLentera();
}

function renderLentera() {
    updateCounters();

    $('lentera-tabs').innerHTML = LENTERA_TABS.map(t => `
        <button class="l-tab${t.key === activeLenteraTab ? ' is-active' : ''}" id="tab-lentera-${t.key}" onclick="switchLenteraTab('${t.key}')">
            <i class="fa-solid ${t.icon}"></i>
            <span><b>${t.label}</b><small>${t.desc}</small></span>
            <span class="l-count">${lenteraData.filter(l => l.tab === t.key).length}</span>
        </button>
    `).join('');

    const jurusanBar = $('lentera-jurusan-bar');
    jurusanBar.hidden = activeLenteraTab !== 'kuliah';
    renderSegmented('lentera-jurusan-bar', FILTERS.jurusan, activeLenteraJurusan, 'filterLenteraJurusan');

    const filtered = lenteraData.filter(item => {
        if (item.tab !== activeLenteraTab) return false;
        if (activeLenteraTab === 'kuliah' && activeLenteraJurusan !== 'Semua') return item.jurusan === activeLenteraJurusan;
        return true;
    });

    const grid = $('lentera-grid');
    if (!grid) return;
    grid.innerHTML = filtered.map((item, i) => `
        <article class="card card-hover doc${item.tab === 'arsip' ? ' arsip' : ''}" style="--i:${i}">
            <div class="doc-ico"><i class="fa-solid ${item.tab === 'arsip' ? 'fa-award' : 'fa-file-lines'}"></i></div>
            <div class="doc-body">
                <div class="doc-top">
                    <span class="chip ${item.tab === 'arsip' ? 'chip-gold' : 'chip-teal'}">${esc(item.jurusan)}</span>
                    <span style="display:flex;align-items:center;gap:4px"><small class="muted" style="font-weight:700;font-size:.74rem">${esc(item.type)}</small>${adminDeleteBtn(`deleteLenteraItem(${item.id})`, 'Hapus Berkas (Admin)')}</span>
                </div>
                <h3>${esc(item.title)}</h3>
                <p>${esc(item.summary)}</p>
                <div class="doc-foot">
                    <span class="meta"><i class="fa-solid fa-user-pen"></i> ${esc(item.contributor)}</span>
                    <button class="btn btn-primary btn-sm" onclick="openLenteraItem(${item.id})"><i class="fa-solid fa-eye"></i> Buka Berkas</button>
                </div>
            </div>
        </article>
    `).join('') || emptyState('fa-folder-open', 'Belum ada berkas di kategori ini.');
}

function openLenteraItem(id) {
    const item = lenteraData.find(l => l.id === id);
    if (item) openReaderModal(item.jurusan, item.title, item.summary, item.contributor);
}

function submitAdminLentera(e) {
    e.preventDefault();
    const tab = $('admin-lentera-tab').value;
    const jurusan = $('admin-lentera-jurusan').value;
    const title = $('admin-lentera-title').value.trim();
    const contributor = $('admin-lentera-contrib').value.trim();
    const summary = $('admin-lentera-summary').value.trim();

    lenteraData.unshift({ id: Date.now(), tab, jurusan, title, contributor, type: 'PDF • Baru Diunggah', summary });

    e.target.reset();
    closeModal('modal-admin-lentera');
    switchLenteraTab(tab);
    showToast(`Berkas "${title}" berhasil ditambahkan ke Lentera Avicenna!`);
}

function deleteLenteraItem(id) {
    const idx = lenteraData.findIndex(l => l.id === id);
    if (idx === -1) return;
    const [removed] = lenteraData.splice(idx, 1);
    renderLentera();
    showToast(`Berkas "${removed.title}" dihapus oleh Admin.`);
}

/* ---------- 10. Aksara Sina ---------- */
function filterAksara(cat) {
    activeAksaraFilter = cat;
    renderAksara();
}

function likeAksara(id) {
    const item = aksaraData.find(a => a.id === id);
    if (!item) return;
    item.likes += 1;
    renderAksara(false);
    const btn = document.querySelector(`[data-like="${id}"]`);
    if (btn) btn.classList.add('pop');
    showToast(`Apresiasi diberikan untuk karya "${item.title}"!`);
}

function submitKarya(e) {
    e.preventDefault();
    const title = $('input-karya-judul').value.trim();
    const category = $('input-karya-kategori').value;
    const author = $('input-karya-penulis').value.trim();
    const rawText = $('input-karya-isi').value.trim();
    const pdfFile = $('input-karya-pdf').files[0];

    if (!rawText && !pdfFile) {
        showToast('Silakan isi teks karya tulis atau unggah file PDF terlebih dahulu!');
        return;
    }

    const pdfName = pdfFile ? pdfFile.name : null;
    const fullText = rawText || `Naskah lengkap karya "${title}" telah diunggah dalam bentuk dokumen PDF (${pdfName}). Silakan klik tombol Unduh PDF di pojok kanan bawah untuk membaca keseluruhan isi karya.`;

    aksaraData.unshift({
        id: Date.now(), title, category, author, date: 'Baru Saja', likes: 1, pdfName,
        excerpt: fullText.substring(0, 130) + (fullText.length > 130 ? '...' : ''),
        fullText
    });

    e.target.reset();
    closeModal('modal-kirim-karya');
    renderAksara();
    showToast(pdfName ? `Karya beserta PDF "${pdfName}" berhasil diterbitkan!` : 'Karya tulis berhasil diterbitkan di Aksara Sina!');
}

function renderAksara(animate = true) {
    updateCounters();
    renderSegmented('aksara-filters', FILTERS.aksara, activeAksaraFilter, 'filterAksara');

    const filtered = aksaraData.filter(item => activeAksaraFilter === 'Semua' || item.category === activeAksaraFilter);
    const grid = $('aksara-grid');
    if (!grid) return;
    grid.classList.toggle('stagger', animate);

    grid.innerHTML = filtered.map((item, i) => `
        <article class="card card-hover work" style="--i:${i}">
            <div class="work-top">
                <span style="display:flex;gap:6px;flex-wrap:wrap">
                    <span class="chip ${AKSARA_CHIP[item.category] || 'chip-rose'}">${esc(item.category)}</span>
                    ${item.pdfName ? `<span class="chip" style="background:var(--danger-soft);color:#9f2a2a"><i class="fa-solid fa-file-pdf"></i> PDF</span>` : ''}
                </span>
                <span style="display:flex;align-items:center;gap:4px"><small class="muted" style="font-size:.74rem;font-weight:700">${esc(item.date)}</small>${adminDeleteBtn(`deleteAksaraItem(${item.id})`, 'Hapus Karya (Admin)')}</span>
            </div>
            <h3>${esc(item.title)}</h3>
            <p class="by"><i class="fa-solid fa-feather"></i> Oleh: ${esc(item.author)}</p>
            <blockquote>${esc(item.excerpt)}</blockquote>
            ${item.pdfName ? `<div class="attach"><span><i class="fa-solid fa-file-pdf"></i> ${esc(item.pdfName)}</span><span>Terlampir</span></div>` : ''}
            <div class="work-foot">
                <button class="like-btn" data-like="${item.id}" onclick="likeAksara(${item.id})"><i class="fa-solid fa-heart"></i> ${item.likes} Apresiasi</button>
                <button class="link-more" onclick="openAksaraItem(${item.id})">${item.pdfName ? 'Baca & Unduh PDF' : 'Baca Selengkapnya'} <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </article>
    `).join('') || emptyState('fa-feather-pointed', 'Belum ada karya di kategori ini.');

    renderBerandaPreviews();
}

function openAksaraItem(id) {
    const item = aksaraData.find(a => a.id === id);
    if (item) openReaderModal(item.category, item.title, item.fullText, item.author);
}

function deleteAksaraItem(id) {
    const idx = aksaraData.findIndex(a => a.id === id);
    if (idx === -1) return;
    const [removed] = aksaraData.splice(idx, 1);
    renderAksara();
    showToast(`Karya "${removed.title}" dihapus oleh Admin.`);
}

/* ---------- 11. Avicenna Market ---------- */
function filterMarket(cat) {
    activeMarketFilter = cat;
    renderMarket();
}

function renderMarket() {
    renderSegmented('market-filters', FILTERS.market, activeMarketFilter, 'filterMarket');
    const filtered = marketData.filter(item => activeMarketFilter === 'Semua' || item.category === activeMarketFilter);
    const grid = $('market-grid');
    if (!grid) return;

    grid.innerHTML = filtered.map((item, i) => `
        <article class="card card-hover poster-card" style="--i:${i};--accent:var(--green)">
            <div class="poster" style="cursor:default">
                <img src="${esc(item.poster || 'https://placehold.co/600x360/0f2557/facc15?text=PRODUK+KADER+IBNU+SINA')}" alt="${esc(item.name)}" loading="lazy" ${IMG_FALLBACK}>
                <div class="poster-tags">
                    <span class="chip chip-green">${esc(item.category)}</span>
                </div>
                <span class="ribbon ribbon-gold"><i class="fa-solid fa-bolt"></i> ${esc(item.badge || 'Lapak Kader')}</span>
                <span class="price-tag">${esc(item.price)}</span>
            </div>
            <div class="poster-body">
                <h3>${esc(item.name)}</h3>
                <p class="meta"><i class="fa-solid fa-user-tag"></i> Penjual: ${esc(item.seller)}</p>
                <div class="note"><i class="fa-solid fa-box-open"></i><span>${esc(item.desc)}</span></div>
                <div class="poster-foot">
                    <button class="btn btn-wa go-btn" onclick="contactSeller(${item.id})"><i class="fa-brands fa-whatsapp"></i> Pesan via WhatsApp Kader</button>
                    ${adminDeleteBtn(`deleteMarketItem(${item.id})`, 'Hapus Produk (Admin)')}
                </div>
            </div>
        </article>
    `).join('') || emptyState('fa-store', 'Belum ada produk di kategori ini.');
}

function contactSeller(id) {
    const item = marketData.find(m => m.id === id);
    if (item) showToast(`Membuka chat WhatsApp ke ${item.seller}...`);
}

async function submitMarket(e) {
    e.preventDefault();
    const form = e.target;
    const name = $('input-market-nama').value.trim();
    const category = $('input-market-kategori').value;
    const price = $('input-market-harga').value.trim();
    const seller = $('input-market-penjual').value.trim();
    const desc = $('input-market-deskripsi').value.trim();
    const photoData = await readFileAsDataURL($('input-market-foto').files[0]);
    const poster = photoData || `https://placehold.co/600x360/0f2557/facc15?text=${encodeURIComponent(name.substring(0, 22).toUpperCase())}`;

    marketData.unshift({ id: Date.now(), name, category, price, seller, badge: 'Produk Baru', poster, desc });

    form.reset();
    closeModal('modal-pasang-jualan');
    renderMarket();
    showToast('Produk berhasil ditayangkan di Avicenna Market!');
}

function deleteMarketItem(id) {
    const idx = marketData.findIndex(m => m.id === id);
    if (idx === -1) return;
    const [removed] = marketData.splice(idx, 1);
    renderMarket();
    showToast(`Produk "${removed.name}" dihapus oleh Admin.`);
}

/* ---------- 12. Agenda Avicenna ---------- */
function filterAgenda(cat) {
    activeAgendaFilter = cat;
    renderAgenda();
}

function addToGoogleCalendar(idx) {
    const item = agendaData[idx];
    if (!item) return;
    const dates = item.gcalDates || '20261125T083000Z/20261125T103000Z';
    const details = `Kegiatan Rayon PMII Ibnu Sina FMIPA UM. Penanggung Jawab (PJ): ${item.pj}`;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.title)}&dates=${encodeURIComponent(dates)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(item.location)}`;
    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    showToast('Membuka Google Calendar untuk menyimpan jadwal & pengingat...');
}

function renderAgenda() {
    renderSegmented('agenda-filters', FILTERS.agenda, activeAgendaFilter, 'filterAgenda');
    const list = $('agenda-list');
    if (!list) return;

    const rows = agendaData
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => activeAgendaFilter === 'Semua' || item.category === activeAgendaFilter);

    list.innerHTML = rows.map(({ item, idx }, i) => {
        const [tgl, jam] = item.date.split('•');
        return `
            <article class="card card-hover event" data-cat="${esc(item.category)}" style="--i:${i}">
                <div class="event-date"><small>${esc(item.day)}</small><b>${esc(tgl.trim())}</b></div>
                <div class="event-body">
                    <div style="display:flex;flex-wrap:wrap;gap:6px">
                        <span class="chip ${item.category === 'Avicenna Space' ? 'chip-navy' : 'chip-gold'}">${esc(item.category)}</span>
                        <span class="chip"><i class="fa-regular fa-clock"></i> ${esc((jam || '16.00 WIB').trim())}</span>
                    </div>
                    <h3>${esc(item.title)}</h3>
                    <div class="event-meta">
                        <span><i class="fa-solid fa-location-dot"></i>${esc(item.location)}</span>
                        <span><i class="fa-solid fa-user-check"></i>PJ: ${esc(item.pj)}</span>
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-primary btn-sm" onclick="addToGoogleCalendar(${idx})" title="Simpan & aktifkan notifikasi di Google Calendar"><i class="fa-regular fa-calendar-plus"></i> Ingatkan Saya (Google Calendar)</button>
                    ${adminDeleteBtn(`deleteAgendaItem(${idx})`, 'Hapus Agenda (Admin)')}
                </div>
            </article>`;
    }).join('') || emptyState('fa-calendar-xmark', 'Belum ada agenda di kategori ini.');

    renderBerandaPreviews();
}

function submitAdminAgenda(e) {
    e.preventDefault();
    const day = $('admin-agenda-day').value.trim();
    const date = $('admin-agenda-date').value.trim();
    const category = $('admin-agenda-cat').value;
    const title = $('admin-agenda-title').value.trim();
    const location = $('admin-agenda-loc').value.trim();
    const pj = $('admin-agenda-pj').value.trim();

    agendaData.unshift({ day, date, category, title, location, pj, gcalDates: '20261125T083000Z/20261125T103000Z' });

    e.target.reset();
    closeModal('modal-admin-agenda');
    renderAgenda();
    showToast(`Agenda "${title}" berhasil ditambahkan!`);
}

function deleteAgendaItem(idx) {
    if (!agendaData[idx]) return;
    const [removed] = agendaData.splice(idx, 1);
    renderAgenda();
    showToast(`Agenda "${removed.title}" dihapus oleh Admin.`);
}

/* ---------- 13. Profil: Program Kerja ---------- */
function renderProkerTable() {
    const tbody = $('proker-table-body');
    if (!tbody) return;
    tbody.innerHTML = prokerData.map((p, idx) => `
        <tr style="--i:${idx}">
            <td><strong>${esc(p.nama)}</strong></td>
            <td>${esc(p.bidang)}</td>
            <td>${esc(p.waktu)}</td>
            <td>
                <div class="cell-actions">
                    <span class="status ${PROKER_STATUS[p.status] || 'status-next'}">${esc(p.status)}</span>
                    ${adminDeleteBtn(`deleteProkerItem(${idx})`, 'Hapus Proker (Admin)')}
                </div>
            </td>
        </tr>
    `).join('') || `<tr><td colspan="4" class="muted" style="text-align:center;padding:32px">Belum ada program kerja.</td></tr>`;
}

function submitAdminProker(e) {
    e.preventDefault();
    const nama = $('admin-proker-nama').value.trim();
    const bidang = $('admin-proker-bidang').value.trim();
    const waktu = $('admin-proker-waktu').value.trim();
    const status = $('admin-proker-status').value;

    prokerData.push({ id: Date.now(), nama, bidang, waktu, status });
    e.target.reset();
    closeModal('modal-admin-proker');
    renderProkerTable();
    showToast(`Program kerja "${nama}" berhasil ditambahkan!`);
}

function deleteProkerItem(idx) {
    if (!prokerData[idx]) return;
    const [removed] = prokerData.splice(idx, 1);
    renderProkerTable();
    showToast(`Proker "${removed.nama}" dihapus oleh Admin.`);
}

/* ---------- 14. Data Anggota (admin) ---------- */
function renderDataAnggota() {
    const members = registeredUsers
        .map((u, idx) => ({ u, idx }))
        .filter(({ u }) => u.role === 'anggota');

    const badge = $('sidebar-anggota-count');
    if (badge) badge.textContent = members.length;

    const q = ($('search-anggota-input')?.value || '').toLowerCase();
    const filtered = members.filter(({ u }) =>
        u.nama.toLowerCase().includes(q) ||
        (u.nim || '').toLowerCase().includes(q) ||
        (u.prodi || '').toLowerCase().includes(q)
    );

    const waBtn = (u) => `<button class="btn btn-sm" style="--btn-bg:var(--green-soft);--btn-fg:#13703b;--btn-bd:transparent" onclick="contactMember(${registeredUsers.indexOf(u)})"><i class="fa-brands fa-whatsapp"></i> ${esc(u.hp || '-')}</button>`;
    const berkasBtn = (idx) => `<button class="btn btn-sm" style="--btn-bg:var(--sky-soft);--btn-fg:var(--navy);--btn-bd:transparent" onclick="openAdminBerkasModal(${idx})"><i class="fa-solid fa-folder-open"></i> Lihat KTM & MAPABA</button>`;
    const hapusBtn = (idx) => `<button class="btn btn-danger btn-sm" onclick="deleteAnggota(${idx})" title="Hapus Data Anggota"><i class="fa-solid fa-trash-can"></i> Hapus</button>`;

    $('anggota-table-body').innerHTML = filtered.map(({ u, idx }, i) => `
        <tr style="--i:${i}">
            <td><div class="who"><img src="${esc(u.photoUrl)}" alt="" ${IMG_FALLBACK}><div><strong>${getSapaan(u)} ${esc(u.nama)}</strong><small>Anggota Aktif</small></div></div></td>
            <td><strong>${esc(u.nim || '-')}</strong><br><span class="muted" style="font-size:.78rem">${esc(u.prodi || 'FMIPA UM')}</span></td>
            <td>${waBtn(u)}</td>
            <td>${berkasBtn(idx)}</td>
            <td style="text-align:right">${hapusBtn(idx)}</td>
        </tr>
    `).join('') || `<tr><td colspan="5" class="muted" style="text-align:center;padding:32px">Tidak ada anggota yang cocok.</td></tr>`;

    $('anggota-cards').innerHTML = filtered.map(({ u, idx }, i) => `
        <article class="card member" style="--i:${i}">
            <div class="member-top"><img src="${esc(u.photoUrl)}" alt="" ${IMG_FALLBACK}><div><strong>${getSapaan(u)} ${esc(u.nama)}</strong><small>Anggota Aktif</small></div></div>
            <div class="member-info">
                <div class="kv"><small>NIM</small><b>${esc(u.nim || '-')}</b></div>
                <div class="kv"><small>Program Studi</small><b>${esc(u.prodi || 'FMIPA UM')}</b></div>
            </div>
            <div class="member-actions">${waBtn(u)}${berkasBtn(idx)}${hapusBtn(idx)}</div>
        </article>
    `).join('') || emptyState('fa-users', 'Tidak ada anggota yang cocok.');

    renderNav();
}

function contactMember(idx) {
    const m = registeredUsers[idx];
    if (m) showToast(`Membuka WhatsApp ${getSapaan(m)} ${m.nama} (${m.hp})...`);
}

function openAdminBerkasModal(idx) {
    const member = registeredUsers[idx];
    if (!member || member.role !== 'anggota') return;
    const sapaan = getSapaan(member);

    $('berkas-modal-title').textContent = `${sapaan} ${member.nama} (${member.prodi})`;
    $('berkas-modal-body').innerHTML = `
        <div class="member-info">
            <div class="kv"><small>NIM</small><b>${esc(member.nim || '-')}</b></div>
            <div class="kv"><small>Nomor WhatsApp</small><b>${esc(member.hp || '-')}</b></div>
        </div>
        <div class="detail-block">
            <h4><i class="fa-solid fa-id-card"></i> 1. Foto Kartu Tanda Mahasiswa (KTM)</h4>
            <p style="font-size:.82rem">${esc(member.ktmName || 'KTM.jpg')}</p>
            <img class="berkas-img" src="${esc(member.ktmUrl || 'https://placehold.co/600x360/1e3a8a/ffffff?text=Foto+KTM+Terunggah')}" alt="Foto KTM" ${IMG_FALLBACK}>
        </div>
        <div class="detail-block">
            <h4><i class="fa-solid fa-certificate"></i> 2. Sertifikat MAPABA</h4>
            <p style="font-size:.82rem">${esc(member.mapabaName || 'Sertifikat_MAPABA.pdf')}</p>
            <img class="berkas-img" src="${esc(member.mapabaUrl || 'https://placehold.co/600x360/eab308/0f2557?text=Sertifikat+MAPABA+Terunggah')}" alt="Sertifikat MAPABA" ${IMG_FALLBACK}>
        </div>
    `;
    openModal('modal-admin-berkas');
}

function deleteAnggota(idx) {
    const member = registeredUsers[idx];
    if (!member || member.role !== 'anggota') return;
    registeredUsers.splice(idx, 1);
    renderDataAnggota();
    showToast(`Data anggota "${member.nama}" telah dihapus.`);
}

/* ---------- 15. Autentikasi ---------- */
function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    $('auth-panel-login').hidden = !isLogin;
    $('auth-panel-register').hidden = isLogin;
    $('auth-tabs').dataset.tab = tab;
    $('tab-auth-login').classList.toggle('is-active', isLogin);
    $('tab-auth-register').classList.toggle('is-active', !isLogin);
    $('auth-heading').textContent = isLogin ? 'Ahlan wa sahlan 👋' : 'Gabung jadi bagian kami';
    $('auth-sub').textContent = isLogin
        ? 'Masuk untuk melanjutkan ke portal kader.'
        : 'Pendaftaran membutuhkan kode rahasia dari pengurus rayon.';
}

function verifySecretCode() {
    const code = $('input-secret-code').value.trim().toUpperCase();
    const errEl = $('secret-code-error');
    if (code === SECRET_CODE_ANGGOTA || code === SECRET_CODE_ADMIN) {
        errEl.hidden = true;
        $('reg-step-code').hidden = true;
        $('reg-form-anggota').hidden = code !== SECRET_CODE_ANGGOTA;
        $('reg-form-admin').hidden = code !== SECRET_CODE_ADMIN;
    } else {
        errEl.hidden = false;
        const input = $('input-secret-code');
        input.animate?.([
            { transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' },
            { transform: 'translateX(-4px)' }, { transform: 'translateX(0)' }
        ], { duration: 360 });
    }
}

function resetSecretCodeStep() {
    $('reg-step-code').hidden = false;
    $('reg-form-anggota').hidden = true;
    $('reg-form-admin').hidden = true;
    $('input-secret-code').value = '';
}

async function handleRegisterAnggota(e) {
    e.preventDefault();
    const nama = $('reg-anggota-nama').value.trim();
    const fotoFile = $('reg-anggota-foto').files[0];
    const ktmFile = $('reg-anggota-ktm').files[0];
    const mapabaFile = $('reg-anggota-mapaba').files[0];
    const [photoData, ktmData, mapabaData] = await Promise.all([
        readFileAsDataURL(fotoFile), readFileAsDataURL(ktmFile), readFileAsDataURL(mapabaFile)
    ]);

    const newUser = {
        role: 'anggota',
        nama,
        password: $('reg-anggota-pass').value,
        gender: $('reg-anggota-gender').value,
        nim: $('reg-anggota-nim').value.trim(),
        prodi: $('reg-anggota-prodi').value,
        hp: $('reg-anggota-hp').value.trim(),
        photoUrl: photoData || `https://placehold.co/100x100/0f2557/facc15?text=${encodeURIComponent(getInitials(nama, 'KA'))}`,
        ktmName: ktmFile ? ktmFile.name : 'KTM.jpg',
        ktmUrl: ktmData,
        mapabaName: mapabaFile ? mapabaFile.name : 'Sertifikat_MAPABA.jpg',
        mapabaUrl: mapabaData
    };

    registeredUsers.push(newUser);
    applyUserSession(newUser);
    e.target.reset();
    resetSecretCodeStep();
    showToast(`Pendaftaran berhasil! Selamat datang ${getSapaan(newUser)} ${newUser.nama}`);
}

async function handleRegisterAdmin(e) {
    e.preventDefault();
    const nama = $('reg-admin-nama').value.trim();
    const photoData = await readFileAsDataURL($('reg-admin-foto').files[0]);

    const newAdmin = {
        role: 'admin',
        nama,
        password: $('reg-admin-pass').value,
        jabatan: $('reg-admin-jabatan').value.trim(),
        gender: $('reg-admin-gender').value,
        prodi: $('reg-admin-prodi').value,
        photoUrl: photoData || `https://placehold.co/100x100/eab308/0f2557?text=${encodeURIComponent(getInitials(nama, 'AD'))}`
    };

    registeredUsers.push(newAdmin);
    applyUserSession(newAdmin);
    e.target.reset();
    resetSecretCodeStep();
    showToast(`Pendaftaran Admin berhasil! Selamat bertugas ${getSapaan(newAdmin)} ${newAdmin.nama}`);
}

function handleLogin(e) {
    e.preventDefault();
    const namaInput = $('login-nama').value.trim();
    const passInput = $('login-password').value;

    const found = registeredUsers.find(u => u.nama.toLowerCase() === namaInput.toLowerCase());
    if (found) {
        applyUserSession(found);
        showToast(`Selamat datang kembali, ${getSapaan(found)} ${found.nama}!`);
        return;
    }
    const customUser = {
        role: 'anggota',
        nama: namaInput,
        password: passInput,
        gender: 'L',
        nim: '240332609999',
        prodi: 'S1 Fisika',
        hp: '08123456789',
        photoUrl: `https://placehold.co/100x100/0f2557/facc15?text=${encodeURIComponent(getInitials(namaInput, 'KA'))}`,
        ktmName: 'KTM_Kader.jpg',
        mapabaName: 'Sertifikat_MAPABA.pdf'
    };
    applyUserSession(customUser);
    showToast(`Berhasil masuk sebagai ${getSapaan(customUser)} ${customUser.nama}`);
}

function quickLoginDemo(roleType) {
    const target = registeredUsers.find(u => u.role === roleType) || registeredUsers[0];
    applyUserSession(target);
    showToast(`Masuk sebagai ${getSapaan(target)} ${target.nama} (${target.role.toUpperCase()})`);
}

function applyUserSession(user) {
    currentUser = user;
    const sapaan = getSapaan(user);
    const admin = isAdmin();
    const roleLine = admin ? `Admin • ${user.jabatan}` : 'Anggota Kader Aktif';

    $('user-chip-photo').src = user.photoUrl;
    $('user-chip-name').textContent = `${sapaan} ${user.nama}`;
    $('user-chip-role').textContent = roleLine;
    $('sheet-user-photo').src = user.photoUrl;
    $('sheet-user-name').textContent = `${sapaan} ${user.nama}`;
    $('sheet-user-role').textContent = `${roleLine} • ${user.prodi || user.jabatan || 'FMIPA UM'}`;
    $('home-greeting-name').textContent = `${sapaan} ${user.nama}`;
    $('home-admin-flag').hidden = !admin;

    document.querySelectorAll('.admin-only').forEach(el => { el.hidden = !admin; });

    // Render ulang semua komponen agar tombol tambah/hapus Admin menyesuaikan role
    renderAll();

    hideAuthGate();
    if (activeView === 'anggota' && !admin) activeView = 'beranda';
    switchView(activeView);
}

function hideAuthGate() {
    const gate = $('auth-gate');
    if (gate.hidden) return;
    gate.classList.add('is-leaving');
    const done = () => {
        gate.hidden = true;
        gate.classList.remove('is-leaving');
        lockScroll(false);
        moveNavIndicator();
    };
    if (prefersReducedMotion) done(); else setTimeout(done, 480);
}

function logoutUser() {
    const gate = $('auth-gate');
    gate.classList.remove('is-leaving');
    gate.hidden = false;
    gate.scrollTop = 0;
    document.body.classList.add('no-scroll');
    switchAuthTab('login');
    showToast('Berhasil keluar dari sesi akun.');
}

function openProfileDetailModal() {
    const user = currentUser;
    const sapaan = getSapaan(user);

    $('modal-profile-img').src = user.photoUrl;
    $('modal-profile-name').textContent = `${sapaan} ${user.nama}`;
    $('modal-profile-prodi').textContent = user.prodi || 'FMIPA UM';

    const roleEl = $('modal-profile-role');
    const extra = $('modal-profile-extra');

    if (user.role === 'admin') {
        roleEl.className = 'chip chip-gold';
        roleEl.textContent = 'Admin Pengurus';
        extra.innerHTML = `<div class="kv" style="background:var(--gold-soft)"><small>Jabatan di Kepengurusan</small><b>${esc(user.jabatan)}</b></div>`;
    } else {
        roleEl.className = 'chip chip-navy';
        roleEl.textContent = 'Anggota Kader';
        extra.innerHTML = `
            <div class="member-info">
                <div class="kv"><small>NIM</small><b>${esc(user.nim || '-')}</b></div>
                <div class="kv"><small>Nomor WhatsApp</small><b>${esc(user.hp || '-')}</b></div>
            </div>
            <p class="field-label" style="margin-top:4px">Berkas pendaftaran tersimpan (lokal browser):</p>
            <div class="file-row"><span><i class="fa-solid fa-id-card" style="color:var(--navy);margin-right:6px"></i>${esc(user.ktmName || 'Foto KTM')}</span><span class="chip chip-green">Terunggah</span></div>
            <div class="file-row"><span><i class="fa-solid fa-certificate" style="color:var(--gold);margin-right:6px"></i>${esc(user.mapabaName || 'Sertifikat MAPABA')}</span><span class="chip chip-green">Terunggah</span></div>
        `;
    }
    openModal('modal-profil-kader');
}

/* ---------- 16. Modal, pembaca & toast ---------- */
function openModal(id) {
    const el = $(id);
    if (!el || !el.hidden) return;
    el.classList.remove('is-closing');
    el.hidden = false;
    lockScroll(true);
    const focusable = el.querySelector('input:not([type="hidden"]), select, textarea, button:not([data-close])');
    if (focusable && window.matchMedia('(min-width: 640px)').matches) setTimeout(() => focusable.focus({ preventScroll: true }), 80);
}

function closeModal(id) {
    const el = $(id);
    if (!el || el.hidden || el.classList.contains('is-closing')) return;
    const finish = () => {
        el.hidden = true;
        el.classList.remove('is-closing');
        lockScroll(false);
    };
    if (prefersReducedMotion) { finish(); return; }
    el.classList.add('is-closing');
    setTimeout(finish, 230);
}

function openReaderModal(badge, title, content, contributor) {
    $('reader-badge').textContent = badge;
    $('reader-title').textContent = title;
    $('reader-body').textContent = content;
    $('reader-meta').textContent = `Kontributor: ${contributor}`;
    openModal('modal-reader');
}

function openTanyaSahabatModal(contextText) {
    $('tanya-sahabat-context').textContent = `Topik: ${contextText}`;
    openModal('modal-tanya-sahabat');
}

let toastTimer = null;
function showToast(message) {
    const root = $('toast-root');
    root.innerHTML = `<div class="toast" role="status"><i class="fa-solid fa-check"></i><span></span><span class="toast-bar"></span></div>`;
    const toast = root.firstElementChild;
    toast.querySelector('span').textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add('is-leaving');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/* ---------- 17. Inisialisasi ---------- */
function renderAll() {
    renderSpaceTabs();
    renderSpaceDetail();
    renderRadar();
    renderLentera();
    renderAksara();
    renderMarket();
    renderAgenda();
    renderProkerTable();
    renderDataAnggota();
    renderFeatures();
    updateCounters();
}

function initGlobalEvents() {
    // Tutup modal lewat tombol/backdrop bertanda data-close
    document.addEventListener('click', (e) => {
        const closer = e.target.closest('[data-close]');
        if (!closer) return;
        const modal = closer.closest('.modal');
        if (modal) closeModal(modal.id);
    });

    // Tombol Escape menutup modal paling atas / lembar menu
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const open = [...document.querySelectorAll('.modal')].filter(m => !m.hidden);
        if (open.length) { closeModal(open[open.length - 1].id); return; }
        if (!$('menu-sheet').hidden) closeMenuSheet();
    });

    const topbar = $('topbar');
    window.addEventListener('scroll', () => {
        topbar.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });

    window.addEventListener('resize', moveNavIndicator);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveNavIndicator);
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.prodi-select').forEach(sel => {
        sel.innerHTML = PRODI_OPTIONS.map(p => `<option value="${p}">${p}</option>`).join('');
    });
    initGlobalEvents();
    renderNav();
    renderAll();
    switchView('beranda');
});
