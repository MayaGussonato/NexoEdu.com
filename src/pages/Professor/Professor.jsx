import "./Professor.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterDashboard } from "../../services/dashboard";
import { obterTodasTurmas } from "../../services/professores";

function Professor() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [minhasTurmas, setMinhasTurmas] = useState([]);
  const [turmaAtiva, setTurmaAtiva] = useState(null);
  const [dados, setDados] = useState(null);
  const [carregandoTurmas, setCarregandoTurmas] = useState(true);

  useEffect(() => {
    carregarTurmas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    carregar();
    const intervalo = setInterval(carregar, 5000);
    return () => clearInterval(intervalo);
  }, []);

  async function carregarTurmas() {
    try {
      const resultado = await obterTodasTurmas(usuario?.email);
      setMinhasTurmas(resultado.turmas || []);
      setTurmaAtiva((atual) => atual ?? resultado.turmas?.[0] ?? null);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregandoTurmas(false);
    }
  }

  async function carregar() {
    try {
      const resultado = await obterDashboard();
      setDados(resultado);
    } catch (erro) {
      console.error(erro);
    }
  }

  function sair() {
    localStorage.removeItem("usuario");
    navigate("/");
  }

  const infoTurma = dados?.turmas?.find((t) => t.turma === turmaAtiva);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-info">
          <span className="dashboard-eyebrow">Painel do professor</span>
          <h1>Olá, {usuario?.nome}</h1>
        </div>

        <button className="dashboard-logout" onClick={sair} type="button">
          Sair
        </button>
      </header>

      <main className="dashboard-main">
        {carregandoTurmas && <p className="semana-carregando">Carregando suas turmas...</p>}

        {!carregandoTurmas && minhasTurmas.length === 0 && (
          <div className="aviso-senai">
            Nenhuma turma encontrada na sua grade de primeira aula.
          </div>
        )}

        {minhasTurmas.length > 0 && (
          <div className="dashboard-tabs">
            {minhasTurmas.map((t) => {
              const turmaCompleta = dados?.turmas?.find((item) => item.turma === t);

              return (
                <button
                  key={t}
                  className={`dashboard-tab ${t === turmaAtiva ? "dashboard-tab--ativa" : ""}`}
                  onClick={() => setTurmaAtiva(t)}
                  type="button"
                >
                  Turma {t}
                  {turmaCompleta && !turmaCompleta.formularioRespondido && (
                    <span className="dashboard-tab-alerta" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {infoTurma && (
          <>
            {infoTurma.diaSenaiHoje && (
              <div className="aviso-senai">
                Turma {infoTurma.turma} está no SENAI hoje — frequência não contabilizada.
              </div>
            )}

            <div className="cards">
              <article className="card">
                <div className="card-text">
                  <h2>{infoTurma.totalAlunos}</h2>
                  <span>Alunos cadastrados</span>
                </div>
              </article>

              <article className="card">
                <div className="card-text">
                  <h2>{infoTurma.presentes}</h2>
                  <span>Presentes hoje</span>
                </div>
              </article>

              <article className="card">
                <div className="card-text">
                  <h2>{infoTurma.atrasados}</h2>
                  <span>Atrasados hoje</span>
                </div>
              </article>

              <article className="card">
                <div className="card-text">
                  <h2>{infoTurma.naoRegistrados}</h2>
                  <span>Não registrados</span>
                </div>
              </article>
            </div>

            <section className="ultimas">
              <h2>Últimas entradas — Turma {infoTurma.turma}</h2>

              <div className="tabela-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Horário</th>
                      <th>Nome</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoTurma.ultimasEntradas?.length ? (
                      infoTurma.ultimasEntradas.map((item, index) => (
                        <tr key={index}>
                          <td>{item.horario}</td>
                          <td>{item.nome}</td>
                          <td>
                            <span className={`situacao-badge ${
                              item.situacao === "ATRASADO" ? "situacao-atrasado" :
                              item.situacao === "SENAI" ? "situacao-senai" :
                              "situacao-presente"
                            }`}>
                              {item.situacao}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="tabela-vazia">Nenhum registro hoje.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Professor;