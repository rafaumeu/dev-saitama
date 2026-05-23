"use client";

import { AlertTriangle, CheckCircle2, Circle, Skull } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { dailyQuests } from "@/data/quests";

export default function QuestsPage() {
	const [completedIds, setCompletedIds] = useState<string[]>([]);

	const toggleQuest = (id: string) => {
		setCompletedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const completedCount = completedIds.length;
	const totalXp = dailyQuests.reduce((sum, q) => sum + q.xp, 0);
	const earnedXp = dailyQuests
		.filter((q) => completedIds.includes(q.id))
		.reduce((sum, q) => sum + q.xp, 0);
	const progressPercent = (completedCount / dailyQuests.length) * 100;

	const allDone = completedCount === dailyQuests.length;

	return (
		<div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
			{/* ── Header ─────────────────────────────────────── */}
			<div className="text-center space-y-2">
				<h1 className="text-2xl font-bold">
					⚔️ Daily Quests — Sistema do Solo Leveling
				</h1>
				<p className="text-sm text-zinc-400">
					Complete todas as quests diárias para manter seu streak e ganhar XP.
				</p>
			</div>

			<Separator className="bg-white/10" />

			{/* ── Progresso Geral ────────────────────────────── */}
			<div className="space-y-2">
				<div className="space-y-1">
					<div className="flex items-center justify-between text-sm">
						<span className="font-medium">
							{completedCount} de {dailyQuests.length} completas
						</span>
						<span className="text-muted-foreground tabular-nums">
							+{earnedXp} / {totalXp} XP
						</span>
					</div>
					<Progress value={progressPercent} />
				</div>

				{allDone && (
					<div className="text-center py-2">
						<span className="text-sm text-green-400 font-semibold flex items-center justify-center gap-2">
							<CheckCircle2 className="size-4" />
							Todas as quests completas! Herói exemplar! 🎉
						</span>
					</div>
				)}
			</div>

			{/* ── Lista de Quests ────────────────────────────── */}
			<div className="space-y-4">
				{dailyQuests.map((quest, index) => {
					const isCompleted = completedIds.includes(quest.id);

					return (
						<Card
							key={quest.id}
							className={`bg-zinc-900 border-white/10 transition-all cursor-pointer ${
								isCompleted
									? "border-green-500/30 bg-green-500/5"
									: "hover:border-white/20"
							}`}
							onClick={() => toggleQuest(quest.id)}
						>
							<CardContent className="py-4 space-y-3">
								{/* Top row */}
								<div className="flex items-start gap-3">
									<div className="mt-0.5">
										{isCompleted ? (
											<CheckCircle2 className="size-5 text-green-400" />
										) : (
											<Circle className="size-5 text-zinc-600" />
										)}
									</div>

									<span className="text-3xl">{quest.emoji}</span>

									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<h3
												className={`font-semibold text-sm ${
													isCompleted ? "line-through text-zinc-500" : ""
												}`}
											>
												Quest #{index + 1}: {quest.titulo}
											</h3>
											<Badge
												variant="secondary"
												className="text-yellow-400 bg-yellow-400/10 text-xs shrink-0"
											>
												+{quest.xp} XP
											</Badge>
										</div>
										<Badge variant="outline" className="text-[10px] mt-1">
											{quest.categoria}
										</Badge>
									</div>
								</div>

								{/* Description */}
								<div className="pl-11 space-y-2">
									<p className="text-xs text-zinc-400">{quest.descricao}</p>

									{/* Verification */}
									<div className="bg-black/40 rounded-md p-3">
										<p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-1">
											✅ Verificação
										</p>
										<p className="text-xs text-zinc-400">{quest.verificacao}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* ── Aviso de Penalidade ────────────────────────── */}
			<Separator className="bg-white/10" />

			<Card className="bg-red-950/30 border-red-500/20">
				<CardContent className="py-4">
					<div className="flex items-start gap-3">
						<Skull className="size-6 text-red-400 shrink-0 mt-0.5" />
						<div className="space-y-2">
							<h3 className="text-sm font-semibold text-red-400 flex items-center gap-1.5">
								<AlertTriangle className="size-4" />
								Aviso do Sistema
							</h3>
							<p className="text-xs text-zinc-400">
								Heróis que não completam suas quests diárias perdem o streak
								acumulado. O sistema <strong>não tem pena</strong>.
							</p>
							<p className="text-xs text-red-400/80 italic">
								&quot;Se você falhar em completar as quests de hoje, o sistema
								considerará que você fugiu da batalha. E fugir... tem
								consequências.&quot;
							</p>
							<div className="flex items-center gap-4 text-xs text-zinc-500 pt-1">
								<span>❌ Perda de streak</span>
								<span>📉 Penalidade de -50 XP</span>
								<span>💀 Status: Deserção</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
