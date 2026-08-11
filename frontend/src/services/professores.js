const API = "http://localhost:5177";

export async function obterTurmasHoje(email) {
  const response = await fetch(
    `${API}/api/professores/turmas-hoje?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    throw new Error("Erro ao carregar turmas do dia.");
  }
  return await response.json();
}

export async function obterTodasTurmas(email) {
  const response = await fetch(
    `${API}/api/professores/turmas?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    throw new Error("Erro ao carregar turmas do professor.");
  }
  return await response.json();
}