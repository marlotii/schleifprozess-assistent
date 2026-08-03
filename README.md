# Schleifprozess Assistent

Installierbare und offlinefähige Web-App auf Basis der unveränderten Originaldatei `source-original.html`.

## Dateien

- `source-original.html`: unveränderte hochgeladene Originaldatei
- `index.html`: technische PWA-Kopie mit ausschliesslich Manifest-, Icon-, Theme- und Service-Worker-Ergänzungen
- `manifest.webmanifest`: Web-App-Manifest
- `sw.js`: projektpfadfähiger Service Worker
- `assets/`: PWA-Icons
- `.github/workflows/deploy-pages.yml`: GitHub-Pages-Deployment
- `.github/workflows/create-offline-release.yml`: automatisches Offline-ZIP bei Versions-Tags
- `SOURCE_HASHES.txt`: SHA-256-Prüfsummen
- `TECHNICAL_ANALYSIS.md`: technische Analyse und Abweichungsdokumentation

## Sicherheit

Die Anwendung enthält umfangreiche technische Daten und eingebettete Bilder. Bei einem öffentlichen Repository sind der vollständige Quelltext, sämtliche Daten und alle eingebetteten Inhalte weltweit abrufbar.

## Originalschutz

`source-original.html` wird nicht technisch verändert. Die Prüfsumme muss mit der hochgeladenen Originaldatei übereinstimmen.
