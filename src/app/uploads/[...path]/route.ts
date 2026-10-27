import { readUpload } from "@/lib/uploads";

export const dynamic = "force-dynamic";

/**
 * Serves admin uploads from UPLOAD_DIR. Files written to public/ after a
 * production build are not served by `next start`, so uploads go through here.
 */
export async function GET(_request: Request, { params }: RouteContext<"/uploads/[...path]">) {
  const { path } = await params;
  const file = await readUpload(path);
  if (!file) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });

  return new Response(new Uint8Array(file.bytes), {
    headers: {
      "Content-Type": file.mime,
      "Content-Length": String(file.bytes.length),
      // Filenames carry a timestamp and random suffix, so a URL never changes content.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      // The sandbox Content-Security-Policy for /uploads is set in next.config.ts.
    },
  });
}
