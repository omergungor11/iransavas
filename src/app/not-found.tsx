import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-6xl font-black text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Aradiginiz sayfa bulunamadi.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors"
          >
            Ana Sayfaya Don
          </Link>
          <Link
            href="/haberler"
            className="px-6 py-2.5 rounded-lg border border-border hover:bg-muted text-foreground/80 text-sm font-medium transition-colors"
          >
            Haberlere Git
          </Link>
        </div>
      </div>
    </div>
  );
}
