import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		fileParallelism: false,
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "json-summary"],
			reportsDirectory: "./coverage",
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				// Config files — no testable logic
				"next.config.ts",
				"postcss.config.mjs",
				"vitest.config.ts",
				// Shadcn UI components — thin wrappers, tested by shadcn
				"src/components/ui/**",
				// Next.js layout — server component wrapper, no logic
				"src/app/layout.tsx",
				// Test setup
				"src/test/**",
				// Type-only files — v8 shows 0% but no executable code
				"src/lib/types.ts",
			],
			thresholds: {
				statements: 100,
				branches: 100,
				functions: 100,
				lines: 100,
				perFile: true,
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
