//exercio dois
import fs from "fs/promises";

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

export async function lerTarefas(caminho: string): Promise<Tarefa[]> {
  try {
    const dados = await fs.readFile(caminho, "utf-8");
    return JSON.parse(dados);
  } catch {
    return []; // Arquivo ainda não existe
  }
}

export async function salvarTarefas(caminho: string, tarefas: Tarefa[]): Promise<void> {
  await fs.writeFile(caminho, JSON.stringify(tarefas, null, 2), "utf-8");
}

export async function adicionar(caminho: string, titulo: string): Promise<Tarefa> {
  const tarefas = await lerTarefas(caminho);
  const nova: Tarefa = { id: tarefas.length + 1, titulo, concluida: false };
  tarefas.push(nova);
  await salvarTarefas(caminho, tarefas);
  return nova;
}

// NOVO: Marcar tarefa como concluída pelo ID
export async function concluir(caminho: string, id: number): Promise<void> {
  const tarefas = await lerTarefas(caminho);
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.concluida = true;
    await salvarTarefas(caminho, tarefas);
  }
}

// NOVO: Remover tarefa pelo ID
export async function remover(caminho: string, id: number): Promise<void> {
  const tarefas = await lerTarefas(caminho);
  const tarefasFiltradas = tarefas.filter(t => t.id !== id);
  await salvarTarefas(caminho, tarefasFiltradas);
}