import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { BookOpen, Swords, Target, Trophy } from "lucide-react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dev Saitama — Treino de Herói Dev",
	description:
		"Aprenda desenvolvimento web com a força do Saitama. Lições, quests diárias e sistema de ranks estilo Solo Leveling.",
};

function Navbar() {
	const links = [
		{ href: "/", label: "Dashboard", icon: Swords },
		{ href: "/lessons", label: "Lições", icon: BookOpen },
		{ href: "/quests", label: "Quests", icon: Target },
		{ href: "/ranks", label: "Ranks", icon: Trophy },
	];

	return (
		<nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
				<Link href="/" className="flex items-center gap-2 font-bold text-white">
					<span className="text-xl">👊</span>
					<span>Dev Saitama</span>
				</Link>
				<div className="flex items-center gap-1 ml-auto">
					{links.map(({ href, label, icon: Icon }) => (
						<Link
							key={href}
							href={href}
							className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
						>
							<Icon className="size-4" />
							{label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-BR"
			className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-black text-white">
				<Navbar />
				<main className="flex-1">{children}</main>
			</body>
		</html>
	);
}
