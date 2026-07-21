"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePublicPaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}
