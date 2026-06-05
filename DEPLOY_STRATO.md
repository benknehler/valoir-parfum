# Strato Deployment

Dieses Projekt ist fuer Strato Hosting Basic als statischer Next.js Export vorbereitet.

## Build

```bash
npm install
npm run build
```

Der Build erzeugt den Ordner `out/`. Fuer Strato wird der Inhalt dieses Ordners hochgeladen.

## Upload per SFTP

1. Mit den Strato SFTP-Zugangsdaten verbinden.
2. In das Webverzeichnis wechseln, in der Regel `/home/www`.
3. Den Inhalt von `out/` hochladen.
4. Nicht den Ordner `out` selbst hochladen.
5. `index.html` muss direkt in `/home/www/index.html` liegen.

## Nach dem Upload testen

- Startseite oeffnen.
- `/kollektion/` oeffnen.
- `/produkt/noir-cerice/` und `/produkt/luna-solea/` oeffnen.
- `/warenkorb/` oeffnen.
- `/admin/` oeffnen und Admin-Login testen.
- Produkt in den Warenkorb legen.
- Rabattcode `WELCOME10` anwenden.
- Stripe Checkout starten.
- Newsletter-Anmeldung testen, nachdem Brevo-Secrets gesetzt sind.

## Backend

Strato fuehrt keinen Node.js Server aus. Alle Backend-Funktionen laufen ueber Supabase:

- Supabase Auth
- Supabase Database mit RLS
- Supabase Storage
- Supabase Edge Functions
- Stripe Checkout und Webhook
- sevDesk, DHL und Brevo Integrationen

## Wichtige Umgebungswerte

Im statischen Frontend duerfen nur diese Public-Werte verwendet werden:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Secrets gehoeren ausschliesslich in Supabase Edge Function Secrets:

- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SEVDESK_API_KEY`
- `DHL_API_KEY`
- `BREVO_API_KEY`

## Stripe Webhook

Webhook Endpoint:

```text
https://nvmaejcfuxkbrzlthqlc.supabase.co/functions/v1/stripe-webhook
```

Event:

```text
checkout.session.completed
```

Nach dem Erstellen des Webhooks muss das Signing Secret als `STRIPE_WEBHOOK_SECRET` in Supabase gesetzt werden.
