import Link from "next/link";
import { FileX } from "lucide-react";

export default function HaberNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
            <FileX className="h-7 w-7 text-zinc-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Haber Bulunamadi</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Aradiginiz haber silinmis veya tasinmis olabilir.
        </p>
        <Link
          href="/haberler"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors"
        >
          Tum Haberlere Don
        </Link>
      </div>
    </div>
  );
}
