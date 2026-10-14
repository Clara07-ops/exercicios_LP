//exercicio um
import fs from "fs/promises";
import path from "path";

const CAMINHO_LOG = path.join(".", "app.log");

export async function log(mensagem: string): Promise<void> {
  const timestamp = new Date().toISOString();
  const linha = `[${timestamp}] ${mensagem}\n`;
  
  //'a' para adicionar ao final do arquivo sem apagar o que já estava lá, 
  
  // Uma forma simples usando fs/writeFile com flag 'a':
  await fs.writeFile(CAMINHO_LOG, linha, { encoding: "utf-8", flag: "a" });
}

export async function lerLogs(): Promise<string[]> {
  try {
    const conteudo = await fs.readFile(CAMINHO_LOG, "utf-8");
    // Divide o texto por quebras de linha e filtra linhas vazias
    return conteudo.split("\n").filter(linha => linha.trim().length > 0);
  } catch {
    return []; // Se o arquivo não existir ainda, retorna array vazio
  }
}