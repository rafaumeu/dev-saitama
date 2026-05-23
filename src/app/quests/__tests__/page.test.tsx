import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuestsPage from "@/app/quests/page";

// ── Mock lucide-react icons ─────────────────────────────────
vi.mock("lucide-react", () => ({
	CheckCircle2: (props: { className?: string }) => (
		<span data-testid="icon-CheckCircle2" className={props.className} />
	),
	Circle: (props: { className?: string }) => (
		<span data-testid="icon-Circle" className={props.className} />
	),
	AlertTriangle: (props: { className?: string }) => (
		<span data-testid="icon-AlertTriangle" className={props.className} />
	),
	Skull: (props: { className?: string }) => (
		<span data-testid="icon-Skull" className={props.className} />
	),
}));

// ── Helpers ─────────────────────────────────────────────────
function clickQuestCard(text: string) {
	const el = screen.getAllByText(new RegExp(text))[0];
	const card = el.closest("[data-slot='card']") as HTMLElement;
	if (card) {
		fireEvent.click(card);
	} else {
		fireEvent.click(el);
	}
}

function findProgress(completed: number) {
	return screen.getAllByText(new RegExp(`${completed} de 4 completas`));
}

describe("QuestsPage", () => {
	it("renders the page header", () => {
		render(<QuestsPage />);
		expect(
			screen.getByText("⚔️ Daily Quests — Sistema do Solo Leveling"),
		).toBeInTheDocument();
	});

	it("renders the page description", () => {
		render(<QuestsPage />);
		const descriptions = screen.getAllByText(
			/Complete todas as quests diárias para manter seu streak e ganhar XP/,
		);
		expect(descriptions.length).toBeGreaterThanOrEqual(1);
	});

	it("renders all quest titles within quest cards", () => {
		render(<QuestsPage />);
		const titles = [
			"Criar um Componente React",
			"Consumir uma API",
			"Escrever um Teste",
			"Caçar um Bug",
		];
		for (const title of titles) {
			const matches = screen.getAllByText(new RegExp(title));
			expect(matches.length).toBeGreaterThanOrEqual(1);
		}
	});

	it("renders quest numbers", () => {
		render(<QuestsPage />);
		expect(screen.getAllByText(/Quest #1:/).length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText(/Quest #2:/).length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText(/Quest #3:/).length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText(/Quest #4:/).length).toBeGreaterThanOrEqual(1);
	});

	it("renders progress text initially", () => {
		render(<QuestsPage />);
		expect(findProgress(0).length).toBeGreaterThanOrEqual(1);
	});

	it("renders XP counter initially", () => {
		render(<QuestsPage />);
		const xpTexts = screen.getAllByText("+0 / 150 XP");
		expect(xpTexts.length).toBeGreaterThanOrEqual(1);
	});

	it("renders Circle icons for uncompleted quests", () => {
		render(<QuestsPage />);
		expect(screen.getAllByTestId("icon-Circle").length).toBeGreaterThanOrEqual(
			4,
		);
	});

	it("toggles a quest to completed when clicked", () => {
		render(<QuestsPage />);
		clickQuestCard("Criar um Componente React");
		expect(findProgress(1).length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+30 / 150 XP").length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("shows CheckCircle2 icon for completed quest", () => {
		render(<QuestsPage />);
		clickQuestCard("Criar um Componente React");
		expect(
			screen.getAllByTestId("icon-CheckCircle2").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("toggles a quest back to uncompleted when clicked again", () => {
		render(<QuestsPage />);
		clickQuestCard("Criar um Componente React");
		expect(findProgress(1).length).toBeGreaterThanOrEqual(1);
		clickQuestCard("Criar um Componente React");
		expect(findProgress(0).length).toBeGreaterThanOrEqual(1);
	});

	it("does NOT show all-done message initially", () => {
		render(<QuestsPage />);
		expect(
			screen.queryByText(/Todas as quests completas!/),
		).not.toBeInTheDocument();
	});

	it("shows all-done message when all quests are completed", () => {
		render(<QuestsPage />);
		clickQuestCard("Criar um Componente React");
		clickQuestCard("Consumir uma API");
		clickQuestCard("Escrever um Teste");
		clickQuestCard("Caçar um Bug");
		expect(screen.getByText(/Todas as quests completas!/)).toBeInTheDocument();
	});

	it("renders penalty warning card content", () => {
		render(<QuestsPage />);
		const warnings = screen.getAllByText("Aviso do Sistema");
		expect(warnings.length).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText(/Perda de streak/).length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText(/Penalidade de -50 XP/).length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText(/Status: Deserção/).length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders Skull icon in penalty card", () => {
		render(<QuestsPage />);
		expect(screen.getAllByTestId("icon-Skull").length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("renders AlertTriangle icon in penalty card", () => {
		render(<QuestsPage />);
		expect(
			screen.getAllByTestId("icon-AlertTriangle").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders quest descriptions", () => {
		render(<QuestsPage />);
		expect(
			screen.getAllByText(
				/Crie um componente React funcional com props tipadas/,
			).length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders quest verification sections", () => {
		render(<QuestsPage />);
		expect(screen.getAllByText("✅ Verificação").length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("renders quest category badges", () => {
		render(<QuestsPage />);
		expect(screen.getAllByText("componente").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("api").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("tdd").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("debug").length).toBeGreaterThanOrEqual(1);
	});

	it("renders XP badges for each quest", () => {
		render(<QuestsPage />);
		expect(screen.getAllByText("+30 XP").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+40 XP").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+35 XP").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("+45 XP").length).toBeGreaterThanOrEqual(1);
	});

	it("applies completed styling to completed quest card", () => {
		render(<QuestsPage />);
		clickQuestCard("Criar um Componente React");
		expect(
			screen.getAllByTestId("icon-CheckCircle2").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("shows updated progress after completing multiple quests", () => {
		render(<QuestsPage />);
		clickQuestCard("Criar um Componente React");
		clickQuestCard("Consumir uma API");
		expect(findProgress(2).length).toBeGreaterThanOrEqual(1);
	});
});
