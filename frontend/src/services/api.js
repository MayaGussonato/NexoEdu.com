const API = "http://localhost:5177";

export async function registrarEntrada(ra, latitude, longitude) {
  const response = await fetch(
    `${API}/api/registros/entrada/${encodeURIComponent(ra)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude }),
    }
  );
  const dados = await response.json();
  if (!response.ok) {
    throw new Error(dados.mensagem);
  }
  return dados;
}