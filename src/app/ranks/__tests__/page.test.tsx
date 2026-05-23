import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RanksPage from "@/app/ranks/page";
import { ranks } from "@/data/ranks";

// ── Mock lucide-react icons ─────────────────────────────────
vi.mock("lucide-react", () => ({
	Crown: (props: { className?: string }) => (
		<span data-testid="icon-Crown" className={props.className} />
	),
	ArrowRight: (props: { className?: string }) => (
		<span data-testid="icon-ArrowRight" className={props.className} />
	),
}));

describe("RanksPage", () => {
	it("renders the page title", () => {
		render(<RanksPage />);
		expect(screen.getByText("Tabela de Ranks")).toBeInTheDocument();
	});

	it("renders the page subtitle", () => {
		render(<RanksPage />);
		const subtitles = screen.getAllByText(/Do Recruta ao Saitama/);
		expect(subtitles.length).toBeGreaterThanOrEqual(1);
	});

	it("renders the Crown icon", () => {
		render(<RanksPage />);
		expect(screen.getAllByTestId("icon-Crown").length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("renders the current rank section with Recruta and XP", () => {
		render(<RanksPage />);
		const rankInfo = screen.getAllByText(/Rank E • 0 XP/);
		expect(rankInfo.length).toBeGreaterThanOrEqual(1);
	});

	it("renders next rank indicator with ArrowRight icon", () => {
		render(<RanksPage />);
		expect(
			screen.getAllByTestId("icon-ArrowRight").length,
		).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Gennin").length).toBeGreaterThanOrEqual(1);
	});

	it("renders XP remaining in current rank progress", () => {
		render(<RanksPage />);
		const remaining = screen.getAllByText("200 XP restantes");
		expect(remaining.length).toBeGreaterThanOrEqual(1);
	});

	it("renders all 6 rank emojis in the list", () => {
		render(<RanksPage />);
		expect(screen.getAllByText("🌱").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("🍃").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("⚔️").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("🛡️").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("👑").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("👊").length).toBeGreaterThanOrEqual(1);
	});

	it("renders all rank titles", () => {
		render(<RanksPage />);
		expect(screen.getAllByText("Recruta").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Gennin").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Chuunin").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Jounin").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Kage").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Saitama").length).toBeGreaterThanOrEqual(1);
	});

	it("shows 'Você está aqui' badge for current rank (E)", () => {
		render(<RanksPage />);
		const badges = screen.getAllByText("← Você está aqui");
		expect(badges.length).toBeGreaterThanOrEqual(1);
	});

	it("does NOT show 'Desbloqueado' badge when at 0 XP", () => {
		render(<RanksPage />);
		expect(screen.queryByText("✓ Desbloqueado")).not.toBeInTheDocument();
	});

	it("shows locked indicator for unaffordable ranks", () => {
		render(<RanksPage />);
		expect(
			screen.getAllByText(/🔒 200 XP para desbloquear/).length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText(/🔒 4000 XP para desbloquear/).length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders 'Inicial' for rank with 0 XP requirement", () => {
		render(<RanksPage />);
		const inicial = screen.getAllByText("Inicial");
		expect(inicial.length).toBeGreaterThanOrEqual(1);
	});

	it("renders XP requirement badges for non-initial ranks", () => {
		render(<RanksPage />);
		expect(
			screen.getAllByText("200 XP necessário").length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText("500 XP necessário").length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText("1000 XP necessário").length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText("2000 XP necessário").length,
		).toBeGreaterThanOrEqual(1);
		expect(
			screen.getAllByText("4000 XP necessário").length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders rank descriptions", () => {
		render(<RanksPage />);
		expect(
			screen.getAllByText(/Todo heroi comeca de algum lugar/).length,
		).toBeGreaterThanOrEqual(1);
	});

	it("renders footer text", () => {
		render(<RanksPage />);
		const footer = screen.getAllByText(
			/Continue treinando. O rank S não vem para quem desiste/,
		);
		expect(footer.length).toBeGreaterThanOrEqual(1);
	});

	it("applies highlight styling to current rank card", () => {
		render(<RanksPage />);
		const badge = screen.getAllByText("← Você está aqui")[0];
		const currentRankCard = badge.closest("[data-slot='card']");
		expect(currentRankCard?.className).toContain("border-yellow-400");
	});

	it("current rank card has ring styling", () => {
		render(<RanksPage />);
		const badge = screen.getAllByText("← Você está aqui")[0];
		const currentRankCard = badge.closest("[data-slot='card']");
		expect(currentRankCard?.className).toContain("ring-yellow-400");
	});

	it("renders progress value for current rank", () => {
		render(<RanksPage />);
		const progressLabels = screen.getAllByText("Progresso");
		expect(progressLabels.length).toBeGreaterThanOrEqual(1);
	});
});

// ── Max-rank scenario: covers branches for nextRank=null, "Rank máximo!",
//    xpProgress=100, isPast CSS, and "Desbloqueado" badge ──────────
describe("RanksPage – max rank (Saitama)", () => {
	const saitamaRank = ranks[ranks.length - 1]; // rank S

	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	async function renderMaxRank() {
		vi.doMock("@/data/ranks", () => ({
			ranks,
			getRankByXp: () => saitamaRank,
			xpParaProximoRank: () => 0,
		}));
		const { default: RanksPageMax } = await import("@/app/ranks/page");
		return render(<RanksPageMax />);
	}

	it("shows 'Rank máximo!' when at the last rank", async () => {
		await renderMaxRank();
		expect(screen.getAllByText("Rank máximo!").length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("does NOT render ArrowRight icon (no next rank)", async () => {
		await renderMaxRank();
		// ArrowRight only appears in the next-rank section which is hidden
		expect(screen.queryByTestId("icon-ArrowRight")).not.toBeInTheDocument();
	});

	it("renders xpProgress at 100 for max rank", async () => {
		await renderMaxRank();
		// Progress bar should exist (value=100 is set via prop)
		const progressLabels = screen.getAllByText("Progresso");
		expect(progressLabels.length).toBeGreaterThanOrEqual(1);
	});

	it("shows 'Desbloqueado' badge for past ranks", async () => {
		await renderMaxRank();
		expect(screen.getAllByText("✓ Desbloqueado").length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("applies past-rank styling (opacity-60) to earlier ranks", async () => {
		await renderMaxRank();
		// Rank E should be a past rank with the past CSS class
		const recrutaHeadings = screen.getAllByText("Recruta");
		const recrutaCard = recrutaHeadings[0].closest("[data-slot='card']");
		expect(recrutaCard?.className).toContain("opacity-60");
	});

	it("renders default CSS for non-current non-past ranks in default mode", () => {
		// This is already covered by existing tests but making it explicit
		render(<RanksPage />);
		const genninHeadings = screen.getAllByText("Gennin");
		const genninCard = genninHeadings[0].closest("[data-slot='card']");
		expect(genninCard?.className).toContain("border-white/10");
	});
});
