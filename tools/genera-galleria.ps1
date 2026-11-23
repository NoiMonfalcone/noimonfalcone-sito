<#
  Genera assets/js/gallery.js leggendo le foto in assets/img/gallery/.
  - Le sottocartelle diventano ALBUM filtrabili. Mettere la data davanti al nome
    (es. gallery/2025-08-Estate-Ragazzi-2025/foto1.jpg): gli album vengono ordinati
    dal piu recente e la data iniziale non compare nel nome mostrato sul sito.
  - Le dimensioni reali di ogni foto vengono lette qui, così il mosaico rispetta
    le proporzioni originali e la pagina non "salta" durante il caricamento.
  Uso: doppio clic su genera-galleria.bat (oppure powershell -File tools\genera-galleria.ps1)
#>
param([string]$Root = (Split-Path $PSScriptRoot -Parent))

Add-Type -AssemblyName System.Drawing
$dir = Join-Path $Root 'assets\img\gallery'
$out = Join-Path $Root 'assets\js\gallery.js'
$exts = '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'

if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
$base = (Resolve-Path $dir).Path

$files = Get-ChildItem $dir -Recurse -File |
  Where-Object { $exts -contains $_.Extension.ToLower() } |
  Sort-Object @{ Expression = { $_.Directory.Name }; Descending = $true }, @{ Expression = { $_.Name }; Descending = $false }

$lines = foreach ($f in $files) {
  $rel = $f.FullName.Substring((Resolve-Path $Root).Path.Length + 1).Replace('\', '/')
  $album = ''
  if ($f.Directory.FullName -ne $base) { $album = (($f.Directory.Name -replace '^\d{4}-\d{2}[a-z]?[-_]', '') -replace '[-_]+', ' ') }

  $w = 0; $h = 0
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $w = $img.Width; $h = $img.Height
    # Le foto da telefono possono avere un'orientamento EXIF 5-8 (ruotate di 90°): scambia le misure
    if ($img.PropertyIdList -contains 0x0112) {
      $o = $img.GetPropertyItem(0x0112).Value[0]
      if ($o -ge 5 -and $o -le 8) { $t = $w; $w = $h; $h = $t }
    }
    $img.Dispose()
  } catch { }   # formati non leggibili (es. webp/avif): w/h restano 0 -> proporzione 4:3

  $alt = if ($album) { "Foto - $album" } else { 'Foto dalle attivita di NOI Monfalcone' }
  [pscustomobject]@{ src = $rel; w = $w; h = $h; album = $album; alt = $alt } | ConvertTo-Json -Compress
}

$body = if ($lines) { ($lines -join ",`n  ") } else { '' }
$text = "/* File generato da tools/genera-galleria.ps1 - non modificare a mano. */`nwindow.NOI_GALLERY = [`n  $body`n];`n"
[System.IO.File]::WriteAllText($out, $text, (New-Object System.Text.UTF8Encoding $false))
Write-Host ("Galleria aggiornata: {0} foto -> {1}" -f @($files).Count, $out)
