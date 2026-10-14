import { log, lerLogs } from "./logger";
import { adicionar, concluir, remover, lerTarefas } from "./tarefas";
import { buscarComSeguranca } from "./seguro";

async function main() {
  console.log("--- Testando Exercício 1 (Logger) ---");
  await log("Aplicação iniciada.");
  await log("Usuário realizou uma ação.");
  console.log("Logs salvos:", await lerLogs());

  console.log("\n--- Testando Exercício 2 (Tarefas) ---");
  const arquivoTarefas = "tarefas.json";
  await adicionar(arquivoTarefas, "Estudar Node.js");
  await adicionar(arquivoTarefas, "Fazer exercícios de assincronia");
  console.log("Tarefas atuais:", await lerTarefas(arquivoTarefas));

  console.log("Concluindo a tarefa 1...");
  await concluir(arquivoTarefas, 1);
  console.log("Tarefas atualizadas:", await lerTarefas(arquivoTarefas));

  console.log("\n--- Testando Exercício 3 (Busca Segura) ---");
  const conteudoValido = await buscarComSeguranca("tarefas.json");
  console.log("Conteúdo do arquivo existente:", conteudoValido ? "Lido com sucesso!" : "Null");

  const conteudoInvalido = await buscarComSeguranca("arquivo_que_nao_existe.txt");
  console.log("Conteúdo de arquivo inexistente:", conteudoInvalido); // Deve ser null
}

main();