import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "PersonaVerse — Explore the Universe Inside You",
  description:
    "Discover your hidden personality through an immersive 3D cosmic experience. AI-powered personality analysis, hero identities, villain arcs, spirit animals, and more.",
  keywords: [
    "personality test",
    "AI personality",
    "personality quiz",
    "hero identity",
    "villain arc",
    "spirit animal",
    "anime character match",
    "PersonaVerse",
  ],
  openGraph: {
    title: "PersonaVerse — Explore the Universe Inside You",
    description:
      "Discover your hidden personality through an immersive 3D cosmic experience.",
    type: "website",
    siteName: "PersonaVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "PersonaVerse — Explore the Universe Inside You",
    description:
      "Discover your hidden personality through an immersive 3D cosmic experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
