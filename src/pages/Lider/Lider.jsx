import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enviarFormulario } from "../../services/formulario";
import "./Lider.css";

function Lider() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [formulario, setFormulario] = useState({
    turma: usuario?.turma,
    lider: usuario?.nome,

    salaLimpa: false,
    carteirasOrganizadas: false,
    patrimonio: false,
    organizacao: false,

    participacao: false,
    respeitoCombinados: false,
    materiais: false,

    respeitoColegas: false,
    respeitoProfessores: false,
    boaConvivencia: false,
    colaboracao: false,
    semCelular: false,

    observacoes: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  function alterar(e) {
    const { name, type, checked, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function sair() {
    localStorage.removeItem("usuario");
    navigate("/");
  }

  async function enviar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await enviarFormulario(formulario);
      setEnviado(true);
    } catch (err) {
      setErro(err.message || "Não foi possível enviar o formulário.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="lider-page">
      <div className="lider-shell">
        <header className="lider-header">
          <div>
            <span className="lider-eyebrow">Área da turma</span>
            <h1>Olá, {usuario?.nome}</h1>
            <p>Turma {usuario?.turma}</p>
          </div>
          <button className="lider-logout" onClick={sair} type="button">
            Sair
          </button>
        </header>

        {enviado ? (
          <div className="lider-sucesso">
            <h2>Formulário enviado!</h2>
            <p>O relatório da turma {usuario?.turma} foi enviado com sucesso.</p>
            <button
              className="lider-novo-btn"
              type="button"
              onClick={() => {
                setEnviado(false);
                setFormulario({
                  turma: usuario?.turma,
                  lider: usuario?.nome,
                  salaLimpa: false,
                  carteirasOrganizadas: false,
                  patrimonio: false,
                  organizacao: false,
                  participacao: false,
                  respeitoCombinados: false,
                  materiais: false,
                  respeitoColegas: false,
                  respeitoProfessores: false,
                  boaConvivencia: false,
                  colaboracao: false,
                  semCelular: false,
                  observacoes: "",
                });
              }}
            >
              Preencher novo formulário
            </button>
          </div>
        ) : (
          <form className="lider-form" onSubmit={enviar}>
            <div className="bloco">
              <h2>Organização da Sala</h2>

              <div className="item">
                <label>A sala permaneceu limpa</label>
                <input type="checkbox" name="salaLimpa" checked={formulario.salaLimpa} onChange={alterar} />
              </div>

              <div className="item">
                <label>As carteiras ficaram organizadas</label>
                <input type="checkbox" name="carteirasOrganizadas" checked={formulario.carteirasOrganizadas} onChange={alterar} />
              </div>

              <div className="item">
                <label>Os alunos cuidaram do patrimônio escolar</label>
                <input type="checkbox" name="patrimonio" checked={formulario.patrimonio} onChange={alterar} />
              </div>

              <div className="item">
                <label>A turma colaborou com a organização da sala</label>
                <input type="checkbox" name="organizacao" checked={formulario.organizacao} onChange={alterar} />
              </div>
            </div>

            <div className="bloco">
              <h2>Pontualidade e Rotina</h2>

              <div className="item">
                <label>Houve boa participação nas aulas</label>
                <input type="checkbox" name="participacao" checked={formulario.participacao} onChange={alterar} />
              </div>

              <div className="item">
                <label>Os alunos respeitaram os combinados da sala</label>
                <input type="checkbox" name="respeitoCombinados" checked={formulario.respeitoCombinados} onChange={alterar} />
              </div>

              <div className="item">
                <label>Os materiais escolares foram utilizados adequadamente</label>
                <input type="checkbox" name="materiais" checked={formulario.materiais} onChange={alterar} />
              </div>
            </div>

            <div className="bloco">
              <h2>Convivência e Disciplina</h2>

              <div className="item">
                <label>Houve respeito entre os colegas</label>
                <input type="checkbox" name="respeitoColegas" checked={formulario.respeitoColegas} onChange={alterar} />
              </div>

              <div className="item">
                <label>Os professores foram respeitados</label>
                <input type="checkbox" name="respeitoProfessores" checked={formulario.respeitoProfessores} onChange={alterar} />
              </div>

              <div className="item">
                <label>A turma manteve boa convivência</label>
                <input type="checkbox" name="boaConvivencia" checked={formulario.boaConvivencia} onChange={alterar} />
              </div>

              <div className="item">
                <label>Os alunos colaboraram entre si</label>
                <input type="checkbox" name="colaboracao" checked={formulario.colaboracao} onChange={alterar} />
              </div>

              <div className="item">
                <label>Não houve uso do celular</label>
                <input type="checkbox" name="semCelular" checked={formulario.semCelular} onChange={alterar} />
              </div>
            </div>

            <div className="bloco">
              <h2>Observações</h2>
              <textarea name="observacoes" value={formulario.observacoes} onChange={alterar} placeholder="Escreva aqui alguma observação adicional sobre o dia..." />
            </div>

            {erro && <p className="lider-erro">{erro}</p>}

            <button type="submit" className="lider-enviar-btn" disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar formulário"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Lider;