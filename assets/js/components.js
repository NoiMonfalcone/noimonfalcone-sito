/* Componenti condivisi: header e footer.
   Si modificano qui una volta sola e valgono per tutte le pagine. */
(function () {
  const D = window.NOI_DATA.site;
  const page = document.body.dataset.page || '';

  const NAV = [
    {
      label: 'Attività', key: 'attivita',
      children: [
        { label: 'Attività invernali', href: 'attivita-invernali.html', key: 'invernali', desc: 'Doposcuola, laboratori ed eventi' },
        { label: 'Attività estive', href: 'attivita-estive.html', key: 'estive', desc: 'Estate Ragazzi, campi e pre-scuola' },
        { label: 'Iscrizioni', href: 'iscrizioni.html', key: 'iscrizioni', desc: 'Tutti i moduli in un unico posto' },
      ],
    },
    {
      label: 'Gruppi', key: 'gruppi',
      children: [
        { label: 'Catechismo', href: 'gruppi.html#catechismo', key: 'gruppi', desc: 'Prima confessione, comunione e cresima' },
        { label: 'ControVento', href: 'gruppi.html#controvento', key: 'gruppi', desc: '1ª–3ª media · verso la cresima' },
        { label: 'ClanDestino', href: 'gruppi.html#clandestino', key: 'gruppi', desc: '1ª–5ª superiore' },
        { label: 'FightClub', href: 'gruppi.html#fightclub', key: 'gruppi', desc: 'Universitari e lavoratori' },
      ],
    },
    { label: 'Chi siamo', href: 'chi-siamo.html', key: 'chi-siamo' },
    { label: 'Galleria', href: 'galleria.html', key: 'galleria' },
    { label: '5x1000', href: 'sostienici.html', key: 'sostienici' },
    { label: 'Trasparenza', href: 'trasparenza.html', key: 'trasparenza' },
    { label: 'Contatti', href: 'contatti.html', key: 'contatti' },
  ];

  const isActive = (item) => item.key === page || (item.children && item.children.some((c) => c.key === page));
  const cur = (item) => (isActive(item) ? ' aria-current="page"' : '');
  const chevron = '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.5 7.5 10 12l4.5-4.5-1.1-1.1L10 9.8 6.6 6.4z"/></svg>';

  const desktopItem = (item) => {
    if (!item.children) {
      return `<li><a class="nav-link" href="${item.href}"${cur(item)}>${item.label}</a></li>`;
    }
    return `
      <li class="has-dropdown relative">
        <button type="button" class="nav-link flex items-center gap-1" aria-haspopup="true"${cur(item)}>${item.label}${chevron}</button>
        <div class="dropdown absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
          <ul class="card overflow-hidden p-2">
            ${item.children.map((c) => `<li><a href="${c.href}" class="block rounded-lg px-4 py-3 transition hover:bg-sun-100">
                <span class="block font-bold">${c.label}</span>
                <span class="block text-sm text-ink/65">${c.desc}</span></a></li>`).join('')}
          </ul>
        </div>
      </li>`;
  };

  const mobileItem = (item) => {
    if (!item.children) {
      return `<li><a class="block border-b-2 border-ink/10 px-1 py-3 font-display text-2xl font-extrabold" href="${item.href}"${cur(item)}>${item.label}</a></li>`;
    }
    return `
      <li class="border-b-2 border-ink/10 pb-2">
        <p class="px-1 pt-3 text-xs font-extrabold uppercase tracking-widest text-brand">${item.label}</p>
        <ul>${item.children.map((c) => `<li><a class="block px-1 py-2 font-display text-2xl font-extrabold" href="${c.href}">${c.label}</a></li>`).join('')}</ul>
      </li>`;
  };

  const header = `
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sun focus:px-4 focus:py-2 focus:font-bold">Vai al contenuto</a>
    <header id="header" class="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="index.html" class="flex items-center" aria-label="NOI Monfalcone – Home">
          <img src="assets/img/logo-marchio.png" alt="" class="h-12 w-auto" width="62" height="48">
          <span class="ml-2 font-display text-xl font-extrabold leading-none text-[#0047AB]">Noi<br><span class="text-base font-bold tracking-wide">Monfalcone</span></span>
        </a>
        <nav class="hidden items-center gap-8 lg:flex" aria-label="Navigazione principale">
          <ul class="flex items-center gap-7">${NAV.map(desktopItem).join('')}</ul>
          <a href="iscrizioni.html" class="btn btn-sun !py-2">Iscriviti</a>
        </nav>
        <button id="menu-btn" type="button" class="btn btn-sun !h-11 !w-11 !p-0 lg:hidden" aria-label="Apri il menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg id="icon-open" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          <svg id="icon-close" class="hidden h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <div id="mobile-menu" class="hidden max-h-[calc(100vh-72px)] overflow-y-auto border-t-2 border-ink bg-paper lg:hidden">
        <nav class="mx-auto max-w-7xl px-5 pb-8 pt-2" aria-label="Navigazione mobile">
          <ul>${NAV.map(mobileItem).join('')}</ul>
          <a href="iscrizioni.html" class="btn btn-sun mt-6 w-full">Iscriviti alle attività</a>
        </nav>
      </div>
    </header>`;

  const icon = {
    ig: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.2 5.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>',
    fb: '<path d="M13.5 22v-8h2.7l.5-3.2h-3.2V8.7c0-.9.4-1.7 1.8-1.7h1.5V4.2S15.9 4 14.7 4C12.2 4 10.5 5.5 10.5 8.4v2.4H7.8V14h2.7v8h3z"/>',
    mail: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.5 7H4v.5l8 5.5 8-5.5V7h-.5L12 12.2z"/>',
  };
  const social = (href, path, label) =>
    `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} aria-label="${label}" class="grid h-11 w-11 place-items-center rounded-full border-2 border-paper/70 text-paper transition hover:-translate-y-1 hover:border-sun hover:bg-sun hover:text-ink"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">${path}</svg></a>`;

  const footer = `
    <footer class="tone-ink scallop-top relative mt-24">
      <div class="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <p class="font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Ci vediamo<br>alla <span class="word">Marcelliana!</span></p>
        <div class="mt-14 grid gap-10 border-t-2 border-paper/20 pt-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="assets/img/logo-bianco.png" alt="NOI Monfalcone APS" class="h-32 w-32" width="128" height="128">
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">Associazione di promozione sociale per bambini, ragazzi e famiglie di Monfalcone.</p>
            <div class="mt-5 flex gap-3">
              ${social(D.instagram, icon.ig, 'Instagram')}
              ${social(D.facebook, icon.fb, 'Facebook')}
              ${social('mailto:' + D.email, icon.mail, 'Email')}
            </div>
          </div>
          <div>
            <h2 class="text-sm font-extrabold uppercase tracking-widest text-sun">Attività</h2>
            <ul class="mt-4 space-y-2 font-semibold">
              <li><a class="hover:text-sun" href="attivita-invernali.html">Attività invernali</a></li>
              <li><a class="hover:text-sun" href="attivita-estive.html">Attività estive</a></li>
              <li><a class="hover:text-sun" href="gruppi.html">Gruppi e catechismo</a></li>
              <li><a class="hover:text-sun" href="iscrizioni.html">Iscrizioni</a></li>
              <li><a class="hover:text-sun" href="galleria.html">Galleria</a></li>
            </ul>
          </div>
          <div>
            <h2 class="text-sm font-extrabold uppercase tracking-widest text-sun">L'associazione</h2>
            <ul class="mt-4 space-y-2 font-semibold">
              <li><a class="hover:text-sun" href="chi-siamo.html">Chi siamo</a></li>
              <li><a class="hover:text-sun" href="sostienici.html">5x1000</a></li>
              <li><a class="hover:text-sun" href="trasparenza.html">Trasparenza</a></li>
              <li><a class="hover:text-sun" href="contatti.html">Contatti</a></li>
            </ul>
          </div>
          <div>
            <h2 class="text-sm font-extrabold uppercase tracking-widest text-sun">Contatti</h2>
            <ul class="mt-4 space-y-2 text-paper/85">
              <li>${D.place}<br>${D.street}, ${D.cap} ${D.city} (${D.province})</li>
              <li><a class="font-semibold hover:text-sun" href="tel:${D.phone.replace(/\s/g, '')}">${D.phoneDisplay}</a></li>
              <li><a class="font-semibold hover:text-sun" href="mailto:${D.email}">${D.email}</a></li>
              <li>PEC <a class="font-semibold hover:text-sun" href="mailto:${D.pec}">${D.pec}</a></li>
              <li>C.F. ${D.codiceFiscale}</li>
            </ul>
          </div>
        </div>
        <div class="mt-12 flex flex-col gap-2 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© <span id="year"></span> ${D.name}</p>
          <p><a class="hover:text-sun" href="privacy.html">Privacy e cookie</a></p>
        </div>
      </div>
    </footer>
    <div id="toast" role="status" aria-live="polite"></div>`;

  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
