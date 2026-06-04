import "./globals.css";
import "../styles/MainStyle.css";
import "../styles/Mystyle.scss";
import { Roboto } from "next/font/google";
import Script from "next/script";
export const metadata = {
  title: {
    default: "MILLIONONES",
  },
  description: "MILLIONONES",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQK99PW5')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
