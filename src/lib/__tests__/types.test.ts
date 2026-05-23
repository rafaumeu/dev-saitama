import { describe, expect, it } from "vitest";
import type {
	DailyQuest,
	Lesson,
	Module,
	Rank,
	RankInfo,
	StudentProgress,
	StudentStats,
} from "@/lib/types";

// ============================================================
// Dev Saitama - Testes dos tipos TypeScript
// Verifica que os tipos sao exportados corretamente e satisfazem
// os contratos estruturais esperados.
// ============================================================

describe("types.ts - Module", () => {
	it("deve aceitar todos os valores validos de Module", () => {
		const modules: Module[] = ["api", "tdd", "excellence", "typescript"];
		expect(modules).toHaveLength(4);
		expect(modules).toContain("api");
		expect(modules).toContain("tdd");
		expect(modules).toContain("excellence");
		expect(modules).toContain("typescript");
	});
});

describe("types.ts - Rank", () => {
	it("deve aceitar todos os valores validos de Rank", () => {
		const ranks: Rank[] = ["E", "D", "C", "B", "A", "S"];
		expect(ranks).toHaveLength(6);
		expect(ranks).toContain("E");
		expect(ranks).toContain("D");
		expect(ranks).toContain("C");
		expect(ranks).toContain("B");
		expect(ranks).toContain("A");
		expect(ranks).toContain("S");
	});
});

describe("types.ts - Lesson", () => {
	it("deve satisfazer o contrato estrutural de Lesson", () => {
		const lesson: Lesson = {
			id: "teste-lesson",
			titulo: "Lição de Teste",
			anime: "Test Anime",
			emoji: "🧪",
			modulo: "api",
			rank: "E",
			xp: 50,
			conceito: "Conceito de teste.",
			licao: "Lição de teste.",
			exemploCodigo: "const x = 1;",
			exercicio: "Faça algo.",
			dica: "Use a dica.",
			completed: false,
		};

		expect(lesson.id).toBeTypeOf("string");
		expect(lesson.titulo).toBeTypeOf("string");
		expect(lesson.anime).toBeTypeOf("string");
		expect(lesson.emoji).toBeTypeOf("string");
		expect(lesson.modulo).toBeTypeOf("string");
		expect(lesson.rank).toBeTypeOf("string");
		expect(lesson.xp).toBeTypeOf("number");
		expect(lesson.conceito).toBeTypeOf("string");
		expect(lesson.licao).toBeTypeOf("string");
		expect(lesson.exemploCodigo).toBeTypeOf("string");
		expect(lesson.exercicio).toBeTypeOf("string");
		expect(lesson.dica).toBeTypeOf("string");
		expect(lesson.completed).toBeTypeOf("boolean");
	});

	it("deve aceitar completed como true", () => {
		const lesson: Lesson = {
			id: "teste-lesson-2",
			titulo: "Lição Completa",
			anime: "Test Anime",
			emoji: "✅",
			modulo: "tdd",
			rank: "S",
			xp: 100,
			conceito: "Conceito.",
			licao: "Lição.",
			exemploCodigo: "code()",
			exercicio: "Exercício.",
			dica: "Dica.",
			completed: true,
		};
		expect(lesson.completed).toBe(true);
	});
});

describe("types.ts - StudentProgress", () => {
	it("deve satisfazer o contrato estrutural de StudentProgress", () => {
		const progress: StudentProgress = {
			studentId: "student-1",
			nome: "Naruto Uzumaki",
			xpTotal: 350,
			rankAtual: "D",
			licoesCompletadas: ["fetch-basico"],
			streak: 5,
			ultimoLogin: "2025-01-01",
			questsCompletadasHoje: ["quest-componente"],
		};

		expect(progress.studentId).toBeTypeOf("string");
		expect(progress.nome).toBeTypeOf("string");
		expect(progress.xpTotal).toBeTypeOf("number");
		expect(progress.rankAtual).toBeTypeOf("string");
		expect(Array.isArray(progress.licoesCompletadas)).toBe(true);
		expect(progress.streak).toBeTypeOf("number");
		expect(progress.ultimoLogin).toBeTypeOf("string");
		expect(Array.isArray(progress.questsCompletadasHoje)).toBe(true);
	});
});

describe("types.ts - DailyQuest", () => {
	it("deve satisfazer o contrato estrutural de DailyQuest", () => {
		const quest: DailyQuest = {
			id: "quest-test",
			titulo: "Quest de Teste",
			emoji: "🧪",
			categoria: "componente",
			xp: 30,
			descricao: "Descricao da quest.",
			verificacao: "Como verificar.",
			completed: false,
		};

		expect(quest.id).toBeTypeOf("string");
		expect(quest.titulo).toBeTypeOf("string");
		expect(quest.emoji).toBeTypeOf("string");
		expect(quest.categoria).toBeTypeOf("string");
		expect(quest.xp).toBeTypeOf("number");
		expect(quest.descricao).toBeTypeOf("string");
		expect(quest.verificacao).toBeTypeOf("string");
		expect(quest.completed).toBeTypeOf("boolean");
	});

	it("deve aceitar todas as categorias validas", () => {
		const categorias: DailyQuest["categoria"][] = [
			"componente",
			"api",
			"tdd",
			"debug",
		];
		expect(categorias).toHaveLength(4);
	});
});

describe("types.ts - RankInfo", () => {
	it("deve satisfazer o contrato estrutural de RankInfo", () => {
		const rankInfo: RankInfo = {
			rank: "E",
			xpNecessario: 0,
			titulo: "Recruta",
			descricao: "Todo heroi comeca de algum lugar.",
			cor: "text-gray-400",
			emoji: "🌱",
		};

		expect(rankInfo.rank).toBeTypeOf("string");
		expect(rankInfo.xpNecessario).toBeTypeOf("number");
		expect(rankInfo.titulo).toBeTypeOf("string");
		expect(rankInfo.descricao).toBeTypeOf("string");
		expect(rankInfo.cor).toBeTypeOf("string");
		expect(rankInfo.emoji).toBeTypeOf("string");
	});
});

describe("types.ts - StudentStats", () => {
	it("deve satisfazer o contrato estrutural de StudentStats", () => {
		const stats: StudentStats = {
			totalLicoes: 10,
			licoesCompletadas: 3,
			xpTotal: 250,
			rankAtual: "D",
			streak: 7,
			questsHoje: 2,
		};

		expect(stats.totalLicoes).toBeTypeOf("number");
		expect(stats.licoesCompletadas).toBeTypeOf("number");
		expect(stats.xpTotal).toBeTypeOf("number");
		expect(stats.rankAtual).toBeTypeOf("string");
		expect(stats.streak).toBeTypeOf("number");
		expect(stats.questsHoje).toBeTypeOf("number");
	});
});
