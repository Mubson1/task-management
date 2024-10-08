import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          headingFont.className,
        )}
      >
        <div className="mb-4 flex items-center border p-4 shadow-sm bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="mb-6 text-3xl md:text-6xl text-center text-neutral-800">
          FocusFlow streamlines tasks to boost
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md w-fit">
          team productivity.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className,
        )}
      >
        Work together, streamline projects, and achieve new heights of
        productivity. Whether in the office or at home, FocusFlow adapts to your
        team’s unique style—make it all possible with FocusFlow.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get FocusFlow for free</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
