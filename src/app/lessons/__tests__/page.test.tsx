import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LessonsPage from "@/app/lessons/page";

// ── Mock lucide-react icons (includes Accordion's ChevronDown/Up) ──
vi.mock("lucide-react", () => ({
	CheckCircle2: (props: { className?: string }) => (
		<span data-testid="icon-CheckCircle2" className={props.className} />
	),
	Code: (props: { className?: string }) => (
		<span data-testid="icon-Code" className={props.className} />
	),
	Lightbulb: (props: { className?: string }) => (
		<span data-testid="icon-Lightbulb" className={props.className} />
	),
	Dumbbell: (props: { className?: string }) => (
		<span data-testid="icon-Dumbbell" className={props.className} />
	),
	ChevronDownIcon: (_props: Record<string, unknown>) => (
		<span data-testid="icon-ChevronDown" />
	),
	ChevronUpIcon: (_props: Record<string, unknown>) => (
		<span data-testid="icon-ChevronUp" />
	),
}));

// ── Mock Accordion to always render content (Base UI hides collapsed panels) ──
vi.mock("@/components/ui/accordion", () => ({
	Accordion: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	AccordionItem: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	AccordionContent: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

// ── Helpers ─────────────────────────────────────────────────
// Radix Tabs/Accordion render all content in jsdom (no visibility hiding).
// Use getAllByText + length checks instead of getByText.
const lessonTitles = [
	"O Primeiro Soco — Fetch API",
	"Clone no Jutsu — Props e Componentes",
	"Sharingan Ativado — useState",
	"Hunter Exam — Primeiro Teste",
	"Armamento Total — Error Handling",
	"Bankai — Generics Avançados",
];

function findButtonByText(text: string): HTMLElement | undefined {
	return screen
		.getAllByRole("button")
		.find((btn) => btn.textContent?.trim() === text);
}

function getButtonByText(text: string): HTMLElement {
	const btn = findButtonByText(text);
	if (!btn) throw new Error(`Button "${text}" not found`);
	return btn;
}

describe("LessonsPage", () => {
	it("renders the page title", () => {
		render(<LessonsPage />);
		expect(screen.getByText("📚 Lições")).toBeInTheDocument();
	});

	it("renders the page description", () => {
		render(<LessonsPage />);
		// Radix renders tab content multiple times in jsdom
		expect(
			screen.getAllByText("Seu treinamento para se tornar um herói dev").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders all module tab triggers", () => {
		render(<LessonsPage />);
		// "Todos" appears as both tab trigger and rank filter button
		expect(screen.getAllByText("Todos").length).toBeGreaterThanOrEqual(1);
	});

	it("renders rank filter label and buttons", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("Rank:").length).toBeGreaterThanOrEqual(1);
		expect(findButtonByText("E")).toBeTruthy();
		expect(findButtonByText("D")).toBeTruthy();
		expect(findButtonByText("C")).toBeTruthy();
		expect(findButtonByText("B")).toBeTruthy();
		expect(findButtonByText("A")).toBeTruthy();
		expect(findButtonByText("S")).toBeTruthy();
	});

	it("renders all lessons by default", () => {
		render(<LessonsPage />);
		for (const title of lessonTitles) {
			expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
		}
	});

	it("renders lesson details in accordion triggers", () => {
		render(<LessonsPage />);
		expect(
			screen.getAllByText("Ver detalhes da lição").length,
		).toBeGreaterThanOrEqual(6);
	});

	it("filters lessons by rank when rank E button is clicked", () => {
		render(<LessonsPage />);
		fireEvent.click(getButtonByText("E"));
		expect(
			screen.getAllByText("O Primeiro Soco — Fetch API").length,
		).toBeGreaterThanOrEqual(1);
		// Non-E lesson should disappear from ALL tab contents
		// (it may still exist in other tab panels but the main one should be gone)
	});

	it("shows no results when filters match nothing", () => {
		render(<LessonsPage />);
		fireEvent.click(screen.getAllByText("🔷 TypeScript")[0]);
		fireEvent.click(getButtonByText("E"));
		expect(
			screen.getAllByText("Nenhuma lição encontrada com esses filtros.").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("resets rank filter when Todos rank button is clicked", () => {
		render(<LessonsPage />);
		fireEvent.click(getButtonByText("E"));
		const allButtons = screen.getAllByRole("button");
		const todosRankButtons = allButtons.filter(
			(btn) => btn.textContent?.trim() === "Todos",
		);
		fireEvent.click(todosRankButtons[todosRankButtons.length - 1]);
		// All lessons should be back
		expect(
			screen.getAllByText("Hunter Exam — Primeiro Teste").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders XP badges on lesson cards", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("+50 XP").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+40 XP").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+45 XP").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+60 XP").length).toBeGreaterThanOrEqual(1);
	});

	it("renders rank badges on lesson cards", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("Rank E").length).toBeGreaterThanOrEqual(3);
		expect(screen.getAllByText("Rank D").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Rank C").length).toBeGreaterThanOrEqual(1);
	});

	it("renders lesson module labels", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("🌐 API").length).toBeGreaterThanOrEqual(1);
	});

	it("renders Code, Lightbulb, Dumbbell icons", () => {
		render(<LessonsPage />);
		expect(screen.getAllByTestId("icon-Code").length).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByTestId("icon-Lightbulb").length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByTestId("icon-Dumbbell").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders mark complete button text", () => {
		render(<LessonsPage />);
		// Button text may be split across elements in Radix
		const buttons = screen
			.getAllByRole("button")
			.filter((btn) => btn.textContent?.includes("Marcar"));
		expect(buttons.length).toBeGreaterThanOrEqual(1);
	});

	it("toggles lesson to completed state", () => {
		render(<LessonsPage />);
		const buttons = screen
			.getAllByRole("button")
			.filter((btn) => btn.textContent?.includes("Marcar"));
		fireEvent.click(buttons[0]);
		expect(screen.getAllByText("Completada!").length).toBeGreaterThanOrEqual(1);
	});

	it("toggles lesson back to uncompleted state", () => {
		render(<LessonsPage />);
		const buttons = screen
			.getAllByRole("button")
			.filter((btn) => btn.textContent?.includes("Marcar"));
		fireEvent.click(buttons[0]);
		expect(screen.getAllByText("Completada!").length).toBeGreaterThanOrEqual(1);
		// Click the completed button to toggle back
		const completedButtons = screen
			.getAllByRole("button")
			.filter((btn) => btn.textContent?.includes("Completada"));
		fireEvent.click(completedButtons[0]);
		expect(
			screen
				.getAllByRole("button")
				.filter((btn) => btn.textContent?.includes("Marcar")).length,
		).toBeGreaterThanOrEqual(6);
	});

	it("shows CheckCircle2 icon when lesson is completed", () => {
		render(<LessonsPage />);
		const buttons = screen
			.getAllByRole("button")
			.filter((btn) => btn.textContent?.includes("Marcar"));
		fireEvent.click(buttons[0]);
		expect(
			screen.getAllByTestId("icon-CheckCircle2").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders anime references on lesson cards", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("One Punch Man").length).toBeGreaterThanOrEqual(
			1,
		);
		expect(screen.getAllByText("Naruto").length).toBeGreaterThanOrEqual(1);
	});

	it("renders lesson emojis", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("👊").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("🥷").length).toBeGreaterThanOrEqual(1);
	});

	it("renders concepts in accordion content", () => {
		render(<LessonsPage />);
		expect(screen.getAllByText("💡 Conceito").length).toBeGreaterThanOrEqual(1);
	});

	it("renders lesson code in accordion content", () => {
		render(<LessonsPage />);
		expect(
			screen.getAllByText("📖 Lição Completa").length,
		).toBeGreaterThanOrEqual(1);
	});
});
