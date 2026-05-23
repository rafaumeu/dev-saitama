import { describe, expect, it } from "vitest";
import { dailyQuests } from "@/data/quests";

// ============================================================
// Dev Saitama - Testes das Daily Quests
// ============================================================

const CATEGORIAS_VALIDAS = ["componente", "api", "tdd", "debug"];

describe("dailyQuests", () => {
	it("deve exportar um array", () => {
		expect(Array.isArray(dailyQuests)).toBe(true);
	});

	it("deve ter exatamente 4 quests", () => {
		expect(dailyQuests).toHaveLength(4);
	});

	describe("cada quest deve ter os campos obrigatorios", () => {
		for (const quest of dailyQuests) {
			describe(`quest: ${quest.id}`, () => {
				it("deve ter id nao vazio", () => {
					expect(quest.id).toBeTypeOf("string");
					expect(quest.id.length).toBeGreaterThan(0);
				});

				it("deve ter titulo nao vazio", () => {
					expect(quest.titulo).toBeTypeOf("string");
					expect(quest.titulo.length).toBeGreaterThan(0);
				});

				it("deve ter emoji nao vazio", () => {
					expect(quest.emoji).toBeTypeOf("string");
					expect(quest.emoji.length).toBeGreaterThan(0);
				});

				it("deve ter categoria valida", () => {
					expect(CATEGORIAS_VALIDAS).toContain(quest.categoria);
				});

				it("deve ter xp maior que zero", () => {
					expect(quest.xp).toBeGreaterThan(0);
				});

				it("deve ter descricao nao vazia", () => {
					expect(quest.descricao).toBeTypeOf("string");
					expect(quest.descricao.length).toBeGreaterThan(0);
				});

				it("deve ter verificacao nao vazia", () => {
					expect(quest.verificacao).toBeTypeOf("string");
					expect(quest.verificacao.length).toBeGreaterThan(0);
				});

				it("deve ter completed como booleano", () => {
					expect(quest.completed).toBeTypeOf("boolean");
				});
			});
		}
	});

	it("nao deve ter ids duplicados", () => {
		const ids = dailyQuests.map((q) => q.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it("deve satisfazer o tipo DailyQuest (verificacao estrutural)", () => {
		for (const quest of dailyQuests) {
			expect(quest).toMatchObject({
				id: expect.any(String),
				titulo: expect.any(String),
				emoji: expect.any(String),
				categoria: expect.any(String),
				xp: expect.any(Number),
				descricao: expect.any(String),
				verificacao: expect.any(String),
				completed: expect.any(Boolean),
			});
		}
	});
});
