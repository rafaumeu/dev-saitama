"use client";

import {
	ArrowRight,
	BookOpen,
	CheckCircle2,
	Circle,
	Flame,
	Trophy,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { lessons } from "@/data/lessons";
import { dailyQuests } from "@/data/quests";
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

const quotes = [
	'"Eu não sou um herói porque sou forte. Eu sou forte porque sou um herói." — Saitama',
	'"100 flexões, 100 abdominais, 100 agachamentos, 10km de corrida. Todo dia!"',
	'"O segredo é não desistir. Mesmo quando parece impossível." — Naruto',
	'"A pessoa que desiste nunca vence. A pessoa que vence nunca desiste."',
	'"Se você não arriscar, não pode ganhar. Se não ganhar, não pode evoluir." — Solo Leveling',
];

export default function DashboardPage() {
	const [completedQuests, setCompletedQuests] = useState<string[]>(
		student.questsCompletadasHoje,
	);

	const currentRank = getRankByXp(student.xpTotal);
	const xpRemaining = xpParaProximoRank(student.xpTotal);
	const nextRank = ranks.find(
		(r) =>
			ranks.indexOf(r) ===
			ranks.findIndex((rr) => rr.rank === currentRank.rank) + 1,
	);
	const xpForNext = nextRank
		? nextRank.xpNecessario - currentRank.xpNecessario
		: 0;
	const xpProgress =
		xpForNext > 0
			? ((student.xpTotal - currentRank.xpNecessario) / xpForNext) * 100
			: 100;

	const completedLessons = lessons.filter((l) => l.completed);
	const nextLessons = lessons
		.filter((l) => !l.completed)
		.sort((a, b) => {
			const rankOrder = ["E", "D", "C", "B", "A", "S"];
			return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
		})
		.slice(0, 3);

	const totalQuestXp = dailyQuests.reduce((acc, q) => acc + q.xp, 0);
	const completedQuestXp = dailyQuests
		.filter((q) => completedQuests.includes(q.id))
		.reduce((acc, q) => acc + q.xp, 0);

	const toggleQuest = (questId: string) => {
		setCompletedQuests((prev) =>
			prev.includes(questId)
				? prev.filter((id) => id !== questId)
				: [...prev, questId],
		);
	};

	const randomQuote = quotes[Math.floor(Date.now() / 86400000) % quotes.length];

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
			{/* ── Header ─────────────────────────────────────── */}
			<header className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="text-4xl">👊</span>
						<div>
							<h1 className="text-2xl font-bold">Dev Saitama</h1>
							<p className="text-sm text-zinc-400">Bem-vindo, {student.nome}</p>
						</div>
					</div>
					<div className="text-right">
						<div className="flex items-center gap-2 justify-end">
							<span className="text-2xl">{currentRank.emoji}</span>
							<span className="text-lg font-bold">{currentRank.titulo}</span>
							<Badge variant="outline" className="text-xs">
								Rank {currentRank.rank}
							</Badge>
						</div>
						<p className="text-xs text-zinc-500 mt-1">
							{xpRemaining > 0
								? `${xpRemaining} XP para o próximo rank`
								: "Rank máximo alcançado!"}
						</p>
					</div>
				</div>

				{/* XP Bar */}
				<div className="space-y-1">
					<div className="flex items-center justify-between text-sm">
						<span className="font-medium">XP</span>
						<span className="text-muted-foreground tabular-nums">
							{student.xpTotal} XP
						</span>
					</div>
					<Progress value={xpProgress} />
				</div>
			</header>

			<Separator className="bg-white/10" />

			{/* ── Stats Cards ────────────────────────────────── */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<Card className="bg-zinc-900 border-white/10">
					<CardContent className="flex flex-col items-center gap-1 py-4">
						<BookOpen className="size-5 text-blue-400" />
						<span className="text-2xl font-bold">
							{completedLessons.length}
							<span className="text-zinc-500 text-base">/{lessons.length}</span>
						</span>
						<span className="text-xs text-zinc-400">Lições</span>
					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-white/10">
					<CardContent className="flex flex-col items-center gap-1 py-4">
						<Zap className="size-5 text-yellow-400" />
						<span className="text-2xl font-bold">{student.xpTotal}</span>
						<span className="text-xs text-zinc-400">XP Total</span>
					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-white/10">
					<CardContent className="flex flex-col items-center gap-1 py-4">
						<Flame className="size-5 text-orange-400" />
						<span className="text-2xl font-bold">{student.streak}</span>
						<span className="text-xs text-zinc-400">Streak</span>
					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-white/10">
					<CardContent className="flex flex-col items-center gap-1 py-4">
						<Trophy className="size-5 text-purple-400" />
						<span className="text-2xl font-bold">{currentRank.rank}</span>
						<span className="text-xs text-zinc-400">Rank</span>
					</CardContent>
				</Card>
			</div>

			{/* ── Daily Quests ───────────────────────────────── */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold flex items-center gap-2">
						<span>🎯</span> Daily Quests
					</h2>
					<Link href="/quests">
						<Button variant="ghost" size="sm" className="text-zinc-400 gap-1">
							Ver todas <ArrowRight className="size-3" />
						</Button>
					</Link>
				</div>

				<div className="grid gap-3">
					{dailyQuests.map((quest) => {
						const isCompleted = completedQuests.includes(quest.id);
						return (
							<Card
								key={quest.id}
								className={`bg-zinc-900 border-white/10 transition-all cursor-pointer ${
									isCompleted ? "opacity-60" : "hover:border-white/20"
								}`}
								onClick={() => toggleQuest(quest.id)}
							>
								<CardContent className="flex items-center gap-3 py-3">
									{isCompleted ? (
										<CheckCircle2 className="size-5 text-green-400 shrink-0" />
									) : (
										<Circle className="size-5 text-zinc-500 shrink-0" />
									)}
									<span className="text-2xl">{quest.emoji}</span>
									<span
										className={`flex-1 text-sm ${
											isCompleted ? "line-through text-zinc-500" : ""
										}`}
									>
										{quest.titulo}
									</span>
									<Badge
										variant="secondary"
										className="text-yellow-400 bg-yellow-400/10"
									>
										+{quest.xp} XP
									</Badge>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-xs text-zinc-500 text-center">
					{completedQuests.length}/{dailyQuests.length} completas —{" "}
					{completedQuestXp}/{totalQuestXp} XP disponível
				</div>
			</section>

			<Separator className="bg-white/10" />

			{/* ── Próximas Lições ────────────────────────────── */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold flex items-center gap-2">
						<span>📚</span> Próximas Lições
					</h2>
					<Link href="/lessons">
						<Button variant="ghost" size="sm" className="text-zinc-400 gap-1">
							Ver todas <ArrowRight className="size-3" />
						</Button>
					</Link>
				</div>

				<div className="grid md:grid-cols-3 gap-4">
					{nextLessons.map((lesson) => (
						<Card
							key={lesson.id}
							className="bg-zinc-900 border-white/10 hover:border-white/20 transition-colors"
						>
							<CardHeader>
								<div className="flex items-center gap-2">
									<span className="text-2xl">{lesson.emoji}</span>
									<CardTitle className="text-sm">{lesson.titulo}</CardTitle>
								</div>
							</CardHeader>
							<CardContent className="space-y-2">
								<p className="text-xs text-zinc-400">{lesson.anime}</p>
								<div className="flex items-center gap-2">
									<Badge variant="outline" className="text-xs">
										Rank {lesson.rank}
									</Badge>
									<Badge
										variant="secondary"
										className="text-xs text-yellow-400 bg-yellow-400/10"
									>
										+{lesson.xp} XP
									</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* ── Footer Quote ───────────────────────────────── */}
			<footer className="text-center py-8 border-t border-white/5">
				<p className="text-sm text-zinc-500 italic">{randomQuote}</p>
			</footer>
		</div>
	);
}
