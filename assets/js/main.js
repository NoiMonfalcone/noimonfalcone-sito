/* Comportamenti comuni: menu mobile, animazioni, schede attività, galleria a mosaico, copia negli appunti */
(function () {
  const DATA = window.NOI_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Menu mobile ---------- */
  const btn = $('#menu-btn');
  const menu = $('#mobile-menu');
  if (btn && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('hidden', !open);
      $('#icon-open').classList.toggle('hidden', open);
      $('#icon-close').classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    };
    btn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
    menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
    window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));
  }

  /* ---------- Fade-in allo scroll ---------- */
  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
  }
  const observeReveal = () =>
    $$('.reveal:not(.is-visible)').forEach((el) => (io ? io.observe(el) : el.classList.add('is-visible')));

  /* ---------- Toast + copia negli appunti ---------- */
  const toast = (msg) => {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2200);
  };
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const text = b.dataset.copy;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    toast(b.dataset.copyMsg || 'Copiato negli appunti');
  });

  /* ---------- Mappa di Google: si carica solo dopo il clic del visitatore ---------- */
  $$('[data-map]').forEach((box) => {
    box.querySelector('button').addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.title = 'Mappa: Casa della Gioventù Marcelliana, Monfalcone';
      f.className = box.dataset.class || 'block h-96 w-full border-0';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.src = box.dataset.src;
      box.replaceWith(f);
    });
  });

  /* ---------- Schede attività ---------- */
  const STATUS = {
    open: { label: 'Iscrizioni aperte', cls: 'bg-mint' },
    soon: { label: 'In arrivo', cls: 'bg-sun' },
    closed: { label: 'Concluso', cls: 'bg-white' },
  };
  const BAND = { invernali: 'bg-brand-100', estive: 'bg-sun-100' };
  const ARROW = '<span class="arrow" aria-hidden="true">→</span>';

  function card(a, i = 0) {
    const s = STATUS[a.status];
    const action =
      a.status === 'open' && a.formUrl
        ? `<a href="${a.formUrl}" target="_blank" rel="noopener" class="btn btn-blue mt-6 w-full">Iscriviti ${ARROW}</a>`
        : a.status === 'soon'
        ? `<p class="mt-6 rounded-xl border-2 border-dashed border-ink/40 px-4 py-3 text-center text-sm font-bold">Coming soon… seguici sui social</p>`
        : '';
    return `
      <article class="card reveal flex flex-col overflow-hidden" data-delay="${(i % 3) + 1}">
        <div class="flex items-center justify-between border-b-2 border-ink px-5 py-3 ${BAND[a.season] || 'bg-white'}">
          <span class="sticker ${s.cls}">${s.label}</span>
          <span class="font-display text-3xl font-extrabold leading-none">${a.year}</span>
        </div>
        <div class="flex flex-1 flex-col p-6">
          <h3 class="font-display text-2xl font-extrabold leading-tight">${a.title}</h3>
          <p class="mt-2 flex-1 text-ink/75">${a.desc}</p>
          <p class="mt-4 border-t-2 border-ink/10 pt-4 text-sm font-bold">${a.when}</p>
          ${action}
        </div>
      </article>`;
  }

  function archiveRow(a) {
    return `<li class="reveal relative pb-8 pl-12"><span class="timeline-dot"></span>
      <h4 class="font-display text-xl font-extrabold">${a.title}</h4>
      <p class="text-sm font-bold text-brand">${a.when}</p>
      <p class="mt-1 text-ink/75">${a.desc}</p></li>`;
  }

  // <div data-activities data-season="invernali|estive|all" data-status="open,soon" data-limit="3">
  $$('[data-activities]').forEach((el) => {
    const season = el.dataset.season || 'all';
    const statuses = (el.dataset.status || 'open,soon').split(',');
    const limit = Number(el.dataset.limit) || Infinity;
    const list = DATA.activities
      .filter((a) => (season === 'all' || a.season === season) && statuses.includes(a.status))
      .slice(0, limit);
    el.innerHTML = list.length ? list.map(card).join('') : '<p class="text-ink/70">Nessuna attività in programma al momento.</p>';
  });

  // <div data-archive data-season="..."> -> timeline per anno
  $$('[data-archive]').forEach((el) => {
    const list = DATA.activities.filter((a) => a.season === el.dataset.season && a.status === 'closed')
      .sort((x, y) => (y.date || '').localeCompare(x.date || '')); // nello stesso anno: dalla più recente
    const years = [...new Set(list.map((a) => a.year))].sort((a, b) => b - a);
    el.innerHTML = years
      .map((y) => `
        <section class="mt-12 first:mt-0">
          <h3 class="reveal font-display text-6xl font-extrabold leading-none text-brand">${y}</h3>
          <ul class="timeline mt-6">${list.filter((a) => a.year === y).map(archiveRow).join('')}</ul>
        </section>`)
      .join('');
  });

  /* ---------- Documenti trasparenza ---------- */
  const docs = $('[data-documents]');
  if (docs) {
    docs.innerHTML = DATA.documents
      .map((d, i) => `
      <a href="${d.url}" target="_blank" rel="noopener" class="card reveal group flex items-center gap-5 p-5" data-delay="${i + 1}">
        <span class="font-display text-5xl font-extrabold leading-none text-brand">${d.year}</span>
        <span class="flex-1"><span class="block font-display text-lg font-extrabold">${d.title}</span>
          <span class="text-sm text-ink/65">PDF su Google Drive</span></span>
        <span class="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-sun text-lg transition group-hover:rotate-45" aria-hidden="true">↗</span>
      </a>`)
      .join('');
  }

  /* ---------- Galleria a mosaico ----------
     Ogni foto mantiene la propria proporzione (larghezza/altezza reali).
     Le foto arrivano da assets/js/gallery.js (generato da tools/genera-galleria.ps1).
     Se è vuoto, mostra segnaposto di proporzioni diverse. */
  const grid = $('[data-gallery]');
  if (grid) {
    const RATIOS = [[4, 3], [3, 4], [1, 1], [16, 9], [3, 2], [2, 3], [4, 5], [5, 4]];
    const real = Array.isArray(window.NOI_GALLERY) ? window.NOI_GALLERY : [];
    const all = real.length
      ? real
      : Array.from({ length: 40 }, (_, i) => {
          const [w, h] = RATIOS[(i * 5 + (i >> 2)) % RATIOS.length];
          return { src: '', w: w * 100, h: h * 100, album: '', alt: 'Segnaposto foto ' + (i + 1) };
        });

    const BATCH = 24;
    const status = $('[data-gallery-status]');
    const moreBtn = $('[data-gallery-more]');
    const filters = $('[data-gallery-filters]');
    const PH = [['#DCE5FF', '#C9D7FF'], ['#FFEFC2', '#FFE08A'], ['#FFDDD3', '#FFC2B2'], ['#D1F3EA', '#B2E8D8']];
    let list = all.slice();
    let shown = 0;
    let cols = [];
    let heights = [];
    let nCols = 0;

    const colCount = () => (grid.clientWidth < 560 ? 2 : grid.clientWidth < 900 ? 3 : 4);

    function tile(item, i) {
      const w = item.w || 4, h = item.h || 3;
      const inner = item.src
        ? `<img src="${item.src}" alt="${item.alt || ''}" width="${w}" height="${h}" loading="lazy" decoding="async" style="aspect-ratio:${w}/${h}">`
        : `<div class="ph-img" style="aspect-ratio:${w}/${h};--c1:${PH[i % 4][0]};--c2:${PH[i % 4][1]}" role="img" aria-label="${item.alt}"><span>Foto ${i + 1}</span></div>`;
      return `<button type="button" data-index="${i}" class="g-item reveal" aria-label="Apri foto ${i + 1}">${inner}</button>`;
    }

    function build(count) {
      nCols = colCount();
      grid.innerHTML = '';
      cols = Array.from({ length: nCols }, () => {
        const c = document.createElement('div');
        c.className = 'masonry-col';
        grid.appendChild(c);
        return c;
      });
      heights = new Array(nCols).fill(0);
      shown = 0;
      more(count);
    }

    function more(n = BATCH) {
      list.slice(shown, shown + n).forEach((item, k) => {
        const i = shown + k;
        const c = heights.indexOf(Math.min(...heights)); // colonna più bassa
        cols[c].insertAdjacentHTML('beforeend', tile(item, i));
        heights[c] += (item.h || 3) / (item.w || 4);
      });
      shown = Math.min(list.length, shown + n);
      if (status) status.textContent = `${shown} di ${list.length} foto`;
      if (moreBtn) moreBtn.classList.toggle('hidden', shown >= list.length);
      observeReveal();
    }

    // Filtri per album (sottocartelle di assets/img/gallery)
    const albums = [...new Set(all.map((g) => g.album).filter(Boolean))];
    if (filters && albums.length) {
      filters.innerHTML = ['Tutte', ...albums]
        .map((a, i) => `<button type="button" class="chip" data-album="${i ? a : ''}" aria-pressed="${i === 0}">${a}</button>`)
        .join('');
      filters.addEventListener('click', (e) => {
        const b = e.target.closest('[data-album]');
        if (!b) return;
        $$('[data-album]', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        list = b.dataset.album ? all.filter((g) => g.album === b.dataset.album) : all.slice();
        build(BATCH);
      });
    }

    build(BATCH);
    if (moreBtn) moreBtn.addEventListener('click', () => more());
    // Carica altre foto scorrendo (se il browser lo supporta)
    const sentinel = $('[data-gallery-sentinel]');
    if (sentinel && 'IntersectionObserver' in window) {
      new IntersectionObserver((en) => en[0].isIntersecting && shown < list.length && more(), { rootMargin: '800px' }).observe(sentinel);
    }
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => colCount() !== nCols && build(Math.max(shown, BATCH)), 200);
    });

    /* Lightbox */
    const lb = $('#lightbox');
    const stage = $('#lb-stage');
    const count = $('#lb-count');
    let idx = 0;
    const show = (n) => {
      idx = (n + list.length) % list.length;
      const g = list[idx];
      const w = g.w || 4, h = g.h || 3;
      stage.innerHTML = g.src
        ? `<img src="${g.src}" alt="${g.alt || ''}" class="max-h-[82vh] max-w-full rounded-lg border-2 border-paper object-contain">`
        : `<div class="ph-img rounded-lg border-2 border-paper" style="aspect-ratio:${w}/${h};width:min(90vw,calc(80vh*${w / h}))">Foto ${idx + 1}</div>`;
      count.textContent = `${idx + 1} / ${list.length}`;
    };
    const open = (n) => { show(n); lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('#lb-close').focus(); };
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    grid.addEventListener('click', (e) => { const b = e.target.closest('[data-index]'); if (b) open(Number(b.dataset.index)); });
    $('#lb-close').addEventListener('click', close);
    $('#lb-prev').addEventListener('click', () => show(idx - 1));
    $('#lb-next').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => (e.target === lb || e.target === stage) && close());
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  observeReveal();

  /* ---------- In evidenza: locandine delle attività con iscrizioni aperte ----------
     Prende da data.js le attività 'open' della stagione che hanno una locandina (campo poster).
     Le locandine "respirano" con un alone pulsante per attirare l'attenzione; clic = in grande. */
  const FEATURED = new Set(); // locandine in evidenza: non vengono ripetute nel cerchio
  $$('[data-featured]').forEach((sec) => {
    const list = DATA.activities.filter((a) => a.season === sec.dataset.season && a.status === 'open' && a.poster);
    if (!list.length) return; // niente da mostrare: la sezione resta nascosta
    list.forEach((a) => FEATURED.add(a.poster));
    sec.hidden = false;
    sec.innerHTML = `
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="evidenza" class="reveal font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Iscrizioni <span class="hl">aperte!</span></h2>
        <p class="reveal max-w-sm text-ink/75" data-delay="1">Tocca una locandina per vederla in grande, poi iscriviti con il pulsante.</p>
      </div>
      <div class="mt-12 grid gap-14 sm:grid-cols-2 ${list.length > 2 ? 'lg:grid-cols-3' : 'lg:mx-auto lg:max-w-4xl'}">
        ${list.map((a, i) => `
          <article class="feat reveal flex flex-col" data-delay="${(i % 3) + 1}" style="--d:${(i * 0.6).toFixed(1)}s">
            <button type="button" class="feat-poster" data-big="${a.poster}" data-title="${a.title}" aria-label="Ingrandisci la locandina: ${a.title}">
              <span class="feat-badge sticker bg-mint">Iscrizioni aperte</span>
              <img src="${a.poster}" alt="${a.title}" loading="eager">
            </button>
            <h3 class="mt-6 font-display text-2xl font-extrabold leading-tight">${a.title}</h3>
            <p class="mb-4 mt-1 text-sm font-bold text-brand">${a.when}</p>
            ${a.formUrl ? `<a href="${a.formUrl}" target="_blank" rel="noopener" class="btn btn-blue mt-auto w-full">Iscriviti ${ARROW}</a>` : ''}
          </article>`).join('')}
      </div>`;

    observeReveal(); // attiva l'animazione di comparsa dei nuovi elementi

    // Locandina in grande (stessa finestra delle altre locandine)
    const box = document.createElement('figure');
    box.className = 'poster-box';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Locandina ingrandita');
    box.innerHTML = '<button type="button" class="poster-close" aria-label="Chiudi">×</button><div><img alt=""><figcaption></figcaption></div>';
    document.body.appendChild(box);
    const big = box.querySelector('img'), cap = box.querySelector('figcaption'), closeBtn = box.querySelector('.poster-close');
    let opener = null;
    const close = () => { box.hidden = true; document.body.style.overflow = ''; opener?.focus({ preventScroll: true }); };
    sec.addEventListener('click', (e) => {
      const b = e.target.closest('[data-big]');
      if (!b) return;
      opener = b;
      big.src = b.dataset.big; big.alt = b.dataset.title; cap.textContent = b.dataset.title;
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      box.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
      big.animate([{ transform: 'scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
      closeBtn.focus({ preventScroll: true });
    });
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box || e.target === box.firstElementChild?.nextElementSibling) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !box.hidden) close(); });
  });

  /* ---------- Locandine in un carosello circolare 3D (attivita-invernali / attivita-estive) ----------
     Dati in assets/js/locandine.js. Le locandine girano su un anello visto un po' dall'alto:
     davanti grandi e luminose, dietro piccole, più in alto e oscurate (sempre rivolte verso chi guarda).
     Si ferma al passaggio del mouse; frecce e trascinamento per girarlo a mano; clic = locandina in grande. */
  $$('[data-posters]').forEach((wrap) => {
    const items = (((window.NOI_LOCANDINE || {})[wrap.dataset.season]) || [])
      .filter((it) => !FEATURED.has(it.src)) // quelle in evidenza stanno sopra, non nel cerchio
      .slice().sort((x, y) => (y.data || '').localeCompare(x.data || '')); // dalla più recente
    if (!items.length) { wrap.closest('section')?.remove(); return; }
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = items.length, STEP = (Math.PI * 2) / n;

    wrap.classList.add('orbit');
    const stage = document.createElement('div');
    stage.className = 'orbit-stage';
    const cards = items.map((it, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'poster orbit-card';
      b.dataset.i = String(i);
      b.setAttribute('aria-label', 'Ingrandisci la locandina: ' + it.title);
      const img = document.createElement('img');
      img.src = it.src; img.alt = it.title; img.width = it.w; img.height = it.h; img.decoding = 'async';
      b.appendChild(img);
      stage.appendChild(b);
      return b;
    });
    const ctrl = document.createElement('div');
    ctrl.className = 'orbit-ctrl';
    ctrl.innerHTML = '<button type="button" class="btn !h-12 !w-12 !p-0 text-2xl" data-dir="-1" aria-label="Locandina precedente">‹</button>'
      + '<button type="button" class="btn !h-12 !w-12 !p-0 text-2xl" data-dir="1" aria-label="Locandina successiva">›</button>';
    wrap.append(stage, ctrl);

    // Stato dell'anello. "pos" è misurata in locandine: pos = 3 significa che davanti c'è la locandina 3.
    // L'anello ha al massimo SLOTS posti: se le locandine sono di più, quelle in fondo (dietro)
    // si oscurano del tutto e lì vengono scambiate con le successive, così l'anello cicla su tutte.
    const SLOTS = Math.min(n, 14);
    const SLOT = (Math.PI * 2) / SLOTS;   // angolo tra due posti
    const HIDE = n > SLOTS ? 2.2 : 0;     // posti in fondo in cui le locandine svaniscono
    let pos = 0;
    let tween = null;       // rotazione guidata (clic, frecce, focus): { from, to, t0, dur }
    let pendingOpen = null; // locandina da aprire appena arriva davanti
    // Sul telefono niente cerchio: striscia da scorrere col dito
    const phoneMQ = matchMedia('(max-width: 639px)');
    let phone = phoneMQ.matches;
    let hover = false, paused = false, holdUntil = 0;
    let hoverIdx = -1;                        // locandina sotto il puntatore
    const hoverAmt = new Array(n).fill(0);    // 0..1: quanto è sollevata (animato)
    let R = 600, P = 1000, H = 400, baseY = 0, lift = 0;
    const SPEED = 1 / 3.2; // gira da solo: una locandina ogni ~3 secondi

    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    // Telefono: la striscia scorre da sola in modo continuo (come un nastro), lenta e costante.
    // Le locandine sono ripetute in coda (copie nascoste ai lettori di schermo) così il giro non ha salti.
    const clones = cards.map((c) => {
      const k = c.cloneNode(true);
      k.classList.add('orbit-clone');
      k.setAttribute('aria-hidden', 'true');
      k.tabIndex = -1;
      stage.appendChild(k);
      return k;
    });
    const STRIP_SPEED = 38;  // pixel al secondo
    let stripX = 0;          // posizione "vera" (con i decimali) del nastro
    let stripHold = performance.now() + 1200;
    let stripAnim = null;    // spostamento animato con le frecce
    const stripPause = (ms) => { stripHold = Math.max(stripHold, performance.now() + ms); };
    const setW = () => clones[0].offsetLeft - cards[0].offsetLeft; // larghezza di un giro completo
    const wrapX = (x) => { const w = setW(); return w > 0 ? ((x % w) + w) % w : x; };
    const stripGo = (dir) => {
      const step = cards[0].offsetWidth + 16;
      stripX = stage.scrollLeft;
      stripAnim = { from: stripX, to: stripX + dir * step, t0: performance.now(), dur: 520 };
    };
    const stripAuto = (now, dt) => {
      if (!box.hidden) return;
      if (stripAnim) {
        const t = Math.min(1, (now - stripAnim.t0) / stripAnim.dur);
        stripX = wrapX(stripAnim.from + (stripAnim.to - stripAnim.from) * ease(t));
        stage.scrollLeft = stripX;
        if (t >= 1) stripAnim = null;
        return;
      }
      if (now < stripHold) { stripX = stage.scrollLeft; return; } // il dito comanda: seguo dove l'ha lasciata
      const r = stage.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return; // fuori dallo schermo: inutile scorrere
      stripX = wrapX(stripX + STRIP_SPEED * dt);
      stage.scrollLeft = stripX;
    };
    ['touchstart', 'pointerdown', 'wheel'].forEach((ev) => stage.addEventListener(ev, () => {
      stripPause(4000);
      stripAnim = null; // il dito vince sull'animazione
    }, { passive: true }));
    // Scorrendo a mano oltre la fine (o prima dell'inizio) si ricomincia senza salti
    stage.addEventListener('scroll', () => {
      if (!phone || stripAnim) return;
      const w = setW();
      if (w > 0 && (stage.scrollLeft >= w + 1 || stage.scrollLeft < 0)) stage.scrollLeft = wrapX(stage.scrollLeft);
    }, { passive: true });
    const applyMode = () => {
      phone = phoneMQ.matches;
      wrap.classList.toggle('orbit-strip', phone);
      if (phone) {
        stage.style.height = '';
        cards.forEach((c) => { c.style.transform = ''; c.style.filter = ''; c.style.zIndex = ''; c.style.opacity = ''; c.style.pointerEvents = ''; c.style.visibility = ''; c.tabIndex = 0; c.classList.remove('is-front'); });
      }
    };

    // Fattore di prospettiva per un angolo th (1 davanti, più piccolo dietro)
    const persp = (th) => P / (P - R * (Math.cos(th) - 1));
    const layout = () => {
      if (phone) return;
      H = cards[0].querySelector('img').getBoundingClientRect().height || 400;
      const maxW = Math.max(...cards.map((c) => c.offsetWidth || H * 0.84));
      const W = stage.clientWidth;
      const margin = Math.max(24, W * 0.05); // distanza minima dai bordi
      // Raggio "naturale": le locandine davanti si toccano appena
      R = (maxW * 1.08) / (2 * Math.sin(SLOT / 2));
      // ...ma l'anello (bordo esterno delle locandine laterali compreso) deve restare dentro i margini.
      // Con la telecamera a distanza 2.2R la prospettiva dipende solo dall'angolo: cerco il punto più largo.
      let g = 0, h = 1;
      for (let th = 0.3; th < 2.4; th += 0.02) {
        const k = 2.2 / (3.2 - Math.cos(th));
        if (k * Math.sin(th) > g) { g = k * Math.sin(th); h = k; }
      }
      R = Math.min(R, (W / 2 - margin - (h * maxW) / 2) / g);
      R = Math.max(R, maxW * 0.6);
      P = R * 2.2;          // distanza della "telecamera"
      const narrow = W < 900;
      lift = H * (narrow ? 0.95 : 0.85); // quanto salgono le locandine dietro (così si vedono sopra quelle davanti)
      const SH = H * (narrow ? 1.8 : 1.7);
      stage.style.height = SH + 'px';
      baseY = SH - H / 2 - 12;
    };

    // Distanza (in locandine, con segno) tra la locandina i e quella davanti, sul giro più corto
    const rel = (i) => { let d = (i - pos) % n; if (d < -n / 2) d += n; if (d >= n / 2) d -= n; return d; };
    const render = () => {
      if (phone) return;
      const edge = SLOTS / 2;
      cards.forEach((c, i) => {
        const d = rel(i);
        const th = d * SLOT;
        const cos = Math.cos(th), sin = Math.sin(th);
        const z = R * (cos - 1);                    // 0 davanti, -2R dietro
        const s = persp(th);
        const x = R * sin * s;
        const y = baseY - lift * (1 - cos) / 2;
        const f = (cos + 1) / 2;                    // 1 davanti, 0 dietro
        // Oltre i posti disponibili la locandina sparisce in fondo (dove avviene lo scambio):
        // si allontana — più piccola, più in alto, sfocata e scura — e svanisce; quelle nuove fanno il contrario.
        const raw = HIDE ? Math.max(0, Math.min(1, (edge - Math.abs(d)) / HIDE)) : 1;
        const vis = raw * raw * (3 - 2 * raw);      // smoothstep: entra ed esce senza scatti
        c.style.visibility = vis <= 0.001 ? 'hidden' : '';
        if (vis <= 0.001) { c.tabIndex = -1; c.classList.remove('is-front'); return; }
        const away = 1 - vis;
        const up = hoverAmt[i];                     // si alza un po' dall'anello sotto il puntatore
        const sc = s * (1 - 0.6 * away) * (1 + 0.05 * up);
        const yy = y - away * H * 0.2 - up * H * 0.07 * s;
        c.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${yy.toFixed(1)}px) scale(${sc.toFixed(4)})`;
        c.style.zIndex = String(Math.round(1000 + z + up * 40));
        c.classList.toggle('is-hover', up > 0.5);
        // si dissolvono nello sfondo (trasparenza) invece di diventare grigie
        c.style.filter = `brightness(${Math.min(1, (0.28 + 0.72 * f * f) * (1 + 0.6 * away) + up * 0.45).toFixed(3)}) saturate(${((0.5 + 0.5 * f) * (1 - 0.5 * away)).toFixed(3)})`
          + (away > 0.02 ? ` blur(${(away * 4).toFixed(2)}px)` : '');
        c.style.opacity = vis < 1 ? Math.pow(vis, 1.6).toFixed(3) : '';
        c.style.pointerEvents = vis < 0.6 ? 'none' : '';
        c.classList.toggle('is-front', Math.abs(d) < 0.25);
        c.tabIndex = f > 0.5 && vis > 0.6 ? 0 : -1;
      });
    };

    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (phone) { stripAuto(now, dt); requestAnimationFrame(frame); return; }
      if (!box.hidden) { requestAnimationFrame(frame); return; }
      if (tween) {
        const t = Math.min(1, (now - tween.t0) / tween.dur);
        pos = tween.from + (tween.to - tween.from) * ease(t);
        if (t >= 1) {
          pos = tween.to; tween = null;
          if (pendingOpen !== null) { const c = cards[pendingOpen]; pendingOpen = null; render(); open(c); }
        }
      } else if (!hover && !paused && !dragging && now > holdUntil) {
        pos += SPEED * dt;
      }
      pick();
      for (let i = 0; i < n; i++) hoverAmt[i] += ((i === hoverIdx ? 1 : 0) - hoverAmt[i]) * Math.min(1, dt * 14);
      render();
      requestAnimationFrame(frame);
    };

    // Rotazione guidata verso una posizione: breve e con durata fissa (non rallenta all'infinito)
    const spinTo = (to) => {
      const dist = Math.abs(to - pos);
      if (dist < 0.01) { pos = to; tween = { from: to, to, t0: performance.now(), dur: 1 }; return; }
      tween = { from: pos, to, t0: performance.now(), dur: Math.min(700, 260 + dist * 70) };
      holdUntil = performance.now() + 4000; // resta davanti 4 secondi prima di ripartire
    };
    // Porta davanti la locandina i (giro più corto)
    const goTo = (i) => spinTo(pos + rel(i));
    const nearest = () => ((Math.round(pos) % n) + n) % n;
    ctrl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-dir]');
      if (!b) return;
      pendingOpen = null;
      if (phone) { stripPause(4000); stripGo(Number(b.dataset.dir)); return; }
      const cur = tween ? tween.to : Math.round(pos);
      spinTo(cur + Number(b.dataset.dir));
    });
    stage.addEventListener('focusin', (e) => {
      const c = e.target.closest('.orbit-card');
      if (c && !phone && !c.classList.contains('is-front') && !dragging) goTo(Number(c.dataset.i));
    });
    // Si ferma solo tenendo il mouse sulla locandina davanti
    // Posizione del puntatore: a ogni fotogramma guardo quale locandina c'è sotto,
    // anche se il mouse è fermo e l'anello gira
    let mouse = null;
    stage.addEventListener('mousemove', (e) => { mouse = { x: e.clientX, y: e.clientY }; });
    const pick = () => {
      if (!mouse || dragging) { hoverIdx = -1; hover = false; return; }
      const el = document.elementFromPoint(mouse.x, mouse.y);
      const c = el && el.closest('.orbit-card:not(.orbit-clone)');
      hoverIdx = c && stage.contains(c) ? Number(c.dataset.i) : -1;
      hover = !!(c && c.classList.contains('is-front'));
    };
    stage.addEventListener('mouseleave', () => { mouse = null; hover = false; hoverIdx = -1; });

    // Trascinamento (mouse o dito) per far girare l'anello
    let dragging = false, dragX = 0, dragP = 0, moved = false;
    stage.addEventListener('pointerdown', (e) => {
      if (phone) return;
      dragging = true; moved = false; dragX = e.clientX; dragP = pos; tween = null; pendingOpen = null;
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragX;
      if (Math.abs(dx) > 6) moved = true;
      pos = dragP - dx / (R * SLOT); // un passo = distanza tra due locandine davanti
    });
    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      if (moved) spinTo(Math.round(pos));
    });

    applyMode(); layout(); render();
    window.addEventListener('resize', () => { applyMode(); layout(); render(); });
    cards.forEach((c) => c.querySelector('img').addEventListener('load', () => { layout(); render(); }, { once: true }));
    requestAnimationFrame(frame);

    // Finestra per la locandina ingrandita
    const box = document.createElement('figure');
    box.className = 'poster-box';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Locandina ingrandita');
    box.innerHTML = '<button type="button" class="poster-close" aria-label="Chiudi">×</button><div><img alt=""><figcaption></figcaption></div>';
    document.body.appendChild(box);
    const big = box.querySelector('img'), cap = box.querySelector('figcaption'), closeBtn = box.querySelector('.poster-close');
    let opener = null;
    let busy = false;

    // Trasformazione che porta l'immagine grande sopra la cella (FLIP: First, Last, Invert, Play)
    const fromCell = (cell) => {
      // Area in cui la locandina è davvero disegnata nella cella (object-fit: contain)
      const im = cell.querySelector('img'), c = im.getBoundingClientRect();
      const k = Math.min(c.width / (im.naturalWidth || im.width), c.height / (im.naturalHeight || im.height));
      const w = (im.naturalWidth || im.width) * k, h = (im.naturalHeight || im.height) * k;
      const a = { left: c.left + (c.width - w) / 2, top: c.top + (c.height - h) / 2, width: w, height: h };
      const b = big.getBoundingClientRect();
      return `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
    };
    const EASE = 'cubic-bezier(.2,.8,.2,1)';

    const open = (b) => {
      const it = items[Number(b.dataset.i)];
      opener = b;
      paused = true;
      big.src = it.src; big.alt = it.title; big.width = it.w; big.height = it.h;
      cap.textContent = it.title;
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus({ preventScroll: true });
      if (still) return;
      busy = true;
      b.style.visibility = 'hidden'; // la locandina "esce" dalla cella
      big.style.transformOrigin = '0 0';
      const t = fromCell(b);
      box.animate([{ backgroundColor: 'rgb(20 33 61 / 0)' }, { backgroundColor: 'rgb(20 33 61 / .94)' }], { duration: 450, easing: 'ease-out' });
      [cap, closeBtn].forEach((el) => el.animate([{ opacity: 0 }, { opacity: 0, offset: .6 }, { opacity: 1 }], { duration: 450 }));
      big.animate([{ transform: t }, { transform: 'none' }], { duration: 450, easing: EASE });
      setTimeout(() => { busy = false; }, 470); // timer al posto di .finished: funziona anche se il browser sospende le animazioni
    };

    const close = () => {
      if (box.hidden || busy) return;
      const done = () => {
        box.hidden = true;
        if (opener) opener.style.visibility = '';
        paused = false;
        holdUntil = performance.now() + 1500;
        stripPause(2500);
        document.body.style.overflow = '';
        opener?.focus({ preventScroll: true });
        busy = false;
      };
      if (still || !opener) return done();
      busy = true;
      const t = fromCell(opener); // la striscia è ferma, quindi la cella è ancora lì
      box.animate([{ backgroundColor: 'rgb(20 33 61 / .94)' }, { backgroundColor: 'rgb(20 33 61 / 0)' }], { duration: 380, easing: 'ease-in', fill: 'forwards' });
      [cap, closeBtn].forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0, offset: .3 }, { opacity: 0 }], { duration: 380, fill: 'forwards' }));
      big.animate([{ transform: 'none' }, { transform: t }], { duration: 380, easing: EASE, fill: 'forwards' });
      setTimeout(() => {
        done();
        box.getAnimations({ subtree: true }).forEach((a) => a.cancel()); // pronto per la prossima apertura
      }, 400);
    };

    stage.addEventListener('click', (e) => {
      const b = e.target.closest('.orbit-card');
      if (!b || busy || moved) return;
      if (b.classList.contains('orbit-clone') && !phone) return;
      const i = Number(b.dataset.i);
      if (phone) { open(b); return; }
      // Qualunque locandina: l'anello la porta davanti al centro e poi si apre in grande
      pendingOpen = i;
      goTo(i);
    });
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box || e.target === box.firstElementChild?.nextElementSibling) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !box.hidden) close(); });
  });
})();
