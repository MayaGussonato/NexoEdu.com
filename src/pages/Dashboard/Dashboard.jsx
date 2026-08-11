import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterDashboard, obterSemana } from "../../services/dashboard";

function IconChevronEsquerda() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function IconChevronDireita() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [dados, setDados] = useState(null);
  const [turmaAtiva, setTurmaAtiva] = useState(null);
  const [formularioAberto, setFormularioAberto] = useState(false);

  const [dataSemana, setDataSemana] = useState(new Date());
  const [semana, setSemana] = useState(null);
  const [carregandoSemana, setCarregandoSemana] = useState(false);

  useEffect(() => {
    carregar();
    const intervalo = setInterval(carregar, 5000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (turmaAtiva) {
      carregarSemana();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turmaAtiva, dataSemana]);

  async function carregar() {
    try {
      const resultado = await obterDashboard();
      setDados(resultado);

      setTurmaAtiva((atual) => atual ?? resultado?.turmas?.[0]?.turma ?? null);
    } catch (erro) {
      console.error(erro);
    }
  }

  async function carregarSemana() {
    setCarregandoSemana(true);
    try {
      const resultado = await obterSemana(turmaAtiva, dataSemana);
      setSemana(resultado);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregandoSemana(false);
    }
  }

  function irParaSemanaAnterior() {
    setDataSemana((atual) => {
      const nova = new Date(atual);
      nova.setDate(nova.getDate() - 7);
      return nova;
    });
  }

  function irParaProximaSemana() {
    setDataSemana((atual) => {
      const nova = new Date(atual);
      nova.setDate(nova.getDate() + 7);
      return nova;
    });
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
          <span className="dashboard-eyebrow">Painel da coordenação</span>
          <h1>Olá, {usuario?.nome}</h1>
        </div>

        <button className="dashboard-logout" onClick={sair} type="button">
          Sair
        </button>
      </header>

      <main className="dashboard-main">
        {dados?.turmas?.length > 0 && (
          <div className="dashboard-tabs">
            {dados.turmas.map((t) => (
              <button
                key={t.turma}
                className={`dashboard-tab ${t.turma === turmaAtiva ? "dashboard-tab--ativa" : ""}`}
                onClick={() => {
                  setTurmaAtiva(t.turma);
                  setFormularioAberto(false);
                }}
                type="button"
              >
                Turma {t.turma}
                {!t.formularioRespondido && <span className="dashboard-tab-alerta" />}
              </button>
            ))}
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
              <div className="ultimas-header">
                <h2>Formulário — Turma {infoTurma.turma}</h2>

                <button
                  className="ver-formulario-btn"
                  type="button"
                  disabled={!infoTurma.formularioRespondido}
                  onClick={() => setFormularioAberto((v) => !v)}
                >
                  {infoTurma.formularioRespondido
                    ? formularioAberto
                      ? "Fechar formulário"
                      : "Ver formulário"
                    : "Ainda não respondido"}
                </button>
              </div>

              {formularioAberto && infoTurma.formulario && (
                <div className="formulario-detalhe">
                  <p className="formulario-detalhe-meta">
                    Respondido por <strong>{infoTurma.formulario.lider}</strong> às {infoTurma.formulario.horario}
                  </p>

                  <ul>
                    <li>Sala limpa: {infoTurma.formulario.salaLimpa ? "Sim" : "Não"}</li>
                    <li>Carteiras organizadas: {infoTurma.formulario.carteirasOrganizadas ? "Sim" : "Não"}</li>
                    <li>Patrimônio cuidado: {infoTurma.formulario.patrimonio ? "Sim" : "Não"}</li>
                    <li>Colaborou com a organização: {infoTurma.formulario.organizacao ? "Sim" : "Não"}</li>
                    <li>Boa participação: {infoTurma.formulario.participacao ? "Sim" : "Não"}</li>
                    <li>Respeitou combinados: {infoTurma.formulario.respeitoCombinados ? "Sim" : "Não"}</li>
                    <li>Usou bem os materiais: {infoTurma.formulario.materiais ? "Sim" : "Não"}</li>
                    <li>Respeito entre colegas: {infoTurma.formulario.respeitoColegas ? "Sim" : "Não"}</li>
                    <li>Respeito aos professores: {infoTurma.formulario.respeitoProfessores ? "Sim" : "Não"}</li>
                    <li>Boa convivência: {infoTurma.formulario.boaConvivencia ? "Sim" : "Não"}</li>
                    <li>Colaboração entre alunos: {infoTurma.formulario.colaboracao ? "Sim" : "Não"}</li>
                    <li>Sem uso de celular: {infoTurma.formulario.semCelular ? "Sim" : "Não"}</li>
                  </ul>

                  {infoTurma.formulario.observacoes && (
                    <p className="formulario-detalhe-obs">
                      <strong>Observações:</strong> {infoTurma.formulario.observacoes}
                    </p>
                  )}
                </div>
              )}
            </section>

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

            <section className="ultimas">
              <div className="semana-header">
                <h2>Registros da semana — Turma {infoTurma.turma}</h2>

                <div className="semana-navegacao">
                  <button className="semana-nav-btn" onClick={irParaSemanaAnterior} type="button">
                    <IconChevronEsquerda />
                  </button>

                  <span className="semana-intervalo">
                    {semana ? `${semana.inicioSemana} — ${semana.fimSemana}` : "Carregando..."}
                  </span>

                  <button className="semana-nav-btn" onClick={irParaProximaSemana} type="button">
                    <IconChevronDireita />
                  </button>
                </div>
              </div>

              {carregandoSemana && <p className="semana-carregando">Carregando...</p>}

              {!carregandoSemana && semana && (
                <>
                  <h3 className="semana-subtitulo">Atrasos por aluno</h3>

                  <div className="tabela-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Aluno</th>
                          <th>RA</th>
                          <th>Presenças</th>
                          <th>Atrasos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semana.atrasos?.length ? (
                          semana.atrasos.map((item, i) => (
                            <tr key={i} className={item.alertaAtraso ? "linha-alerta" : ""}>
                              <td>{item.aluno}</td>
                              <td>{item.ra}</td>
                              <td>{item.totalPresencas}</td>
                              <td>
                                <span className={`situacao-badge ${item.alertaAtraso ? "situacao-atrasado" : "situacao-presente"}`}>
                                  {item.totalAtrasos}
                                  {item.alertaAtraso && " ⚠"}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="tabela-vazia">Nenhum aluno cadastrado.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="semana-subtitulo">Formulários da semana</h3>

                  {semana.formularios?.length ? (
                    <div className="semana-formularios-lista">
                      {semana.formularios.map((f, i) => (
                        <div key={i} className="semana-formulario-item">
                          <span className="semana-formulario-dia">{f.diaSemana}, {f.data}</span>
                          <span className="semana-formulario-meta">
                            Respondido por <strong>{f.lider}</strong> às {f.horario}
                          </span>
                          {f.observacoes && (
                            <span className="semana-formulario-obs">{f.observacoes}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="tabela-vazia" style={{ padding: "12px 0" }}>Nenhum formulário nesta semana.</p>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;