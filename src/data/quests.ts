import type { DailyQuest } from "@/lib/types";

// ============================================================
// Dev Saitama - Daily Quests (estilo Solo Leveling)
// Complete todas as quests diarias para manter seu streak!
// ============================================================

export const dailyQuests: DailyQuest[] = [
	{
		id: "quest-componente",
		titulo: "Criar um Componente React",
		emoji: "⚙️",
		categoria: "componente",
		xp: 30,
		descricao:
			"Crie um componente React funcional com props tipadas. Pode ser qualquer coisa: um Card, um Badge, um Avatar. O importante e tipar as props com TypeScript.",
		verificacao:
			"O componente deve ter pelo menos 3 props tipadas, usar TypeScript corretamente (sem `any`) e renderizar algo na tela.",
		completed: false,
	},
	{
		id: "quest-api",
		titulo: "Consumir uma API",
		emoji: "🌐",
		categoria: "api",
		xp: 40,
		descricao:
			"Faça uma chamada a qualquer API publica (pode ser uma fake API como jsonplaceholder). Trate loading, erro e sucesso. Valide a resposta com Zod se possivel.",
		verificacao:
			"Deve ter fetch (ou axios), tratamento de erro com try/catch, estado de loading e renderizacao condicional baseada no status da requisicao.",
		completed: false,
	},
	{
		id: "quest-tdd",
		titulo: "Escrever um Teste",
		emoji: "🧪",
		categoria: "tdd",
		xp: 35,
		descricao:
			"Escreva pelo menos 1 teste para qualquer funcao ou componente. Pode ser teste unitario de funcao pura ou teste de componente com Testing Library.",
		verificacao:
			"O teste deve passar (`npm test` verde), usar `describe`/`it`/`expect` e testar um cenario real (nao so `expect(true).toBe(true)`).",
		completed: false,
	},
	{
		id: "quest-debug",
		titulo: "Caçar um Bug",
		emoji: "🐛",
		categoria: "debug",
		xp: 45,
		descricao:
			"Encontre e corrige um bug no seu codigo. Pode ser um bug real que voce encontrou, ou crie um propositamente e depois corrige. Documente o que era o bug e como resolveu.",
		verificacao:
			"Deve ter um commit com a correcao e uma descricao do bug (pode ser no proprio commit message ou em comentario no codigo).",
		completed: false,
	},
];
