import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "../app/globals.css";

import { SITE_URL } from "@/config/siteConfig";
import { generateLocalBusinessSchema } from "@/utils/schemaUtils";
import { SEO_KEYWORDS } from "@/config/seoKeywords";
import ScriptLD from "@/components/ScriptLD";
import LayoutClientProvider from "@/components/LayoutClientProvider";
import { DEFAULT_LANG, isSupportedLang, LOCALE_CODES, resolveLang, SUPPORTED_LANGS } from "@/config/locales";
import OrganizationSchema from "@/components/OrganizationSchema";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import OnlineStatusBanner from "@/components/OnlineStatusBanner";

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-56D2LTZS";
const THEME_COLOR = "#86b486";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

/* 
 RootLayout metadata must stay MINIMAL.
 FULL SEO is handled inside [lang]/layout.tsx
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Samyun Wan Armenia",
  manifest: "/manifest.json",
  themeColor: THEME_COLOR,
  appleWebApp: {
    capable: true,
    title: "Samyun Wan Armenia",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: SEO_KEYWORDS.hy.join(', '),
};

/* --------- LOCAL BUSINESS SCHEMA --------- */
const localBusinessStructuredData = generateLocalBusinessSchema(SEO_KEYWORDS.hy);

/* --------- WEBSITE + SEARCH SCHEMA --------- */
const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Samyun Wan Armenia",
  potentialAction: SUPPORTED_LANGS.map(lang => ({
    "@type": "SearchAction",
    target: `${SITE_URL}/${lang}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  })),
};

/* --------- ROOT LAYOUT --------- */
export const dynamic = "force-dynamic";

const extractLangFromPath = (rawPath?: string | null): typeof SUPPORTED_LANGS[number] | null => {
  if (!rawPath) return null;

  let pathname = rawPath;
  if (rawPath.includes("://")) {
    try {
      pathname = new URL(rawPath).pathname;
    } catch {
      pathname = rawPath;
    }
  }

  const candidate = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  return isSupportedLang(candidate) ? (candidate as typeof SUPPORTED_LANGS[number]) : null;
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const headerList = headers();
  const cookieStore = cookies();
  const headerLang = headerList.get("x-current-lang") || undefined;
  const cookieLang = cookieStore.get("current_lang")?.value;
  const analyticsConsent =
    cookieStore.get("analytics_consent")?.value === "granted" ||
    cookieStore.get("analytics_consent")?.value === "true";
  const marketingConsent =
    cookieStore.get("marketing_consent")?.value === "granted" ||
    cookieStore.get("marketing_consent")?.value === "true";
  const hasTagManagerConsent = (analyticsConsent || marketingConsent) && !!GTM_ID;
  const allowAnalyticsScripts = (analyticsConsent || marketingConsent) && (GOOGLE_ANALYTICS_ID || GOOGLE_ADS_ID);

  const fallbackPathLang =
    extractLangFromPath(headerList.get("x-invoke-path")) ||
    extractLangFromPath(headerList.get("x-matched-path")) ||
    extractLangFromPath(headerList.get("x-forwarded-uri")) ||
    extractLangFromPath(headerLang);

  const resolvedLang = resolveLang(cookieLang || headerLang || fallbackPathLang || DEFAULT_LANG);
  const htmlLang = LOCALE_CODES[resolvedLang] || resolvedLang;

  return (
    <html lang={htmlLang} data-theme="light" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {hasTagManagerConsent && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <OrganizationSchema />
        <ScriptLD json={localBusinessStructuredData} />
        <ScriptLD json={websiteStructuredData} />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta name="robots" content="max-image-preview:large" />
        <meta name="google-site-verification" content="-ufBwSDlPw84KU4RYrWhcWzUQVz3ymn3YdTSwbdJd_E" />
        {allowAnalyticsScripts && (
          <>
            {/* Google tag (gtag.js) */}
            <Script
              id="google-gtag-aw-script"
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
                GOOGLE_ADS_ID || GOOGLE_ANALYTICS_ID,
              )}`}
              strategy="afterInteractive"
            />
            <Script id="google-gtag-aw-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
                ${GOOGLE_ANALYTICS_ID ? `gtag('config', '${GOOGLE_ANALYTICS_ID}', { anonymize_ip: true, send_page_view: false });` : ''}
              `}
            </Script>
            <Script id="google-gtag-aw-conversion-helper" strategy="afterInteractive">
              {`
                function gtag_report_conversion(url) {
                  const callback = function () {
                    if (typeof url !== 'undefined') {
                      window.location = url;
                    }
                  };
                  if (typeof window.gtag === 'function' && '${GOOGLE_ADS_ID}') {
                    gtag('event', 'conversion', {
                      send_to: '${GOOGLE_ADS_ID}/f5pkCOXT0MkbEMb2rYxC',
                      value: 1.0,
                      currency: 'USD',
                      event_callback: callback,
                    });
                  }
                  return false;
                }
                window.gtag_report_conversion = gtag_report_conversion;
              `}
            </Script>
          </>
        )}
      </head>

      <body>
        {hasTagManagerConsent && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ServiceWorkerRegistration />
        <OnlineStatusBanner />
        <LayoutClientProvider initialLang={resolvedLang}>{children}</LayoutClientProvider>

        <noscript>
          <img
            src="https://mc.yandex.ru/watch/103962073"
            alt="Yandex Metrica tracking pixel"
            style={{ position: "absolute", left: "-9999px" }}
          />
        </noscript>
      </body>
    </html>
  );
};

export default RootLayout;
