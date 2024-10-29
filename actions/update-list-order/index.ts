"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { items, boardId } = data;

  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: { orgId },
        },
        data: {
          order: list.order,
        },
      }),
    );

    lists = await db.$transaction(transaction); //here the update of db is occured. if any update fails rollback to original so used $transaction method
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
