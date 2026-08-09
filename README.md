# martindehn.com

Portfolio- und Booking-Website für Martin Dehn — Moderator, Entertainer und Ringsprecher.
Statische Ein-Seiten-Website (HTML/CSS/JS, kein Build-Schritt), Deployment via IONOS Deploy Now aus diesem Repository.

## Struktur

```
index.html
assets/
  css/style.css
  js/main.js
  img/
    martin-dehn-hero.jpg       ← Hero-Foto (bereits befüllt)
                                 Das "Über mich"-Porträt kommt direkt aus gallery/
    gallery/                            ← bereits befüllt mit 12 Bühnenfotos (gallery-01.jpg … gallery-12.jpg)
    logos/                              ← bereits befüllt mit echten Referenz-Logos
      xp-festival.jpg
      golf-lounge-resort.webp
      campingpark-kuehlungsborn.jpg
      sommer-spektakel-kuehlungsborn.png
      open-air-kino-harburg.png
      sommer-im-park.jpg
      reeper-b-club.avif
      big-slam-wrestling.webp
    tv/
      galileo.svg / .png
      sat1.svg / .png
      ndr.svg / .png
      rtl2.svg / .png
robots.txt
sitemap.xml
```

## Bilder & Logos hochladen

Alle Bild-Plätze sind im Code bereits reserviert (Pfade und Dateinamen oben). Einfach die Dateien mit exakt
diesen Namen in die passenden Ordner hochladen — kein Code-Änderung nötig. Fehlt eine Datei, zeigt die Seite
automatisch einen dezenten Farbverlauf statt eines kaputten Bildes.

- **Logos** am liebsten als SVG (transparenter Hintergrund); wenn nicht vorhanden, geht auch PNG mit transparentem
  Hintergrund. Dateiendung im HTML ggf. anpassen (`assets/img/logos/xp-festival.svg` → `.png`).
- **Fotos** als JPG, möglichst hochauflösend — werden automatisch zugeschnitten (`object-fit`/`background-size: cover`).

## Deployment

Wie bei [socialfokus-website](https://github.com/martindehn1/socialfokus-website): Push auf diesen Branch löst
(nach Verbindung mit einem IONOS Deploy Now Projekt für martindehn.com) automatisch Build & Deploy auf den
IONOS-Server aus. Die dafür nötigen Workflow-Dateien unter `.github/workflows/` legt IONOS Deploy Now beim
Verbinden des Projekts automatisch an.
