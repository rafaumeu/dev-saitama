import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// ── Hoisted mocks (vi.hoisted runs BEFORE vi.mock) ─────────
const { mockGetRankByXp, mockXpParaProximoRank } = vi.hoisted(() => ({
	mockGetRankByXp: vi.fn(),
	mockXpParaProximoRank: vi.fn(),
}));

vi.mock("@/data/ranks", async (importOriginal) => {
	const original = await importOriginal<typeof import("@/data/ranks")>();
	return {
		...original,
		getRankByXp: mockGetRankByXp,
		xpParaProximoRank: mockXpParaProximoRank,
	};
});

// ── Mock next/link ──────────────────────────────────────────
vi.mock("next/link", () => {
	function MockLink(props: React.PropsWithChildren<{ href: string }>) {
		return (
			<a href={props.href} data-testid="mock-link">
				{props.children}
			</a>
		);
	}
	return { default: MockLink };
});

// ── Mock lucide-react icons ─────────────────────────────────
vi.mock("lucide-react", () => ({
	BookOpen: (props: { className?: string }) => (
		<span data-testid="icon-BookOpen" className={props.className} />
	),
	Flame: (props: { className?: string }) => (
		<span data-testid="icon-Flame" className={props.className} />
	),
	Trophy: (props: { className?: string }) => (
		<span data-testid="icon-Trophy" className={props.className} />
	),
	Zap: (props: { className?: string }) => (
		<span data-testid="icon-Zap" className={props.className} />
	),
	CheckCircle2: (props: { className?: string }) => (
		<span data-testid="icon-CheckCircle2" className={props.className} />
	),
	Circle: (props: { className?: string }) => (
		<span data-testid="icon-Circle" className={props.className} />
	),
	ArrowRight: (props: { className?: string }) => (
		<span data-testid="icon-ArrowRight" className={props.className} />
	),
}));

// ── Import AFTER mocks ──────────────────────────────────────
import DashboardPage from "@/app/page";

// ── Default mock values (rank E, 0 XP) ──────────────────────
const defaultRank = {
	rank: "E" as const,
	titulo: "Recruta",
	xpNecessario: 0,
	emoji: "🌱",
};

function resetMocks() {
	mockGetRankByXp.mockReturnValue(defaultRank);
	mockXpParaProximoRank.mockReturnValue(200);
}

// ── Helpers ─────────────────────────────────────────────────
const questTitles = [
	"Criar um Componente React",
	"Consumir uma API",
	"Escrever um Teste",
	"Caçar um Bug",
];

function clickQuestCard(text: string) {
	const el = screen.getAllByText(text)[0];
	const card = el.closest("[data-slot='card']") as HTMLElement;
	if (card) {
		fireEvent.click(card);
	} else {
		fireEvent.click(el);
	}
}

function findProgressText(completed: number, total: number) {
	const regex = new RegExp(`${completed}/${total} completas`);
	return screen.getAllByText(regex);
}

describe("DashboardPage", () => {
	beforeEach(resetMocks);
	afterEach(() => {
		mockGetRankByXp.mockReset();
		mockXpParaProximoRank.mockReset();
	});

	it("renders the page header with title and student name", () => {
		render(<DashboardPage />);
		expect(screen.getByText("Dev Saitama")).toBeInTheDocument();
		expect(screen.getByText(/Bem-vindo, Herói/)).toBeInTheDocument();
	});

	it("renders the current rank display", () => {
		render(<DashboardPage />);
		expect(screen.getAllByText("Recruta").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Rank E").length).toBeGreaterThanOrEqual(1);
	});

	it("renders XP information for student with 0 XP", () => {
		render(<DashboardPage />);
		expect(screen.getAllByText("0 XP").length).toBeGreaterThanOrEqual(1);
	});

	it("renders XP remaining message when not at max rank", () => {
		render(<DashboardPage />);
		const matches = screen.getAllByText(/XP para o próximo rank/);
		expect(matches.length).toBeGreaterThanOrEqual(1);
	});

	it("renders stats cards with correct values", () => {
		render(<DashboardPage />);
		expect(screen.getAllByText("XP Total").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Streak").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Rank").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Lições").length).toBeGreaterThanOrEqual(1);
	});

	it("renders the Daily Quests section", () => {
		render(<DashboardPage />);
		const headings = screen.getAllByText(/Daily Quests/);
		expect(headings.length).toBeGreaterThanOrEqual(1);
	});

	it("renders all daily quests", () => {
		render(<DashboardPage />);
		for (const title of questTitles) {
			expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
		}
	});

	it("renders XP badge for each quest", () => {
		render(<DashboardPage />);
		const xpBadges = screen.getAllByText(/\+\d+ XP/);
		expect(xpBadges.length).toBeGreaterThanOrEqual(4);
	});

	it("renders the completed/total quest counter", () => {
		render(<DashboardPage />);
		expect(findProgressText(0, 4).length).toBeGreaterThanOrEqual(1);
	});

	it("toggles a quest when clicked", () => {
		render(<DashboardPage />);
		clickQuestCard("Criar um Componente React");
		expect(findProgressText(1, 4).length).toBeGreaterThanOrEqual(1);
	});

	it("toggles a quest back off when clicked again", () => {
		render(<DashboardPage />);
		clickQuestCard("Criar um Componente React");
		expect(findProgressText(1, 4).length).toBeGreaterThanOrEqual(1);
		clickQuestCard("Criar um Componente React");
		expect(findProgressText(0, 4).length).toBeGreaterThanOrEqual(1);
	});

	it("shows CheckCircle2 icon for completed quest", () => {
		render(<DashboardPage />);
		clickQuestCard("Criar um Componente React");
		expect(screen.getAllByTestId("icon-CheckCircle2").length).toBeGreaterThan(
			0,
		);
	});

	it("shows Circle icon for uncompleted quests initially", () => {
		render(<DashboardPage />);
		expect(screen.getAllByTestId("icon-Circle").length).toBeGreaterThanOrEqual(
			4,
		);
	});

	it("renders the Próximas Lições section", () => {
		render(<DashboardPage />);
		const headings = screen.getAllByText(/Próximas Lições/);
		expect(headings.length).toBeGreaterThanOrEqual(1);
	});

	it("renders next lesson cards", () => {
		render(<DashboardPage />);
		const lessonTitles = screen.getAllByText("O Primeiro Soco — Fetch API");
		expect(lessonTitles.length).toBeGreaterThanOrEqual(1);
	});

	it("renders link to /quests page", () => {
		render(<DashboardPage />);
		const links = screen.getAllByTestId("mock-link");
		const questsLink = links.find((l) => l.getAttribute("href") === "/quests");
		expect(questsLink).toBeTruthy();
	});

	it("renders link to /lessons page", () => {
		render(<DashboardPage />);
		const links = screen.getAllByTestId("mock-link");
		const lessonsLink = links.find(
			(l) => l.getAttribute("href") === "/lessons",
		);
		expect(lessonsLink).toBeTruthy();
	});

	it("renders the footer quote", () => {
		render(<DashboardPage />);
		const footer = document.querySelector("footer");
		expect(footer).toBeTruthy();
	});

	it("renders rank emoji in header", () => {
		render(<DashboardPage />);
		expect(screen.getAllByText("🌱").length).toBeGreaterThanOrEqual(1);
	});

	it("displays correct XP progress text", () => {
		render(<DashboardPage />);
		const matches = screen.getAllByText("200 XP para o próximo rank");
		expect(matches.length).toBeGreaterThanOrEqual(1);
	});

	it("renders quest XP summary", () => {
		render(<DashboardPage />);
		const matches = screen.getAllByText(/0\/150 XP disponível/);
		expect(matches.length).toBeGreaterThanOrEqual(1);
	});

	it("updates XP summary after completing a quest", () => {
		render(<DashboardPage />);
		clickQuestCard("Criar um Componente React");
		const matches = screen.getAllByText(/30\/150 XP disponível/);
		expect(matches.length).toBeGreaterThanOrEqual(1);
	});
});

// ── Max rank scenario (rank S) ──────────────────────────────
describe("DashboardPage — max rank", () => {
	beforeEach(() => {
		mockGetRankByXp.mockReturnValue({
			rank: "S",
			titulo: "Saitama",
			xpNecessario: 10000,
			emoji: "💪",
		});
		mockXpParaProximoRank.mockReturnValue(0);
	});

	it("shows 'Rank máximo alcançado!' when at max rank", () => {
		render(<DashboardPage />);
		expect(
			screen.getAllByText("Rank máximo alcançado!").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders Saitama rank name and emoji", () => {
		render(<DashboardPage />);
		expect(screen.getAllByText("Saitama").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Rank S").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("💪").length).toBeGreaterThanOrEqual(1);
	});
});
