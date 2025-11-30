import { Inter, Poppins } from "next/font/google";
import { Orbitron, Outfit } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: "tehnoKrug - Kupovina i prodaja polovnih telefona | Najbolje cene u Srbiji",
  description: "tehnoKrug je vaš pouzdan partner za kupovinu i prodaju polovnih telefona. Garantujemo kvalitet, 12 meseci garancije, besplatna dostava, povrat novca u 14 dana. Otkup telefona sa isplatom odmah.",
  keywords: "polovni telefoni, otkup telefona, prodaja telefona, mobilni telefoni beograd, telefoni na rate, garancija na telefone, besplatna dostava telefona",
  openGraph: {
    title: "tehnoKrug - Kupovina i prodaja polovnih telefona",
    description: "Najbolje cene, garancija 12 meseci, besplatna dostava. Prodaj svoj telefon uz trenutnu isplatu!",
    type: "website",
    locale: "sr_RS",
  },
  twitter: {
    card: "summary_large_image",
    title: "tehnoKrug - Kupovina i prodaja polovnih telefona",
    description: "Najbolje cene, garancija 12 meseci, besplatna dostava. Prodaj svoj telefon uz trenutnu isplatu!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
