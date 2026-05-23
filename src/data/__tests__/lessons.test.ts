import { describe, expect, it } from "vitest";
import { lessons } from "@/data/lessons";
import type { Module, Rank } from "@/lib/types";

// ============================================================
// Dev Saitama - Testes das Lessons
// ============================================================

const MODULOS_VALIDOS: Module[] = ["api", "tdd", "excellence", "typescript"];
const RANKS_VALIDOS: Rank[] = ["E", "D", "C", "B", "A", "S"];

describe("lessons", () => {
	it("deve exportar um array", () => {
		expect(Array.isArray(lessons)).toBe(true);
	});

	it("deve ter pelo menos 1 licao", () => {
		expect(lessons.length).toBeGreaterThan(0);
	});

	it("deve ter exatamente 6 licoes", () => {
		expect(lessons).toHaveLength(6);
	});

	describe("cada licao deve ter todos os campos obrigatorios", () => {
		for (const lesson of lessons) {
			describe(`licao: ${lesson.id}`, () => {
				it("deve ter id nao vazio", () => {
					expect(lesson.id).toBeTypeOf("string");
					expect(lesson.id.length).toBeGreaterThan(0);
				});

				it("deve ter titulo nao vazio", () => {
					expect(lesson.titulo).toBeTypeOf("string");
					expect(lesson.titulo.length).toBeGreaterThan(0);
				});

				it("deve ter anime nao vazio", () => {
					expect(lesson.anime).toBeTypeOf("string");
					expect(lesson.anime.length).toBeGreaterThan(0);
				});

				it("deve ter emoji nao vazio", () => {
					expect(lesson.emoji).toBeTypeOf("string");
					expect(lesson.emoji.length).toBeGreaterThan(0);
				});

				it("deve ter modulo valido", () => {
					expect(MODULOS_VALIDOS).toContain(lesson.modulo);
				});

				it("deve ter rank valido", () => {
					expect(RANKS_VALIDOS).toContain(lesson.rank);
				});

				it("deve ter xp maior que zero", () => {
					expect(lesson.xp).toBeGreaterThan(0);
				});

				it("deve ter conceito nao vazio", () => {
					expect(lesson.conceito).toBeTypeOf("string");
					expect(lesson.conceito.length).toBeGreaterThan(0);
				});

				it("deve ter licao nao vazia", () => {
					expect(lesson.licao).toBeTypeOf("string");
					expect(lesson.licao.length).toBeGreaterThan(0);
				});

				it("deve ter exemploCodigo nao vazio", () => {
					expect(lesson.exemploCodigo).toBeTypeOf("string");
					expect(lesson.exemploCodigo.length).toBeGreaterThan(0);
				});

				it("deve ter exercicio nao vazio", () => {
					expect(lesson.exercicio).toBeTypeOf("string");
					expect(lesson.exercicio.length).toBeGreaterThan(0);
				});

				it("deve ter dica nao vazia", () => {
					expect(lesson.dica).toBeTypeOf("string");
					expect(lesson.dica.length).toBeGreaterThan(0);
				});

				it("deve ter completed como booleano", () => {
					expect(lesson.completed).toBeTypeOf("boolean");
				});
			});
		}
	});

	it("nao deve ter ids duplicados", () => {
		const ids = lessons.map((l) => l.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it("todas as licoes devem satisfazer o tipo Lesson (verificacao estrutural)", () => {
		for (const lesson of lessons) {
			expect(lesson).toMatchObject({
				id: expect.any(String),
				titulo: expect.any(String),
				anime: expect.any(String),
				emoji: expect.any(String),
				modulo: expect.any(String),
				rank: expect.any(String),
				xp: expect.any(Number),
				conceito: expect.any(String),
				licao: expect.any(String),
				exemploCodigo: expect.any(String),
				exercicio: expect.any(String),
				dica: expect.any(String),
				completed: expect.any(Boolean),
			});
		}
	});
});
