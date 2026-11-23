# Sito NOI Monfalcone APS

Sito statico in **HTML + TailwindCSS + JavaScript puro**, senza servizi esterni per stile e caratteri. Nessuna build, nessun Node.

## Anteprima in locale
- XAMPP: copia la cartella in `C:\xampp\htdocs\` e apri http://localhost/noimonfalcone/
- Oppure apri `index.html` nel browser (serve connessione per font, Tailwind e mappa).

## Struttura
```
index.html, chi-siamo.html, attivita-*.html, gruppi.html, iscrizioni.html,
galleria.html, sostienici.html (5x1000), trasparenza.html, contatti.html, privacy.html
assets/
  css/style.css          stile "carta e inchiostro": bottoni, card, adesivi, mosaico
  js/tailwind-config.js  colori e font del brand
  js/data.js             contenuti aggiornabili (attività, documenti, contatti)
  js/gallery.js          GENERATO: elenco foto della galleria
  js/components.js       header e footer condivisi (menu)
  js/main.js             comportamenti e rendering
  img/logo.svg           logo (segnaposto)
  img/gallery/           LE TUE FOTO (anche in sottocartelle = album)
tools/
  genera-galleria.bat    aggiorna la galleria (doppio clic)
```

## Come si aggiorna
- **Nuova attività / chiusura iscrizioni**: `assets/js/data.js`, array `activities` (`status`: `open`, `soon`, `closed`). Con `closed` finisce nell'archivio.
- **Documenti trasparenza**: array `documents`. **Indirizzo, telefono**: oggetto `site`.
- **Gruppi e catechismo** (giorni, orari, descrizioni): `gruppi.html`.
- **Logo**: sostituisci `assets/img/logo.svg`.
- **Colori**: `assets/js/tailwind-config.js` e le variabili `--ink`, `--paper`, ... in `assets/css/style.css`.

## Galleria (quante foto vuoi)
1. Copia le foto in `assets/img/gallery/`. Le **sottocartelle diventano album** filtrabili
   (es. `gallery/Estate-Ragazzi-2025/foto1.jpg`).
2. Fai doppio clic su `tools/genera-galleria.bat`: legge le dimensioni reali di ogni foto.
3. Ricarica la pagina.

Il mosaico rispetta la proporzione originale di ogni foto (verticali, orizzontali, panoramiche)
e carica le immagini a blocchi di 24 mentre si scorre, quindi regge centinaia di foto.
Consiglio: ridimensiona le foto a ~1600 px sul lato lungo (JPG, qualità 80%) prima di caricarle.
Finché la cartella è vuota viene mostrato un mosaico di segnaposto.

## Da completare
- [x] Indirizzo (via dei Cipressi 6), telefono e orari: in `assets/js/data.js` (oggetto `site`), `contatti.html`, `index.html`
- [ ] Informativa privacy: revisione da parte dell'associazione
- [ ] Verifica etichette dei vecchi moduli (es. "Campo medie 2025")
- [ ] Ogni anno: archiviare le attività concluse (`status: 'closed'`) e aggiornare i titoli "Stagione" / "Estate"

## SEO e condivisione
- Anteprime social (Open Graph) in ogni pagina, immagine `assets/img/og-image.jpg` (1200×630).
- Se il dominio cambia, sostituisci `https://www.noimonfalcone.org/` in tutte le pagine, in `sitemap.xml` e `robots.txt`.
- `404.html`: GitHub Pages la usa in automatico per le pagine inesistenti.

## Pubblicazione
Il sito è pubblicato con **GitHub Pages** dalla repository `NoiMonfalcone/noimonfalcone-sito` (branch `main`, cartella principale) sul dominio **www.noimonfalcone.org** (file `CNAME`).
Ogni push su `main` aggiorna il sito in un paio di minuti. I DNS del dominio sono su Cloudflare.
Lo stile di Tailwind è già generato in `assets/css/tailwind.css` (nessun servizio esterno).
Se aggiungi classi nuove alle pagine, rigeneralo dalla cartella `tools/`:
`cd tools && npx tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.input.css -o ../assets/css/tailwind.css --minify`
(colori e font del brand sono in `tools/tailwind.config.js`).
