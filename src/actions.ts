"use server";

import { env } from "cloudflare:workers";

export async function createTodo(formData: FormData): Promise<void> {
  let handle = formData.get("handle");
  let title = formData.get("title");

  if (!handle || !title) {
    throw new Error("Missing handle or title");
  }

  let db = env.DB;
  if (!db) {
    throw new Error("DB not found");
  }

  let result = await db
    .prepare("INSERT INTO todos (handle, title) VALUES (?, ?)")
    .bind(handle, title)
    .run();
  if (result.error) {
    throw new Error(result.error);
  }
}

export async function checkTodo(formData: FormData): Promise<void> {
  let handle = formData.get("handle");
  let title = formData.get("title");
  let id = formData.get("id");
  let completed = formData.get("completed");

  if (!handle || !title || !id) {
    throw new Error("Missing handle, title, or id");
  }

  let db = env.DB;
  if (!db) {
    throw new Error("DB not found");
  }

  let result = await db
    .prepare(
      `UPDATE todos SET completed = ${completed === "true" ? "false" : "true"} WHERE id = ?`,
    )
    .bind(id)
    .run();
  if (result.error) {
    throw new Error(result.error);
  }
}
