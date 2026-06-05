# Valoir Launch Checklist

Status: `erledigt`, `fehlt`, `optional`

## Erledigt

- `erledigt` Static Export fuer Strato vorbereitet: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`.
- `erledigt` `npm run build` erzeugt `out/`.
- `erledigt` Supabase Tabellen fuer Admin, Warenwirtschaft, Bestellungen, Newsletter, Logs und Audits vorhanden.
- `erledigt` RLS ist fuer die Projekttabellen aktiviert.
- `erledigt` Admin-Bereich unter `/admin/` ist geschuetzt.
- `erledigt` Produkte `Noir Cerice` und `Luna Solea` existieren mit 50 ml und 100 ml Varianten.
- `erledigt` Warenkorb speichert lokal, berechnet Zwischensumme, Versand, Rabatt und Gesamtbetrag.
- `erledigt` Rabattcode `WELCOME10` ist in Supabase aktiv.
- `erledigt` Stripe Checkout Function ist deployed.
- `erledigt` Stripe Webhook Function ist deployed.
- `erledigt` sevDesk, DHL und Brevo Edge Functions sind deployed.
- `erledigt` Rechtliche Seitenrouten existieren: Impressum, Datenschutz, AGB, Widerruf, Versand, Rueckgabe.
- `erledigt` Secret-Scan der getrackten Dateien ohne harte Secret-Treffer.

## Fehlt vor Live-Verkauf

- `fehlt` Echte rechtliche Betreiberangaben im Admin unter `/admin/einstellungen/` eintragen.
- `fehlt` Finale juristische Texte fuer Impressum, Datenschutz, AGB und Widerruf rechtlich pruefen lassen.
- `fehlt` Echte Kontaktadresse, Ruecksendeadresse und Datenschutzkontakt eintragen.
- `fehlt` Live-Preise und Steuerlogik final pruefen.
- `fehlt` Live-Lagerbestaende final eintragen.
- `fehlt` Stripe Live Keys in Supabase Secrets setzen.
- `fehlt` Stripe Webhook im Stripe Dashboard anlegen und `STRIPE_WEBHOOK_SECRET` in Supabase setzen.
- `fehlt` Testbestellung mit Stripe Live/Test-Konfiguration vollstaendig durchlaufen.
- `fehlt` sevDesk API-Key und Basis-URL in Supabase Secrets setzen.
- `fehlt` sevDesk Rechnungstest mit echter Bestellung ausfuehren.
- `fehlt` DHL Zugangsdaten, Billing Number und Absenderdaten setzen.
- `fehlt` DHL Label-Test mit echter Versandadresse ausfuehren.
- `fehlt` Brevo API-Key, Liste, Double-Opt-In-Template, Sender-Mail und Sender-Name setzen.
- `fehlt` Newsletter Double-Opt-In und Testmail ausfuehren.
- `fehlt` Supabase Storage Policies fuer Rechnung- und Label-Downloads final mit einem Kundenkonto testen.
- `fehlt` Strato Upload nach `/home/www` testen.

## Optional

- `optional` Kundenportal unter `/konto/` aktivieren.
- `optional` Produktdaten im oeffentlichen Frontend live aus Supabase laden.
- `optional` Automatische E-Mail-Bestaetigungen nach Stripe Webhook ergaenzen.
- `optional` SFTP Deployment automatisieren.
