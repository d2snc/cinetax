import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

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
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1414284940077637');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1414284940077637&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {children}
      </body>
    </html>
  );
}
