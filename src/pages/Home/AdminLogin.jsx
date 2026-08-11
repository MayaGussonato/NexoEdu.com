import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fazerLogin } from "../../services/login";

function AdminLogin({ onBack }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const dados = await fazerLogin(email, senha);

      if (dados.perfil !== "COORDENACAO") {
        setErro("Este usuário não tem acesso de administrador.");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(dados));
      navigate("/dashboard");
    } catch (err) {
      setErro(err.message || "Não foi possível entrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="panel-view">
      <button className="panel-back" onClick={onBack} type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Voltar
      </button>

      <span className="cards-eyebrow">Área restrita</span>
      <h2 className="login-title">Login do administrador</h2>
      <p className="login-subtitle">Acesse o painel de gestão da coordenação.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        {erro && <p className="login-error">{erro}</p>}

        <button type="submit" className="login-submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
}

export default AdminLogin;