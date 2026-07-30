-- =====================================================================
--  MALA JUNTA · Corrección de identidad (dorado + eslogan del logo)
--  Ejecutar en: Supabase → SQL Editor → New query.
--  Sobrescribe (no usa coalesce) para arreglar valores viejos.
-- =====================================================================
update configuracion set
  nombre_negocio = 'MALA JUNTA',
  eslogan        = 'Es más que una copa',
  logo_url       = '/logo.jpeg',
  direccion      = 'Cra. 32A #19-47',
  barrio         = 'B/PALERMO SUBTERRÁNEO',
  telefonos      = '321 679 7668',
  whatsapp       = '573216797668',
  colores        = '{"primario":"#e5b96a","secundario":"#b8843a"}'::jsonb,
  actualizado_en = now()
where id = 1;
