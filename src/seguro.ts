//exercicio tres
import fs from "fs/promises";

export async function buscarComSeguranca(caminho: string): Promise<string | null> {
  try {
    const conteudo = await fs.readFile(caminho, "utf-8");
    return conteudo;
  } catch (erro) {
    // Se der erro, retorna null
    return null;
  }
}