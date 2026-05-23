import { describe, expect, it } from "vitest";
import { getRankByXp, ranks, xpParaProximoRank } from "@/data/ranks";

// ============================================================
// Dev Saitama - Testes dos Ranks
// ============================================================

describe("ranks", () => {
	it("deve exportar um array", () => {
		expect(Array.isArray(ranks)).toBe(true);
	});

	it("deve ter exatamente 6 ranks", () => {
		expect(ranks).toHaveLength(6);
	});

	it("deve estar ordenado por xpNecessario crescente", () => {
		for (let i = 1; i < ranks.length; i++) {
			expect(ranks[i].xpNecessario).toBeGreaterThan(ranks[i - 1].xpNecessario);
		}
	});

	it("cada rank deve satisfazer o tipo RankInfo (verificacao estrutural)", () => {
		for (const rank of ranks) {
			expect(rank).toMatchObject({
				rank: expect.any(String),
				xpNecessario: expect.any(Number),
				titulo: expect.any(String),
				descricao: expect.any(String),
				cor: expect.any(String),
				emoji: expect.any(String),
			});
		}
	});

	it("cada rank deve ter os campos obrigatorios preenchidos", () => {
		for (const rank of ranks) {
			expect(rank.rank).toBeTypeOf("string");
			expect(rank.rank.length).toBeGreaterThan(0);
			expect(rank.xpNecessario).toBeTypeOf("number");
			expect(rank.xpNecessario).toBeGreaterThanOrEqual(0);
			expect(rank.titulo).toBeTypeOf("string");
			expect(rank.titulo.length).toBeGreaterThan(0);
			expect(rank.descricao).toBeTypeOf("string");
			expect(rank.descricao.length).toBeGreaterThan(0);
			expect(rank.cor).toBeTypeOf("string");
			expect(rank.cor.length).toBeGreaterThan(0);
			expect(rank.emoji).toBeTypeOf("string");
			expect(rank.emoji.length).toBeGreaterThan(0);
		}
	});

	it("nao deve ter ranks duplicados", () => {
		const rankLetters = ranks.map((r) => r.rank);
		const uniqueRanks = new Set(rankLetters);
		expect(uniqueRanks.size).toBe(rankLetters.length);
	});
});

describe("getRankByXp", () => {
	it("deve retornar rank E para XP 0", () => {
		expect(getRankByXp(0).rank).toBe("E");
	});

	it("deve retornar rank E para XP 199", () => {
		expect(getRankByXp(199).rank).toBe("E");
	});

	it("deve retornar rank D para XP 200", () => {
		expect(getRankByXp(200).rank).toBe("D");
	});

	it("deve retornar rank D para XP 499", () => {
		expect(getRankByXp(499).rank).toBe("D");
	});

	it("deve retornar rank C para XP 500", () => {
		expect(getRankByXp(500).rank).toBe("C");
	});

	it("deve retornar rank B para XP 1000", () => {
		expect(getRankByXp(1000).rank).toBe("B");
	});

	it("deve retornar rank A para XP 2000", () => {
		expect(getRankByXp(2000).rank).toBe("A");
	});

	it("deve retornar rank S para XP 4000", () => {
		expect(getRankByXp(4000).rank).toBe("S");
	});

	it("deve retornar rank S para XP 5000 (acima do maximo)", () => {
		expect(getRankByXp(5000).rank).toBe("S");
	});

	it("deve retornar o rank correto com informacoes completas", () => {
		const rank = getRankByXp(200);
		expect(rank).toHaveProperty("rank", "D");
		expect(rank).toHaveProperty("xpNecessario", 200);
		expect(rank).toHaveProperty("titulo");
		expect(rank).toHaveProperty("descricao");
		expect(rank).toHaveProperty("cor");
		expect(rank).toHaveProperty("emoji");
	});

	it("deve retornar rank E (fallback) para XP negativo", () => {
		expect(getRankByXp(-1).rank).toBe("E");
	});
});

describe("xpParaProximoRank", () => {
	it("deve retornar 200 para XP 0 (E -> D)", () => {
		expect(xpParaProximoRank(0)).toBe(200);
	});

	it("deve retornar 1 para XP 199 (E -> D)", () => {
		expect(xpParaProximoRank(199)).toBe(1);
	});

	it("deve retornar 300 para XP 200 (D -> C)", () => {
		expect(xpParaProximoRank(200)).toBe(300);
	});

	it("deve retornar 1 para XP 499 (D -> C)", () => {
		expect(xpParaProximoRank(499)).toBe(1);
	});

	it("deve retornar 500 para XP 500 (C -> B)", () => {
		expect(xpParaProximoRank(500)).toBe(500);
	});

	it("deve retornar 0 para XP 4000 (rank S, maximo)", () => {
		expect(xpParaProximoRank(4000)).toBe(0);
	});

	it("deve retornar 0 para XP 5000 (acima do maximo)", () => {
		expect(xpParaProximoRank(5000)).toBe(0);
	});

	it("deve sempre retornar valor positivo ou zero", () => {
		const testXps = [
			0, 50, 199, 200, 350, 499, 500, 999, 1000, 1500, 2000, 3999, 4000, 5000,
		];
		for (const xp of testXps) {
			expect(xpParaProximoRank(xp)).toBeGreaterThanOrEqual(0);
		}
	});
});
