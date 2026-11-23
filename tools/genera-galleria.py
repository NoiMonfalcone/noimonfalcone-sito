#!/usr/bin/env python3
"""Genera assets/js/gallery.js (versione Linux/Mac di genera-galleria.ps1).
Uso: python3 tools/genera-galleria.py   (richiede Pillow: pip install pillow)
Le sottocartelle di assets/img/gallery sono gli album: con la data davanti
(es. 2025-08-Estate-Ragazzi-2025) vengono ordinati dal piu recente."""
import json, os, re, glob
from PIL import Image, ImageOps

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
gal = os.path.join(root, 'assets', 'img', 'gallery')
exts = ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif')
files = [f for f in glob.glob(os.path.join(gal, '**', '*'), recursive=True) if f.lower().endswith(exts)]
files.sort(key=lambda f: os.path.basename(f))
files.sort(key=lambda f: os.path.basename(os.path.dirname(f)), reverse=True)
items = []
for f in files:
    rel = os.path.relpath(f, root).replace(os.sep, '/')
    d = os.path.dirname(f)
    album = '' if d == gal else re.sub(r'[-_]+', ' ', re.sub(r'^\d{4}-\d{2}[a-z]?[-_]', '', os.path.basename(d)))
    try:
        w, h = ImageOps.exif_transpose(Image.open(f)).size
    except Exception:
        w = h = 0
    alt = f'Foto - {album}' if album else 'Foto dalle attivita di NOI Monfalcone'
    items.append(json.dumps({'src': rel, 'w': w, 'h': h, 'album': album, 'alt': alt}, ensure_ascii=False, separators=(',', ':')))
with open(os.path.join(root, 'assets', 'js', 'gallery.js'), 'w', encoding='utf-8') as out:
    out.write('/* File generato da tools/genera-galleria - non modificare a mano. */\nwindow.NOI_GALLERY = [\n  ' + ',\n  '.join(items) + '\n];\n')
print(f'Galleria aggiornata: {len(items)} foto')
