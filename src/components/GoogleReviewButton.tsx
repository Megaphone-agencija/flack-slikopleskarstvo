import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GOOGLE_REVIEW_URL = "https://g.page/r/CYfWA2-OsL_QEBM/review";

export default function GoogleReviewButton({ small = false }: { small?: boolean }) {
  return (
    <Button asChild size={small ? "sm" : "lg"} className={`bg-accent hover:bg-accent/90 text-accent-foreground font-bold whitespace-normal h-auto min-h-10 py-3 max-w-full ${small ? "text-xs" : "text-sm sm:text-base"}`}>
      <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
        Oceni nas na Googlu<ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
      </a>
    </Button>
  );
}
