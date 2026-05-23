// ============================================================
// Dev Saitama - Tipos TypeScript do projeto
// ============================================================

/** Modulos de aprendizado disponiveis */
export type Module = "api" | "tdd" | "excellence" | "typescript";

/** Ranks de dificuldade (quanto mais forte, mais dificil) */
export type Rank = "E" | "D" | "C" | "B" | "A" | "S";

/** Uma licao do Dev Saitama */
export interface Lesson {
	/** Identificador unico em kebab-case */
	id: string;
	/** Titulo da licao */
	titulo: string;
	/** Anime de referencia */
	anime: string;
	/** Emoji representativo */
	emoji: string;
	/** Modulo ao qual a licao pertence */
	modulo: Module;
	/** Rank de dificuldade */
	rank: Rank;
	/** Experiencia ganha ao completar */
	xp: number;
	/** Explicacao do conceito em 2-3 frases */
	conceito: string;
	/** Licao pratica (pode conter markdown) */
	licao: string;
	/** Bloco de codigo TypeScript/React de exemplo */
	exemploCodigo: string;
	/** Instrucao clara do que o aluno deve fazer */
	exercicio: string;
	/** Dica para quando o aluno travar */
	dica: string;
	/** Se a licao foi completada */
	completed: boolean;
}

/** Progresso do aluno */
export interface StudentProgress {
	/** ID do aluno */
	studentId: string;
	/** Nome do aluno */
	nome: string;
	/** XP total acumulado */
	xpTotal: number;
	/** Rank atual */
	rankAtual: Rank;
	/** IDs das licoes completadas */
	licoesCompletadas: string[];
	/** Streak de dias consecutivos */
	streak: number;
	/** Data do ultimo login */
	ultimoLogin: string;
	/** Quotas diarias completadas hoje */
	questsCompletadasHoje: string[];
}

/** Uma quest diaria (estilo Solo Leveling) */
export interface DailyQuest {
	/** Identificador unico */
	id: string;
	/** Titulo da quest */
	titulo: string;
	/** Emoji representativo */
	emoji: string;
	/** Categoria da quest */
	categoria: "componente" | "api" | "tdd" | "debug";
	/** XP ganho ao completar */
	xp: number;
	/** Descricao do que fazer */
	descricao: string;
	/** Como verificar que foi completada */
	verificacao: string;
	/** Se foi completada hoje */
	completed: boolean;
}

/** Informacao de um rank */
export interface RankInfo {
	/** Letra do rank */
	rank: Rank;
	/** XP necessario para alcancar */
	xpNecessario: number;
	/** Titulo heroico */
	titulo: string;
	/** Descricao do nivel */
	descricao: string;
	/** Cor representativa (Tailwind) */
	cor: string;
	/** Emoji do rank */
	emoji: string;
}

/** Estatisticas gerais do aluno */
export interface StudentStats {
	totalLicoes: number;
	licoesCompletadas: number;
	xpTotal: number;
	rankAtual: Rank;
	streak: number;
	questsHoje: number;
}
