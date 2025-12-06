import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/utils/pageMetadata";

import { statsData } from "@/data/stats";
import HeroSection from "@/components/HeroSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";

export const generateMetadata = async (): Promise<Metadata> =>
  buildPageMetadata("hy", "home", { canonicalPath: "/", type: "website" });

const RootPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <section
            className="min-h-[320px] rounded-3xl bg-gray-200/70 dark:bg-gray-800/60 animate-pulse"
            aria-label="Loading hero section"
          />
        }
      >
        <HeroSection stats={statsData} />
      </Suspense>
      <Suspense
        fallback={
          <section
            className="min-h-[420px] mt-6 rounded-3xl bg-gray-200/70 dark:bg-gray-800/60 animate-pulse"
            aria-label="Loading product list"
          />
        }
      >
        <ProductShowcaseSection />
      </Suspense>
    </>
  );
};

export default RootPage;
