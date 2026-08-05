# Technische Analyse – Schleifprozess Assistent

## Originaldatei

| Merkmal | Ergebnis |
|---|---|
| Quelldatei | `Grinding_v3.00.html` |
| Dateigrösse | 1,222,986 Bytes |
| SHA-256 | `f4848dbd5c9a0357c0dc77b61149fa4df3b4ba1a466aa093cf3b415ffdf7adfe` |
| HTML-Titel | `Schleifprozess Assistent` |
| Dokumentanfang | `<!doctype html>` |
| Dokumentende | `</html>` |
| Eingebettete CSS-Bereiche | 16 |
| Eingebettete JavaScript-Bereiche | 10 |
| Eingebettete Base64-Bilder | 7 |
| Eindeutige externe URLs | 122 |
| Eindeutige externe Domains | 63 |

## Externe Ressourcen und Links

Die Anwendung enthält keine extern geladenen JavaScript-Dateien, Stylesheets, Webfonts, Bilder oder API-Daten. Die externen URLs sind hinterlegte Hersteller-, Normen- und Quellenlinks. Sie werden nicht für den Start oder die Kernfunktion der Anwendung benötigt.

Erkannte Domains:

- `haynesintl.com`
- `kellenberger.com`
- `machines.anca.com`
- `multigrind.com`
- `www.3m.com`
- `www.aba-grinding.com`
- `www.agathon.ch`
- `www.amada-machinery.com`
- `www.andre.com.pl`
- `www.asahidia.co.jp`
- `www.astm.org`
- `www.atlantic-grinding-wheels.com`
- `www.blohm-machines.com`
- `www.bohler-edelstahl.com`
- `www.ceratizit.com`
- `www.comet-schleifscheiben.de`
- `www.crucible.com`
- `www.danobatgroup.com`
- `www.din.de`
- `www.elb-schliff.de`
- `www.emag.com`
- `www.erasteel.com`
- `www.fivesgroup.com`
- `www.gleason.com`
- `www.grinding.com`
- `www.haas-schleifmaschinen.de`
- `www.hardinge.com`
- `www.home.sandvik`
- `www.iso.org`
- `www.jtektmachinery.com`
- `www.junker-group.com`
- `www.kapp-niles.com`
- `www.kennametal.com`
- `www.klingelnberg.com`
- `www.krebs-riedel.de`
- `www.kuretoishi.com`
- `www.lapmaster-wolters.com`
- `www.liebherr.com`
- `www.maegerle.com`
- `www.makino.com`
- `www.meister-abrasives.ch`
- `www.micron-grinder.co.jp`
- `www.molemab.com`
- `www.noritake.co.jp`
- `www.nortonabrasives.com`
- `www.okamoto-europe.de`
- `www.radiac.com`
- `www.reishauer.com`
- `www.rollomatic.ch`
- `www.sae.org`
- `www.samputensili.com`
- `www.schleifprofi.com`
- `www.schneeberger.swiss`
- `www.specialmetals.com`
- `www.studer.com`
- `www.supfina.com`
- `www.thielenhaus.com`
- `www.tschudin.swiss`
- `www.tyrolit.com`
- `www.uddeholm.com`
- `www.vollmer-group.com`
- `www.walter-machines.com`
- `www.wendtgroup.com`

## LocalStorage

Erkannte Schlüssel beziehungsweise Kompatibilitätsschlüssel:

- `schleifprozess_assistent_state`
- `schleifprozess_language`
- `grindingAssistantState`
- `schleifprozessAssistentState`
- `grinding-assistant-state`

LocalStorage ist origin-gebunden. Daten einer unter `file://` geöffneten Version werden nicht automatisch in die GitHub-Pages-Origin übernommen.

## Bestehende Offline-Fähigkeit

Die Originalanwendung ist bereits weitgehend offlinefähig, weil HTML, CSS, JavaScript und Bilder eingebettet sind. Externe Hersteller- und Quellenlinks benötigen weiterhin Internet.

## GitHub-Pages- und PWA-Bewertung

- Keine problematischen festen Root-Pfade für lokale Anwendungsressourcen festgestellt.
- Die PWA-Ergänzungen verwenden ausschliesslich relative Pfade mit `./`.
- `start_url` und `scope` sind projektseitenfähig.
- Der Service Worker cached nur Same-Origin-GET-Anfragen.
- Fremde Domains werden weder abgefangen noch gecached.
- Unter `file://` wird der Service Worker absichtlich nicht registriert.

## Technische Abweichungen zwischen Original und PWA

`index.html` enthält gegenüber `source-original.html` genau folgende Ergänzungen:

1. Link zu `./manifest.webmanifest`
2. Theme-Color `#173f5f`
3. Apple-Touch-Icon `./assets/apple-touch-icon.png`
4. Service-Worker-Registrierung für `./sw.js` mit Scope `./`

Keine vorhandenen Elemente wurden absichtlich entfernt oder umbenannt.
