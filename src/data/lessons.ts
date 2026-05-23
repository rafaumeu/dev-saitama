import type { Lesson } from "@/lib/types";

// ============================================================
// Dev Saitama - Lições (placeholder — será substituído por outro task)
// ============================================================

export const lessons: Lesson[] = [
	{
		id: "fetch-basico",
		titulo: "O Primeiro Soco — Fetch API",
		anime: "One Punch Man",
		emoji: "👊",
		modulo: "api",
		rank: "E",
		xp: 50,
		conceito:
			"Toda jornada começa com um passo. O fetch é a base da comunicação client-side. Entender promises e async/await é fundamental.",
		licao:
			"## A lição do Saitama\n\nSaitama faz 100 flexões, 100 abdominais, 100 agachamentos e 10km de corrida todo dia.\n\nNo código, o equivalente é: fazer fetch todo dia. Praticar o básico até virar reflexo.",
		exemploCodigo:
			'async function buscarDados(url: string) {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error("Erro na requisição");\n  return response.json();\n}',
		exercicio:
			"Crie uma função que faz fetch para https://jsonplaceholder.typicode.com/users e retorna os dados tipados com uma interface User.",
		dica: "Use `try/catch` e tipagem genérica com `Promise<T>`.",
		completed: false,
	},
	{
		id: "componente-basico",
		titulo: "Clone no Jutsu — Props e Componentes",
		anime: "Naruto",
		emoji: "🥷",
		modulo: "excellence",
		rank: "E",
		xp: 40,
		conceito:
			"Assim como o Kage Bunshin cria cópias, componentes React criam instâncias reutilizáveis. Props são os selos manuais — definem o que cada clone faz.",
		licao:
			"## Kage Bunshin no Jutsu dos Componentes\n\nCada componente é um clone que pode ter comportamento diferente baseado nas props que recebe.",
		exemploCodigo:
			'interface CardProps {\n  titulo: string;\n  descricao: string;\n  destaque?: boolean;\n}\n\nfunction Card({ titulo, descricao, destaque = false }: CardProps) {\n  return (\n    <div className={destaque ? "border-yellow-400" : "border-gray-600"}>\n      <h3>{titulo}</h3>\n      <p>{descricao}</p>\n    </div>\n  );\n}',
		exercicio:
			"Crie um componente `UserCard` que recebe `nome`, `avatar` (URL) e `rank` (enum). Renderize com estilo diferente por rank.",
		dica: "Use conditional className baseada no rank para aplicar cores diferentes.",
		completed: false,
	},
	{
		id: "use-state-basico",
		titulo: "Sharingan Ativado — useState",
		anime: "Naruto",
		emoji: "👁️",
		modulo: "excellence",
		rank: "E",
		xp: 45,
		conceito:
			"O Sharingan lê e copia movimentos. O useState lê e atualiza o estado do componente. Sem ele, seu componente é estático como uma estátua.",
		licao:
			"## Domine o Estado\n\nEstado é a memória do componente. Use useState para guardar dados que mudam com o tempo.",
		exemploCodigo:
			"const [count, setCount] = useState<number>(0);\n\n<button onClick={() => setCount(c => c + 1)}>\n  Contagem: {count}\n</button>",
		exercicio:
			"Crie um contador com botões de incrementar, decrementar e resetar. O valor nunca deve ser negativo.",
		dica: "Use o formato de callback do setState: `setCount(c => Math.max(0, c - 1))`.",
		completed: false,
	},
	{
		id: "teste-unitario",
		titulo: "Hunter Exam — Primeiro Teste",
		anime: "Hunter x Hunter",
		emoji: "🎯",
		modulo: "tdd",
		rank: "D",
		xp: 60,
		conceito:
			"O Exame Hunter testa se você está pronto. Testes unitários verificam se seu código está pronto. Sem testes, você está lutando no escuro.",
		licao:
			"## A licença Hunter dos testes\n\nEscrever testes não é opcional — é sua licença para produzir código profissional.",
		exemploCodigo:
			'import { describe, it, expect } from "vitest";\n\ndescribe("soma", () => {\n  it("deve somar dois numeros", () => {\n    expect(soma(2, 3)).toBe(5);\n  });\n});',
		exercicio:
			"Escreva 3 testes para uma função `validarEmail(email: string): boolean`. Teste casos válidos, inválidos e edge cases.",
		dica: "Use regex simples para validação e teste: vazio, sem @, domínio inválido.",
		completed: false,
	},
	{
		id: "error-boundary",
		titulo: "Armamento Total — Error Handling",
		anime: "Attack on Titan",
		emoji: "⚔️",
		modulo: "api",
		rank: "D",
		xp: 55,
		conceito:
			"No mundo dos Titãs, quem não se prepara morre. No código, quem não trata erros causa crash em produção. Error boundaries são suas muralhas.",
		licao:
			"## Proteja sua Aplicação\n\nSempre trate: erros de rede, erros de parsing, estados vazios e casos inesperados.",
		exemploCodigo:
			// biome-ignore lint/suspicious/noTemplateCurlyInString: example code template
			'try {\n  const data = await fetch(url);\n  if (!data.ok) throw new Error(`HTTP ${data.status}`);\n  return await data.json();\n} catch (error) {\n  console.error("Falha:", error);\n  return null;\n}',
		exercicio:
			"Crie uma função `fetchSeguro<T>` com retry automático (3 tentativas) e timeout de 5 segundos.",
		dica: "Use `Promise.race` entre o fetch e um setTimeout para implementar timeout.",
		completed: false,
	},
	{
		id: "typescript-generics",
		titulo: "Bankai — Generics Avançados",
		anime: "Bleach",
		emoji: "🗡️",
		modulo: "typescript",
		rank: "C",
		xp: 80,
		conceito:
			"O Bankai libera o poder total de uma Zanpakutō. Generics liberam o poder total do TypeScript. Domine ambos e você será invencível.",
		licao:
			"## Libere o Poder dos Tipos\n\nGenerics permitem criar funções e tipos que funcionam com qualquer tipo de dado, mantendo a segurança.",
		exemploCodigo:
			"function criarEstado<T>(initial: T): [() => T, (v: T) => void] {\n  let valor = initial;\n  return [\n    () => valor,\n    (novo: T) => { valor = novo; }\n  ];\n}",
		exercicio:
			"Crie um tipo genérico `Result<T, E>` que pode ser `Success<T>` ou `Failure<E>`, com funções helper `isOk()` e `unwrap()`.",
		dica: "Use discriminated unions: `{ ok: true, data: T } | { ok: false, error: E }`.",
		completed: false,
	},
];
