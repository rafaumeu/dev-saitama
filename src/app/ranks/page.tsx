"use client";

import { ArrowRight, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getRankByXp, ranks, xpParaProximoRank } from "@/data/ranks";
import type { StudentProgress } from "@/lib/types";

// ── Estado mockado ──────────────────────────────────────────
const student: StudentProgress = {
	studentId: "hero-001",
	nome: "Herói",
	xpTotal: 0,
	rankAtual: "E",
	licoesCompletadas: [],
	streak: 0,
	ultimoLogin: new Date().toISOString(),
	questsCompletadasHoje: [],
};

export default function RanksPage() {
	const currentRank = getRankByXp(student.xpTotal);
	const currentRankIndex = ranks.findIndex((r) => r.rank === currentRank.rank);
	const xpRemaining = xpParaProximoRank(student.xpTotal);
	const nextRank =
		currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null;
	const xpForNext = nextRank
		? nextRank.xpNecessario - currentRank.xpNecessario
		: 0;
	const xpProgress =
		xpForNext > 0
			? ((student.xpTotal - currentRank.xpNecessario) / xpForNext) * 100
			: 100;

	return (
		<div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
			{/* ── Header ─────────────────────────────────────── */}
			<div className="text-center space-y-2">
				<h1 className="text-2xl font-bold flex items-center justify-center gap-2">
					<Crown className="size-6 text-yellow-400" />
					Tabela de Ranks
				</h1>
				<p className="text-sm text-zinc-400">
					Do Recruta ao Saitama — sua jornada de evolução
				</p>
			</div>

			{/* ── Progressão Atual ───────────────────────────── */}
			<Card className="bg-zinc-900 border-white/10">
				<CardContent className="py-6 space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<span className="text-4xl">{currentRank.emoji}</span>
							<div>
								<h3 className="font-bold text-lg">{currentRank.titulo}</h3>
								<p className="text-xs text-zinc-400">
									Rank {currentRank.rank} • {student.xpTotal} XP
								</p>
							</div>
						</div>

						{nextRank && (
							<div className="flex items-center gap-2 text-zinc-500">
								<ArrowRight className="size-5" />
								<span className="text-2xl">{nextRank.emoji}</span>
								<span className="text-sm">{nextRank.titulo}</span>
							</div>
						)}
					</div>

					<div className="space-y-1">
						<div className="flex items-center justify-between text-sm">
							<span className="font-medium">Progresso</span>
							<span className="text-muted-foreground tabular-nums">
								{xpRemaining > 0
									? `${xpRemaining} XP restantes`
									: "Rank máximo!"}
							</span>
						</div>
						<Progress value={xpProgress} />
					</div>
				</CardContent>
			</Card>

			<Separator className="bg-white/10" />

			{/* ── Todos os Ranks ─────────────────────────────── */}
			<div className="space-y-3">
				{ranks.map((rank, index) => {
					const isCurrent = rank.rank === currentRank.rank;
					const isUnlocked = student.xpTotal >= rank.xpNecessario;
					const isPast = index < currentRankIndex;

					return (
						<Card
							key={rank.rank}
							className={`transition-all ${
								isCurrent
									? "bg-zinc-800 border-yellow-400/40 ring-1 ring-yellow-400/20"
									: isPast
										? "bg-zinc-900/60 border-white/5 opacity-60"
										: "bg-zinc-900 border-white/10"
							}`}
						>
							<CardContent className="py-4">
								<div className="flex items-start gap-4">
									{/* Emoji + Rank Letter */}
									<div className="flex flex-col items-center gap-1 w-14 shrink-0">
										<span
											className={`text-3xl ${isCurrent ? "animate-pulse" : ""}`}
										>
											{rank.emoji}
										</span>
										<span
											className={`text-xl font-black ${
												isCurrent ? "text-yellow-400" : rank.cor
											}`}
										>
											{rank.rank}
										</span>
									</div>

									{/* Info */}
									<div className="flex-1 min-w-0 space-y-1">
										<div className="flex items-center gap-2">
											<h3
												className={`font-semibold ${isCurrent ? "text-yellow-400" : ""}`}
											>
												{rank.titulo}
											</h3>
											{isCurrent && (
												<Badge className="bg-yellow-400/20 text-yellow-400 text-[10px]">
													← Você está aqui
												</Badge>
											)}
											{isPast && (
												<Badge variant="secondary" className="text-[10px]">
													✓ Desbloqueado
												</Badge>
											)}
										</div>
										<p className="text-xs text-zinc-400">{rank.descricao}</p>
										<div className="flex items-center gap-2 pt-1">
											<Badge variant="outline" className="text-[10px]">
												{rank.xpNecessario === 0
													? "Inicial"
													: `${rank.xpNecessario} XP necessário`}
											</Badge>
										</div>
									</div>

									{/* Progress indicator */}
									{!isUnlocked && !isCurrent && (
										<div className="text-xs text-zinc-600 shrink-0 text-right">
											<span className="block">
												🔒 {rank.xpNecessario - student.xpTotal} XP para
												desbloquear
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* ── Footer ─────────────────────────────────────── */}
			<div className="text-center py-4">
				<p className="text-xs text-zinc-600">
					🔥 Continue treinando. O rank S não vem para quem desiste.
				</p>
			</div>
		</div>
	);
}
