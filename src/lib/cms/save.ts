import { revalidatePath } from "next/cache";
import { getPool } from "@/lib/db/pool";
import type { CmsBundle } from "@/lib/cms/types";

export async function saveCmsKey<K extends keyof CmsBundle>(key: K, payload: CmsBundle[K]) {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  await pool.query(
    `insert into cms_content (content_key, payload) values (?, ?)
     on duplicate key update payload = values(payload)`,
    [key, JSON.stringify(payload)],
  );
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}
