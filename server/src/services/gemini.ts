import { GoogleGenAI } from '@google/genai'
import { env } from 'process'
import { tr } from 'zod/locales'

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

export async function transactionGenerateIA(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
    Extraia as seguintes informações da frase: '${prompt}'.

      - Nome: crie um nome para a transação que faz mais sentido
      - Categoria (ex: Alimentação, Transporte, Lazer, Salário, Investimento, Outros)
      - Tipo de Movimentação (revenue ou expense)
      - Valor (número decimal, use ponto como separador, sem R$)

      Formato de saída JSON:
      {
          "name": "string",
          "category": "string",
          "type": "string",
          "amount": float
      }

      Exemplo:
      Entrada: "Salário de 3000 em 01/07/2025"
      Saída: { "name": "Meu salário", "categories": "Salário", "type": "Entrada", "amount": 3000.00 }

      Entrada: "Comprei um café por 5.50 hoje"
      Saída: { "name": "Lanche", "categories": "Alimentação", "type": "Saída", "amount": 5.50 }`.trim(),
  })
  if (!response.text) {
    throw new Error('Erro ao gerar transação: resposta vazia')
  }
  return response.text
}
