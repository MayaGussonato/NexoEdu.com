const API = "https://unique-fascination-production-27fa.up.railway.app";

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