-- =====================================================================
--  Configuración · Campos adicionales del negocio (MALA JUNTA)
--  Ejecutar en: Supabase → SQL Editor → New query.
-- =====================================================================
alter table configuracion add column if not exists eslogan text;
alter table configuracion add column if not exists barrio text;
alter table configuracion add column if not exists maps_url text;

-- Valores iniciales de MALA JUNTA (si están vacíos).
update configuracion set
  nombre_negocio = coalesce(nullif(nombre_negocio, ''), 'MALA JUNTA'),
  eslogan   = coalesce(eslogan, 'Reúne a la mala junta'),
  portada_url = coalesce(portada_url, '/cocteles/Polvo de media noche.jpeg'),
  direccion = coalesce(direccion, 'Cra. 32A #19-47'),
  barrio    = coalesce(barrio, 'Zona centro'),
  telefonos = coalesce(telefonos, '321 679 7668'),
  whatsapp  = coalesce(whatsapp, '573216797668'),
  info_contacto = coalesce(info_contacto,
    'Bebe con cabeza: la buena noche también sabe a responsabilidad. Prohibida la venta de bebidas embriagantes a menores de edad.'),
  colores = case when colores = '{}'::jsonb
            then '{"primario":"#ccff33","secundario":"#ff2a4d"}'::jsonb
            else colores end
where id = 1;
