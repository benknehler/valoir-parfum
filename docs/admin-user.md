# Ersten Valoir Admin-User erstellen

Diese Anleitung setzt voraus, dass die Migration `supabase/migrations/20260605190000_valoir_admin_backend.sql` im Supabase-Projekt ausgeführt wurde.

## 1. Benutzer in Supabase Auth anlegen

Lege im Supabase Dashboard unter `Authentication > Users` einen neuen Benutzer an.

Empfohlen:

- E-Mail: deine Admin-E-Mail
- Passwort: starkes Initialpasswort
- E-Mail bestätigen: aktivieren, wenn du den Account direkt nutzen möchtest

## 2. Rolle `admin` setzen

Öffne im Supabase Dashboard den SQL Editor und ersetze `admin@example.com` durch die echte Admin-E-Mail:

```sql
insert into public.profiles (user_id, role, first_name, last_name, email)
select
  id,
  'admin',
  'Valoir',
  'Admin',
  email
from auth.users
where email = 'admin@example.com'
on conflict (user_id) do update
set
  role = 'admin',
  email = excluded.email;
```

## 3. Login testen

Rufe danach die Admin-Route auf:

```text
https://benknehler.github.io/valoir-parfum/admin/
```

Melde dich mit der angelegten E-Mail und dem Passwort an.

## Hinweise

- Nur Benutzer mit `profiles.role = 'admin'` dürfen den Admin-Bereich sehen.
- Normale Kundenkonten bleiben bei `profiles.role = 'customer'`.
- Der `SUPABASE_SERVICE_ROLE_KEY` gehört nur in serverseitige Umgebungen oder Supabase Edge Functions.
- Der Service Role Key darf niemals in `NEXT_PUBLIC_*` Variablen oder Client-Code verwendet werden.
