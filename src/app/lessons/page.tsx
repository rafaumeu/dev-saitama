"use client";

import { CheckCircle2, Code, Dumbbell, Lightbulb } from "lucide-react";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lessons } from "@/data/lessons";
import type { Module, Rank } from "@/lib/types";

// biome-ignore lint/correctness/noUnusedVariables: used via index access moduleLabels[lesson.modulo]
const moduleLabels: Record<Module, string> = {
	api: "🌐 API",
	tdd: "🧪 TDD",
	excellence: "⭐ Excellence",
	typescript: "🔷 TypeScript",
};

const allRanks: Rank[] = ["E", "D", "C", "B", "A", "S"];

export default function LessonsPage() {
	const [activeModule, setActiveModule] = useState<string>("todos");
	const [activeRank, setActiveRank] = useState<Rank | "todos">("todos");
	const [completedLessons, setCompletedLessons] = useState<string[]>([]);

	const filtered = lessons.filter((l) => {
		const matchModule = activeModule === "todos" || l.modulo === activeModule;
		const matchRank = activeRank === "todos" || l.rank === activeRank;
		return matchModule && matchRank;
	});

	const toggleComplete = (id: string) => {
		setCompletedLessons((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
			{/* ── Header ─────────────────────────────────────── */}
			<div>
				<h1 className="text-2xl font-bold flex items-center gap-2">
					📚 Lições
				</h1>
				<p className="text-sm text-zinc-400 mt-1">
					Seu treinamento para se tornar um herói dev
				</p>
			</div>

			<Separator className="bg-white/10" />

			{/* ── Filtro por Módulo (Tabs) ───────────────────── */}
			<Tabs defaultValue="todos" onValueChange={setActiveModule}>
				<TabsList>
					<TabsTrigger value="todos">Todos</TabsTrigger>
					<TabsTrigger value="api">🌐 API</TabsTrigger>
					<TabsTrigger value="tdd">🧪 TDD</TabsTrigger>
					<TabsTrigger value="excellence">⭐ Excellence</TabsTrigger>
					<TabsTrigger value="typescript">🔷 TypeScript</TabsTrigger>
				</TabsList>

				{/* ── Filtro por Rank ──────────────────────────── */}
				<div className="flex items-center gap-2 flex-wrap mt-4">
					<span className="text-xs text-zinc-500">Rank:</span>
					<Button
						variant={activeRank === "todos" ? "default" : "ghost"}
						size="sm"
						onClick={() => setActiveRank("todos")}
						className="h-7 text-xs"
					>
						Todos
					</Button>
					{allRanks.map((rank) => (
						<Button
							key={rank}
							variant={activeRank === rank ? "default" : "ghost"}
							size="sm"
							onClick={() => setActiveRank(rank)}
							className="h-7 text-xs"
						>
							{rank}
						</Button>
					))}
				</div>

				{/* ── Grid de Lições ──────────────────────────── */}
				<div className="mt-6">
					<TabsContent value="todos">
						<LessonsGrid
							lessons={filtered}
							completedLessons={completedLessons}
							onToggle={toggleComplete}
						/>
					</TabsContent>
					<TabsContent value="api">
						<LessonsGrid
							lessons={filtered}
							completedLessons={completedLessons}
							onToggle={toggleComplete}
						/>
					</TabsContent>
					<TabsContent value="tdd">
						<LessonsGrid
							lessons={filtered}
							completedLessons={completedLessons}
							onToggle={toggleComplete}
						/>
					</TabsContent>
					<TabsContent value="excellence">
						<LessonsGrid
							lessons={filtered}
							completedLessons={completedLessons}
							onToggle={toggleComplete}
						/>
					</TabsContent>
					<TabsContent value="typescript">
						<LessonsGrid
							lessons={filtered}
							completedLessons={completedLessons}
							onToggle={toggleComplete}
						/>
					</TabsContent>
				</div>
			</Tabs>

			{filtered.length === 0 && (
				<div className="text-center py-12 text-zinc-500">
					<span className="text-4xl block mb-2">🔍</span>
					<p>Nenhuma lição encontrada com esses filtros.</p>
				</div>
			)}
		</div>
	);
}

// ── Sub-component: Grid de Lições ────────────────────────────
function LessonsGrid({
	lessons,
	completedLessons,
	onToggle,
}: {
	lessons: typeof import("@/data/lessons").lessons;
	completedLessons: string[];
	onToggle: (id: string) => void;
}) {
	const moduleLabels: Record<string, string> = {
		api: "🌐 API",
		tdd: "🧪 TDD",
		excellence: "⭐ Excellence",
		typescript: "🔷 TypeScript",
	};

	return (
		<div className="grid gap-4 md:grid-cols-2">
			{lessons.map((lesson) => {
				const isCompleted = completedLessons.includes(lesson.id);
				return (
					<Card
						key={lesson.id}
						className={`bg-zinc-900 border-white/10 ${
							isCompleted ? "opacity-60" : ""
						}`}
					>
						<CardHeader>
							<div className="flex items-start justify-between gap-2">
								<div className="flex items-center gap-2">
									<span className="text-2xl">{lesson.emoji}</span>
									<CardTitle className="text-sm">{lesson.titulo}</CardTitle>
								</div>
								<div className="flex items-center gap-1.5 shrink-0">
									<Badge variant="outline" className="text-[10px]">
										Rank {lesson.rank}
									</Badge>
									<Badge
										variant="secondary"
										className="text-[10px] text-yellow-400 bg-yellow-400/10"
									>
										+{lesson.xp} XP
									</Badge>
								</div>
							</div>
							<div className="flex items-center gap-2 text-xs text-zinc-500">
								<span>{lesson.anime}</span>
								<span>•</span>
								<span>{moduleLabels[lesson.modulo]}</span>
							</div>
						</CardHeader>

						<CardContent>
							<Accordion>
								<AccordionItem value={lesson.id}>
									<AccordionTrigger className="text-xs text-zinc-400 hover:text-white">
										Ver detalhes da lição
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 pt-2">
											{/* Conceito */}
											<div>
												<h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1 mb-1">
													💡 Conceito
												</h4>
												<p className="text-xs text-zinc-400">
													{lesson.conceito}
												</p>
											</div>

											{/* Lição */}
											<div>
												<h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1 mb-1">
													📖 Lição Completa
												</h4>
												<div className="text-xs text-zinc-400 bg-black/40 rounded-md p-3 whitespace-pre-line">
													{lesson.licao}
												</div>
											</div>

											{/* Código */}
											<div>
												<h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1 mb-1">
													<Code className="size-3" /> Código
												</h4>
												<pre className="text-[11px] text-green-400 bg-black/60 rounded-md p-3 overflow-x-auto font-mono">
													<code>{lesson.exemploCodigo}</code>
												</pre>
											</div>

											{/* Exercício */}
											<div>
												<h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1 mb-1">
													<Dumbbell className="size-3" /> Exercício
												</h4>
												<p className="text-xs text-zinc-400">
													{lesson.exercicio}
												</p>
											</div>

											{/* Dica */}
											<div>
												<h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1 mb-1">
													<Lightbulb className="size-3" /> Dica
												</h4>
												<p className="text-xs text-yellow-400/80">
													{lesson.dica}
												</p>
											</div>

											{/* Completar */}
											<Button
												size="sm"
												variant={isCompleted ? "ghost" : "default"}
												className={isCompleted ? "text-green-400" : "w-full"}
												onClick={(e) => {
													e.stopPropagation();
													onToggle(lesson.id);
												}}
											>
												{isCompleted ? (
													<>
														<CheckCircle2 className="size-4 mr-1" /> Completada!
													</>
												) : (
													"Marcar como completada"
												)}
											</Button>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
