"use client";

import { useCallback } from "react";

import { useTerminalStore } from "../stores";
import {
  EChatStatus,
  ETerminalEntryKind,
  type IChatHistoryTurn,
  type TTerminalEntry,
} from "../types";

const CHAT_ENDPOINT = "/api/chat";

interface IStartChatStreamArgs {
  entryId: number;
  message: string;
  history: IChatHistoryTurn[];
}

function patchChatEntry(
  e: TTerminalEntry,
  patch: { text?: string; status?: EChatStatus; errorMessage?: string },
): TTerminalEntry {
  if (e.kind !== ETerminalEntryKind.CHAT_RESPONSE) return e;
  return {
    ...e,
    text: patch.text ?? e.text,
    status: patch.status ?? e.status,
    errorMessage: patch.errorMessage ?? e.errorMessage,
  };
}

export function useChatStream(): (args: IStartChatStreamArgs) => Promise<void> {
  const updateEntry = useTerminalStore((s) => s.updateEntry);
  const registerAbort = useTerminalStore((s) => s.registerStreamAbort);
  const clearAbort = useTerminalStore((s) => s.clearStreamAbort);

  return useCallback(
    async ({ entryId, message, history }: IStartChatStreamArgs) => {
      const controller = new AbortController();
      registerAbort(entryId, controller);

      let accumulated = "";

      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message, history }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const errorText = await response.text().catch(() => "");
          updateEntry(entryId, (e) =>
            patchChatEntry(e, {
              status: EChatStatus.ERROR,
              errorMessage:
                errorText || `chat request failed (${response.status})`,
            }),
          );
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          accumulated += chunk;
          updateEntry(entryId, (e) =>
            patchChatEntry(e, { text: accumulated }),
          );
        }

        updateEntry(entryId, (e) =>
          patchChatEntry(e, { status: EChatStatus.DONE }),
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          updateEntry(entryId, (e) =>
            patchChatEntry(e, { status: EChatStatus.DONE }),
          );
          return;
        }
        const msg = err instanceof Error ? err.message : "unknown error";
        updateEntry(entryId, (e) =>
          patchChatEntry(e, {
            status: EChatStatus.ERROR,
            errorMessage: msg,
          }),
        );
      } finally {
        clearAbort(entryId);
      }
    },
    [updateEntry, registerAbort, clearAbort],
  );
}
