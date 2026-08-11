import { useState, useEffect } from "react";
import logoEscola from "../../assets/logo-escola.png";
import ScannerPanel from "./ScannerPanel";
import AdminLogin from "./AdminLogin";
import LiderLogin from "./LiderLogin";
import ProfessorLogin from "./ProfessorLogin";
import "./Home.css";

function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3Z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </svg>
  );
}

function IconBadgeStar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5.2" />
      <path d="M12 6.6l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3 1-2.1Z" fill="currentColor" stroke="none" />
      <path d="M8.4 13.6 7 20.5l5-2.4 5 2.4-1.4-6.9" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.4V5.6c0-.9.7-1.6 1.6-1.6H12v16.6H5.6c-.9 0-1.6-.7-1.6-1.6Z" />
      <path d="M20 19.4V5.6c0-.9-.7-1.6-1.6-1.6H12v16.6h6.4c.9 0 1.6-.7 1.6-1.6Z" />
    </svg>
  );
}

function IconScanFrame() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V6a2 2 0 0 1 2-2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function CardsView({ setView }) {
  return (
    <section className="cards-view">
      <header className="cards-header">
        <span className="cards-eyebrow">Bem-vindo</span>
        <h2>Como você quer entrar?</h2>
      </header>

      <div className="cards-grid">
        <button className="access-card" onClick={() => setView("admin")}>
          <span className="access-card-crest">
            <IconShieldCheck />
          </span>
          <span className="access-card-text">
            <span className="access-card-title">Entrar como administrador</span>
            <span className="access-card-caption">
              Clique aqui para realizar login como administrador
            </span>
          </span>
          <span className="access-card-arrow">
            <IconChevron />
          </span>
        </button>

        <button className="access-card" onClick={() => setView("lider")}>
          <span className="access-card-crest">
            <IconBadgeStar />
          </span>
          <span className="access-card-text">
            <span className="access-card-title">Entrar como líder de turma</span>
            <span className="access-card-caption">
              Clique aqui para realizar login como líder de turma
            </span>
          </span>
          <span className="access-card-arrow">
            <IconChevron />
          </span>
        </button>

        <button className="access-card" onClick={() => setView("professor")}>
          <span className="access-card-crest">
            <IconBook />
          </span>
          <span className="access-card-text">
            <span className="access-card-title">Entrar como professor</span>
            <span className="access-card-caption">
              Clique aqui para acessar o painel da sua turma
            </span>
          </span>
          <span className="access-card-arrow">
            <IconChevron />
          </span>
        </button>

        <button className="access-card access-card--gold" onClick={() => setView("scanner")}>
          <span className="access-card-crest">
            <IconScanFrame />
          </span>
          <span className="access-card-text">
            <span className="access-card-title">Escanear QR Code</span>
            <span className="access-card-caption">
              Clique aqui para os alunos realizarem o check-in diário
            </span>
          </span>
          <span className="access-card-arrow">
            <IconChevron />
          </span>
        </button>
      </div>
    </section>
  );
}

function DigitalClock() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const isSegunda = agora.getDay() === 1;
  const tolerancia = isSegunda ? "08:55" : "07:15";

  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  const dataFormatada = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="digital-clock">
      <div className="digital-clock-time">
        <span>{horas}</span>
        <span className="digital-clock-colon">:</span>
        <span>{minutos}</span>
        <span className="digital-clock-colon">:</span>
        <span>{segundos}</span>
      </div>
      <div className="digital-clock-side">
        <span className="digital-clock-date">{dataFormatada}</span>
        <span className="digital-clock-tolerance">
          Tolerância de atraso hoje: até <strong>{tolerancia}</strong>
        </span>
      </div>
    </div>
  );
}

function Home() {
  const [view, setView] = useState("cards"); // cards | admin | lider | professor | scanner

  return (
    <div className="home">
      <aside className="home-sidebar">
        <img
          src={logoEscola}
          alt="Brasão E.E. Maria Trujilo Torloni"
          className="sidebar-crest"
        />
        <h1 className="sidebar-title">
          Maria Trujilo
          <br />
          Torloni
        </h1>
        <p className="sidebar-tagline">Sistema de Entrada Escolar</p>
        <div className="sidebar-rule" />
        <p className="sidebar-footnote">Escola Estadual</p>
      </aside>

      <main className="home-content">
        <div className="content-stage">
          {view === "cards" && <CardsView setView={setView} />}
          {view === "admin" && <AdminLogin onBack={() => setView("cards")} />}
          {view === "lider" && <LiderLogin onBack={() => setView("cards")} />}
          {view === "professor" && <ProfessorLogin onBack={() => setView("cards")} />}
          {view === "scanner" && <ScannerPanel onBack={() => setView("cards")} />}
        </div>

        {view !== "scanner" && <DigitalClock />}
      </main>
    </div>
  );
}

export default Home;