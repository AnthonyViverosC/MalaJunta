import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import CategoryTabs from './components/CategoryTabs.jsx';
import MenuSection from './components/MenuSection.jsx';
import PromoSection from './components/PromoSection.jsx';
import EventosSection from './components/EventosSection.jsx';
import Footer from './components/Footer.jsx';
import InstagramButton from './components/InstagramButton.jsx';
import ReservationButton from './components/ReservationButton.jsx';
import { useMenu } from './hooks/useMenu.js';

export default function App() {
  const [busqueda, setBusqueda] = useState('');
  const { categorias, productos, cargando } = useMenu();
  const [categoriaActiva, setCategoriaActiva] = useState('');

  useEffect(() => {
    if (categorias.length && !categoriaActiva) {
      setCategoriaActiva(categorias[0].id);
    }
  }, [categorias, categoriaActiva]);

  const productosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        (p.descripcion || '').toLowerCase().includes(q)
    );
  }, [busqueda, productos]);

  const categoriasConProductos = useMemo(() => {
    if (!busqueda.trim()) return categorias;
    const conResultados = new Set(productosFiltrados.map((p) => p.categoria));
    return categorias.filter((c) => conResultados.has(c.id));
  }, [busqueda, productosFiltrados, categorias]);

  const irACategoria = (id) => {
    setCategoriaActiva(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar busqueda={busqueda} setBusqueda={setBusqueda} />
      <Hero />

      <Marquee variant="acid" />

      <PromoSection />
      <EventosSection />

      <div id="carta" />

      <CategoryTabs
        categorias={categoriasConProductos}
        activa={categoriaActiva}
        setActiva={irACategoria}
        onSpy={setCategoriaActiva}
      />

      <main className="flex-1">
        {cargando ? (
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <div className="mx-auto mb-4 h-10 w-10 border-2 border-ink-600 border-t-acid-400 animate-spin" />
            <p className="font-mono uppercase tracking-widest text-bone-muted text-sm">
              Cargando la carta…
            </p>
          </div>
        ) : categoriasConProductos.length === 0 ? (
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <p className="font-display uppercase text-4xl text-acid-400 mb-3">Sin coincidencias</p>
            <p className="font-mono text-bone-muted text-sm">
              No encontramos nada con «{busqueda}». Prueba con otra palabra.
            </p>
          </div>
        ) : (
          categoriasConProductos.map((cat, i) => (
            <MenuSection
              key={cat.id}
              categoria={cat}
              indice={i}
              productos={productosFiltrados.filter((p) => p.categoria === cat.id)}
            />
          ))
        )}
      </main>

      <Marquee variant="flame" items={['RESERVA YA', 'MÚSICA', 'AMIGOS', 'BUENA MALA JUNTA']} />

      <Footer />
      <ReservationButton />
      <InstagramButton />
    </div>
  );
}
