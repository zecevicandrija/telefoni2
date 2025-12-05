import { Montserrat, Orbitron } from 'next/font/google';
import "./globals.css";

// Montserrat - Glavni font za tekst (Podržava č, ć, š...)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"], // Ključno za srpski jezik
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Orbitron - Tech font za naslove
const orbitron = Orbitron({ 
  variable: '--font-orbitron',
  subsets: ['latin'], // Orbitron ima ograničenu podršku, ali izgleda dobro za ENG/Brojeve
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: "tehnoKrug - Kupovina i prodaja polovnih telefona | Najbolje cene u Srbiji",
  description: "tehnoKrug je vaš pouzdan partner za kupovinu i prodaju polovnih telefona. Garantujemo kvalitet, 12 meseci garancije, besplatna dostava.",
  keywords: "polovni telefoni, otkup telefona, prodaja telefona, mobilni telefoni beograd, telefoni na rate",
  openGraph: {
    title: "tehnoKrug - Kupovina i prodaja polovnih telefona",
    description: "Najbolje cene, garancija 12 meseci. Prodaj svoj telefon uz trenutnu isplatu!",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className={`${montserrat.variable} ${orbitron.variable}`}>
        {children}
      </body>
    </html>
  );
}