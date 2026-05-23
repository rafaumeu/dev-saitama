import type { RankInfo } from "@/lib/types";

// ============================================================
// Dev Saitama - Tabela de Ranks
// Quanto mais forte o rank, mais dificil o conteudo
// ============================================================

export const ranks: RankInfo[] = [
	{
		rank: "E",
		xpNecessario: 0,
		titulo: "Recruta",
		descricao:
			"Todo heroi comeca de algum lugar. Voce esta dando os primeiros passos no mundo dev. Foque nos fundamentos e nao tenha pressa.",
		cor: "text-gray-400",
		emoji: "🌱",
	},
	{
		rank: "D",
		xpNecessario: 200,
		titulo: "Gennin",
		descricao:
			"Voce ja entende o basico. Agora e hora de comecar a juntar tecnicas e construir coisas reais. Os desafios ficam mais interessantes.",
		cor: "text-green-400",
		emoji: "🍃",
	},
	{
		rank: "C",
		xpNecessario: 500,
		titulo: "Chuunin",
		descricao:
			"Voce nao e mais um novato. Consegue trabalhar em equipe, escrever testes e consumir APIs com confianca. O mundo dev se abre pra voce.",
		cor: "text-blue-400",
		emoji: "⚔️",
	},
	{
		rank: "B",
		xpNecessario: 1000,
		titulo: "Jounin",
		descricao:
			"Voce e um profissional competente. Entende de seguranca, arquitetura e consegue revisar codigo dos outros. Poucos chegam aqui.",
		cor: "text-purple-400",
		emoji: "🛡️",
	},
	{
		rank: "A",
		xpNecessario: 2000,
		titulo: "Kage",
		descricao:
			"Voce domina multiplos dominios. Pode liderar projetos, definir padroes e ensinar outros. Seu codigo e referencia.",
		cor: "text-orange-400",
		emoji: "👑",
	},
	{
		rank: "S",
		xpNecessario: 4000,
		titulo: "Saitama",
		descricao:
			"Um punch man. Voce esmagou todos os desafios e alcançou o rank maximo. Mas o verdadeiro heroi sabe que sempre ha mais pra aprender.",
		cor: "text-yellow-400",
		emoji: "👊",
	},
];

/** Helper: descobre o rank baseado no XP total */
export function getRankByXp(xp: number): RankInfo {
	// Percorre de tras pra frente, pegando o primeiro rank que o XP bate
	for (let i = ranks.length - 1; i >= 0; i--) {
		if (xp >= ranks[i].xpNecessario) {
			return ranks[i];
		}
	}
	return ranks[0];
}

/** Helper:XP necessario para o proximo rank */
export function xpParaProximoRank(xpAtual: number): number {
	const rankAtual = getRankByXp(xpAtual);
	const indexAtual = ranks.findIndex((r) => r.rank === rankAtual.rank);

	// Se ja esta no rank maximo
	if (indexAtual === ranks.length - 1) return 0;

	const proximoRank = ranks[indexAtual + 1];
	return proximoRank.xpNecessario - xpAtual;
}
