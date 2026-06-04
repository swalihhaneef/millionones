import "../globals.css";
import "../../styles/MainStyle.css";
import "../../styles/Mystyle.scss";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
export const metadata = {
  title: {
    default: "MILLIONONES | Innovative AI & Digital Marketing Company in Kerala",
    template: "%s | MILLIONONES",
  },
  description:
    "MILLIONONES helps businesses evolve with cutting-edge AI, web design, branding, and marketing strategies that inspire growth and digital transformation.",
  metadataBase: new URL("https://www.horatio.in"),
  verification: {
    google: "SOWbX6oWZz7oC7V7LXf_tQ8TJKZA-yCNAxjKhr94Caw",
  },
  openGraph: {
    title: {
      default: "MILLIONONES | Innovative AI & Digital Marketing Company in Kerala",
      template: "%s | MILLIONONES",
    },
    description:
      "Millionones helps businesses evolve with cutting-edge AI, web design, branding, and marketing strategies that inspire growth and digital transformation.",
    url: "https://www.horatio.in",
    siteName: "Millionones",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.horatio.in/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MILLIONONES | Innovative AI & Digital Marketing Company in Kerala",
        type: "image/png",
      },
      {
        url: "https://www.horatio.in/images/og-image-square.png",
        width: 600,
        height: 600,
        alt: "MILLIONONES | Innovative AI & Digital Marketing Company in Kerala",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "https://www.horatio.in",
    languages: {
      "en-IN": "https://www.horatio.in/en",
    },
  },
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function HomeLayout({ children }) {
  const transformStyle = {
    willChange: "transform",
    transform: "translate3d(25.137vw, 49.994vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
    transformStyle: "preserve-3d",
  };

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KQK99PW5"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}></iframe>
      </noscript>
      <ScrollToTop />
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
