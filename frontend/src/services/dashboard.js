const API = "http://localhost:5177";

export async function obterDashboard() {
  const response = await fetch(`${API}/api/dashboard`);
  if (!response.ok) {
    throw new Error("Erro ao carregar dashboard.");
  }
  return await response.json();
}

export async function obterSemana(turma, data) {
  const dataFormatada = data.toISOString().split("T")[0];
  const response = await fetch(
    `${API}/api/dashboard/semana?turma=${encodeURIComponent(turma)}&data=${dataFormatada}`
  );
  if (!response.ok) {
    throw new Error("Erro ao carregar registros da semana.");
  }
  return await response.json();
}