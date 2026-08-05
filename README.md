# Schleifprozess Assistent

Progressive-Web-App-Verpackung der unveränderten HTML-Anwendung `Grinding_v3.00.html`.

## Sicherheits- und Integritätsprinzip

- `source-original.html` ist eine bytegenaue Kopie der gelieferten Originaldatei.
- `index.html` enthält ausschliesslich die technisch notwendigen PWA-Ergänzungen: Manifest-Link, Theme-Color, Apple-Touch-Icon und Service-Worker-Registrierung.
- Bestehende Funktionen, Texte, Daten, Bilder, Berechnungen, Filter, Layouts und Interaktionen wurden nicht absichtlich verändert.
- Der Service Worker cached nur Ressourcen derselben Origin. Fremde Domains werden nicht gecached.

## Original-Prüfsumme

```text
SHA-256  f4848dbd5c9a0357c0dc77b61149fa4df3b4ba1a466aa093cf3b415ffdf7adfe  source-original.html
```

## GitHub Pages

Der Workflow `.github/workflows/deploy-pages.yml` validiert die Dateien, erstellt `_site`, lädt ein Pages-Artefakt hoch und veröffentlicht es mit GitHub Pages.

Falls GitHub Pages noch nicht auf GitHub Actions eingestellt ist:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

## Offline-Version

Die Windows-Offline-Version verwendet die unveränderte Originalanwendung als `index.html`. Hinweise stehen in `README-OFFLINE.txt`.
