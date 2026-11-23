/* ==========================================================
   DATI DEL SITO - modifica qui per aggiornare i contenuti.
   Nessun altro file va toccato per aggiungere o chiudere
   un'attività, cambiare i contatti o i documenti.

   date: 'AAAA-MM-GG' -> ordina l'archivio dentro lo stesso anno
   status: 'open'   -> iscrizioni aperte (badge verde + pulsante)
   poster: '...'    -> (facoltativo) locandina: se l'attività è 'open' viene messa
                       in evidenza in cima alla pagina delle attività
           'soon'   -> in arrivo
           'closed' -> concluso (finisce nell'archivio)
   ========================================================== */
window.NOI_DATA = {
  site: {
    name: 'NOI Monfalcone APS',
    email: 'noimonfalcone@gmail.com',
    pec: 'noimonfalcone@pec.it',
    instagram: 'https://www.instagram.com/noimonfalcone/',
    facebook: 'https://www.facebook.com/oratoriodiffuso/',
    codiceFiscale: '90029830313',
    // Fonti: locandine ufficiali 2026 e comfortzoneatelier.org/marcelliana
    place: 'Casa della Gioventù B.V. Marcelliana',
    street: 'Via dei Cipressi 6',
    cap: '34074',
    city: 'Monfalcone',
    province: 'GO',
    address: 'Casa della Gioventù B.V. Marcelliana · Via dei Cipressi 6, 34074 Monfalcone (GO)',
    phone: '+39 347 094 8528',
    phoneDisplay: '347 094 8528',
    mapsQuery: 'Via dei Cipressi 6, 34074 Monfalcone GO',
    comfortZone: 'https://comfortzoneatelier.org/marcelliana/',
  },

  activities: [
    /* ---------- INVERNALI ---------- */
    {
      id: 'fuoriclasse-2026', season: 'invernali', year: 2026, status: 'open',
      title: 'Pomeriggi FuoriClasse',
      desc: 'Il doposcuola di NOI Monfalcone: compiti, gioco e tempo insieme in un ambiente accogliente.',
      when: 'Martedì, mercoledì e venerdì · 15:30–17:30',
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe4LC0vBCD9U2Dwn0c_LLEMl8VryPle3eZ8f9xG2E9OnT4O_Q/viewform',
      formLabel: 'Pomeriggio Da Noi',
      poster: 'assets/img/locandine/invernali/riapertura-2026-2027.jpg', // locandina in evidenza
    },
    {
      id: 'doc-2026', season: 'invernali', year: 2026, status: 'open',
      title: 'D.O.C. – Destinazione Ostinata e Contraria',
      desc: 'Un gruppo per ragazzi nati dal 2009 al 2012 che parla di giustizia, diritti e lotta alle mafie, incontrando realtà locali e nazionali. Gratuito (con tesseramento al circolo NOI), insieme all\'Unione degli Studenti.',
      when: 'Ogni sabato dal 7 novembre · 14:00–15:30',
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSee7KvY3C5-7PMKB03_aOC7HQOUqBdKvexY2wVlqXhxRQnSWg/viewform?usp=dialog',
      formLabel: 'D.O.C. 2026',
      poster: 'assets/img/locandine/invernali/doc-in-direzione-ostinata-e-contraria.jpg',
    },
    /* ---------- INVERNALI: archivio (date dalle locandine) ---------- */
    {
      id: 'festa-inizio-2026', season: 'invernali', year: 2026, status: 'closed', date: '2026-10-01',
      title: 'Festa di inizio attività mostruosa',
      desc: 'Si riparte con una grande festa: giochi, musica e tanti amici per aprire insieme la nuova stagione.',
      when: 'Ottobre 2026',
    },
    {
      id: 'scacchi-2026', season: 'invernali', year: 2026, status: 'closed', date: '2026-04-13',
      title: 'Laboratorio di scacchi',
      desc: 'Il gioco da tavolo più famoso al mondo: per imparare o sfidare nuovi amici. Per ragazzi e ragazze nati dal 2015 al 2009.',
      when: 'Ogni lunedì dal 13 aprile 2026 · 16:30–18:00',
    },
    {
      id: 'serata-marzo-2026', season: 'invernali', year: 2026, status: 'closed', date: '2026-03-06',
      title: 'Serata con NOI e ClanDestino',
      desc: 'Una serata diversa con giochi e pizza tutti insieme, e l\'invito per chi è nato nel 2012 a entrare nel gruppo animatori ClanDestino.',
      when: 'Venerdì 6 marzo 2026 · 19:00–22:30',
    },
    {
      id: 'carnevale-2026', season: 'invernali', year: 2026, status: 'closed', date: '2026-02-15',
      title: 'Carnevale 2026',
      desc: 'Festa in maschera per tutti: per la scuola primaria il pomeriggio alla Casa della Gioventù con balli, giochi e sfilata delle maschere; per i ragazzi delle medie la serata con giochi a premi.',
      when: 'Domenica 15 febbraio 2026 · 16:00–18:00 e 20:00–22:30',
    },
    {
      id: 'xmas-2025', season: 'invernali', year: 2025, status: 'closed', date: '2025-12-19',
      title: 'Pomeriggio con NOI – Xmas Edition',
      desc: 'Pomeriggio di Natale allo Spazio Aggregativo Marcelliana, con cioccolata calda offerta.',
      when: 'Venerdì 19 dicembre 2025 · 15:30–17:30',
    },
    {
      id: 'pizza-2025', season: 'invernali', year: 2025, status: 'closed', date: '2025-11-07',
      title: 'Pizza con NOI',
      desc: 'Pizza tutti insieme e poi giochi, musica e chiacchiere in compagnia. Porta un amico!',
      when: 'Venerdì 7 novembre 2025 · 19:00',
    },
    {
      id: 'informatica-2025', season: 'invernali', year: 2025, status: 'closed', date: '2025-10-22',
      title: 'Laboratorio di informatica',
      desc: 'Primo modulo dedicato all\'intelligenza artificiale e al machine learning, per ragazzi nati dal 2009 al 2011. Non serve esperienza, solo curiosità.',
      when: 'Ogni mercoledì dal 22 ottobre 2025 · 16:00–17:30',
    },
    {
      id: 'pomeriggio-2025-26', season: 'invernali', year: 2025, status: 'closed', date: '2025-09-15',
      title: 'Pomeriggi da NOI 2025/26',
      desc: 'Aiuto compiti, aula studio, friends time, calcio, pallavolo e giochi da tavolo per ragazzi nati tra il 2010 e il 2016.',
      when: 'Martedì, mercoledì e venerdì · 15:30–17:30',
    },
    {
      id: 'serata-24-aprile-2025', season: 'invernali', year: 2025, status: 'closed', date: '2025-04-24',
      title: 'Pomeriggio e Serata con NOI',
      desc: 'Dal pomeriggio alla sera: giochi da tavolo, ping pong, video game, calcio e pallavolo per ragazzi dai 14 ai 17 anni.',
      when: 'Giovedì 24 aprile 2025 · dalle 15:30',
    },
    {
      id: 'sabato-2025', season: 'invernali', year: 2025, status: 'closed', date: '2025-03-29',
      title: 'Sabato con NOI',
      desc: 'Il pomeriggio del sabato per gli adolescenti dai 14 ai 17 anni: ping pong, calcio balilla, carte, video game e merenda.',
      when: 'Sabato 29 marzo 2025 · dalle 15:00',
    },
    {
      id: 'carnevale-2025', season: 'invernali', year: 2025, status: 'closed', date: '2025-03-02',
      title: 'Carnevale con NOI',
      desc: 'La festa di Carnevale per bambini e ragazzi dagli 11 ai 17 anni.',
      when: 'Domenica 2 marzo 2025 · dalle 20:00',
    },
    {
      id: 'xmas-2024', season: 'invernali', year: 2024, status: 'closed', date: '2024-12-13',
      title: 'Natale con NOI',
      desc: 'Due appuntamenti di Natale allo Spazio Aggregativo Marcelliana: NOI di sera con sorpresa per i nati dal 2007 al 2010 e il Pomeriggio da NOI con cioccolata calda offerta.',
      when: 'Venerdì 13 e venerdì 20 dicembre 2024',
    },
    {
      id: 'pomeriggio-2024-25', season: 'invernali', year: 2024, status: 'closed', date: '2024-09-15',
      title: 'Pomeriggi da NOI 2024/25',
      desc: 'Aiuto compiti, aula studio, amicizia, giochi e divertimento per ragazzi nati tra il 2010 e il 2016. Gratuito.',
      when: 'Martedì, mercoledì e venerdì · 15:30–17:30',
    },
    {
      id: 'pomeriggio-precedente', season: 'invernali', year: 2023, status: 'closed', date: '2023-09-15',
      title: 'Pomeriggi da NOI',
      desc: 'Le prime edizioni del doposcuola, per ragazzi nati tra il 2008 e il 2014: aiuto compiti, aula studio, amicizia e giochi.',
      when: 'Mercoledì, giovedì e venerdì · 15:30–17:30',
    },

    /* ---------- ESTIVE ---------- */
    {
      id: 'estate-2027', season: 'estive', year: 2027, status: 'soon',
      title: 'Attività estive 2027',
      desc: 'Estate Ragazzi, camposcuola e pre-scuola torneranno con l\'estate 2027. Programma e iscrizioni in arrivo.',
      when: 'Estate 2027',
    },
    /* archivio estivo (dati dalle locandine ufficiali) */
    {
      id: 'prescuola-2026', season: 'estive', year: 2026, status: 'closed', date: '2026-08-31',
      title: 'Pre-scuola 2026',
      desc: 'Compiti, gioco e amicizia per iniziare bene la giornata, alla Casa della Gioventù per bambini e ragazzi nati dal 2016 al 2019. Costo: 30 € a settimana.',
      when: 'Dal 31 agosto al 4 settembre 2026 · 8:00–12:00',
    },
    {
      id: 'estate-ragazzi-2026', season: 'estive', year: 2026, status: 'closed', date: '2026-08-17',
      title: 'Estate Ragazzi 2026',
      desc: 'Due settimane di giochi, risate e amicizie alla Casa della Gioventù per bambini e ragazzi nati dal 2012 al 2019. Costo: 50 € a settimana.',
      when: 'Dal 17 al 28 agosto 2026 · lun–ven 8:00–17:00',
    },
    {
      id: 'campo-medie-2026', season: 'estive', year: 2026, status: 'closed', date: '2026-07-05',
      title: 'Camposcuola Medie 2026',
      desc: 'Avventura, amicizia e crescita in montagna alla Casa per ferie Monfalconese Madonna dell\'Alpe, per ragazzi nati dal 2012 al 2015. Costo: 250 € a settimana.',
      when: 'Dal 5 al 12 luglio 2026 · Ravascletto (UD)',
    },
    {
      id: 'campo-animatori-2026', season: 'estive', year: 2026, status: 'closed', date: '2026-06-28',
      title: 'Camposcuola Animatori 2026',
      desc: 'Un\'esperienza di formazione e crescita nella comunità con il gruppo ClanDestino, per ragazzi nati dal 2008 al 2011. Costo: 250 € a settimana.',
      when: 'Dal 28 giugno al 5 luglio 2026 · Ravascletto (UD)',
    },
    {
      id: 'torneo-calcio-2026', season: 'estive', year: 2026, status: 'closed', date: '2026-06-13',
      title: 'Torneo di calcio',
      desc: 'Torneo per ragazzi nati dal 2010 al 2012. Partecipazione gratuita.',
      when: '13 giugno 2026',
    },
    {
      id: 'prescuola-2025', season: 'estive', year: 2025, status: 'closed', date: '2025-09-01',
      title: 'Pre-scuola 2025',
      desc: 'Accoglienza prima dell\'inizio della scuola per i bambini delle elementari.',
      when: 'Settembre 2025',
    },
    {
      id: 'estate-ragazzi-2025', season: 'estive', year: 2025, status: 'closed', date: '2025-08-01',
      title: 'Estate Ragazzi 2025 · Oceania',
      desc: 'Settimane di giochi, laboratori e uscite sul tema di Oceania, con 80 ragazzi e 30 animatori.',
      when: 'Estate 2025',
    },
    {
      id: 'campo-medie-2025', season: 'estive', year: 2025, status: 'closed', date: '2025-07-14',
      title: 'Campo Medie 2025',
      desc: 'Il campo estivo dedicato ai ragazzi delle scuole medie.',
      when: 'Luglio 2025',
    },
    {
      id: 'festa-13-giugno-2025', season: 'estive', year: 2025, status: 'closed', date: '2025-06-13',
      title: 'Pomeriggio e Serata con NOI',
      desc: 'La festa di inizio estate per ragazzi nati dal 2008 al 2014: giochi, ping pong, calcio, pallavolo e cena insieme.',
      when: 'Venerdì 13 giugno 2025 · 15:30–21:30',
    },
    {
      id: 'prescuola-2024', season: 'estive', year: 2024, status: 'closed', date: '2024-09-02',
      title: 'Pre Scuola da NOI 2024',
      desc: 'Compiti, gioco e amicizia prima dell\'inizio della scuola, in due gruppi: bambini nati dal 2014 al 2017 e ragazzi dagli 11 ai 17 anni.',
      when: 'Dal 2 al 6 settembre 2024 · 8:30–12:30',
    },
    {
      id: 'estate-ragazzi-2024', season: 'estive', year: 2024, status: 'closed', date: '2024-08-19',
      title: 'Estate Ragazzi 2024',
      desc: 'Due settimane di giochi, laboratori e uscite: Estate Ragazzi per i bambini dai 6 ai 10 anni ed Estate con NOI per i ragazzi dagli 11 ai 17.',
      when: 'Dal 19 al 30 agosto 2024 · 8:00–17:00',
    },
    {
      id: 'summer-volley-2024', season: 'estive', year: 2024, status: 'closed', date: '2024-07-15',
      title: 'Summer Green Volley',
      desc: 'Camp di pallavolo gratuito per ragazzi dagli 11 ai 17 anni, realizzato con Comfort Zone e il Circolo San Giuseppe.',
      when: 'Estate 2024',
    },
    {
      id: 'noi-di-sera-luglio-2024', season: 'estive', year: 2024, status: 'closed', date: '2024-07-04',
      title: 'NOI di sera',
      desc: 'Serata pizza per ragazze e ragazzi dagli 11 ai 17 anni al Centro Aggregativo Marcelliana.',
      when: 'Giovedì 4 luglio 2024 · 19:30',
    },
    {
      id: 'estate-2023', season: 'estive', year: 2023, status: 'closed', date: '2023-08-20',
      title: 'Estate Ragazzi e pre-scuola 2023',
      desc: 'Due settimane di Estate Ragazzi e una di pre-scuola: con i campi, più di cento bambini e ragazzi accolti grazie a 40 animatori.',
      when: 'Estate 2023',
    },
    {
      id: 'campo-medie-2023', season: 'estive', year: 2023, status: 'closed', date: '2023-07-23',
      title: 'Campo Medie 2023 · The Greatest Show',
      desc: 'Campo estivo a Ravascletto per i ragazzi delle medie.',
      when: '23–30 luglio 2023 · Ravascletto',
    },
    {
      id: 'campo-animatori-2023', season: 'estive', year: 2023, status: 'closed', date: '2023-07-16',
      title: 'Campo Animatori 2023 · On the Road',
      desc: 'Campo di formazione per i giovani animatori a Ravascletto.',
      when: '16–23 luglio 2023 · Ravascletto',
    },
  ],

  documents: [
    { year: 2025, title: 'Rendicontazione Contributi Pubblici 2025', url: 'https://drive.google.com/file/d/1u45uIHwSHTAmcrZtJQN7hNWueG0cRIiA/view?usp=drive_link' },
    { year: 2024, title: 'Rendicontazione Contributi Pubblici 2024', url: 'https://drive.google.com/file/d/1aSW3u8xoL6ewwu_j78QnvLqXFTksXeWW/view?usp=drive_link' },
    { year: 2023, title: 'Rendicontazione Contributi Pubblici 2023', url: 'https://drive.google.com/file/d/1MSk8U3nmFnqvxMpSBGjIoxzmmPChQUrJ/view?usp=drive_link' },
  ],
};

