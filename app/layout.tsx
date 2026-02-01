import type { Metadata } from "next";
import "./globals.css";
import FacebookPixel from "./components/FacebookPixel";

export const metadata: Metadata = {
  title: "CineTax | Transforme IR em Investimento Audiovisual",
  description: "Invista em CAV (Certificados de Investimento Audiovisual), impulsione a cultura brasileira e abata até 100% do valor investido no IR devido. Rentabilidade e eficiência tributária.",
  keywords: "CAV, investimento audiovisual, lei do audiovisual, abatimento IR, lucro real, incentivo fiscal, cultura brasileira",
  openGraph: {
    title: "CineTax | Transforme IR em Investimento Audiovisual",
    description: "Invista em CAV, impulsione a cultura brasileira e abata até 100% do valor investido no IR devido.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
