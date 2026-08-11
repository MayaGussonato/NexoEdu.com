const API_URL = "http://localhost:5177/api/login";

export async function fazerLogin(email, senha) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await response.json();

  if (!response.ok) {
    throw new Error(dados.mensagem || "Não foi possível entrar.");
  }

  return dados;
}