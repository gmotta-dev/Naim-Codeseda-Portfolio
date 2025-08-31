"use client";

import { TransitionStartFunction, use, useTransition } from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { TSafeExecuteResult } from "@/shared/types/safe-execute";
import { toastCTX } from "@/shared/components/Toast/ToastCTX";

export function useSafeExecute(props?: { transition?: boolean; startTransition?: TransitionStartFunction }) {
  const router = useRouter();
  const [transition, startTransition] = props?.startTransition ? [props.transition ?? false, props.startTransition] : useTransition();
  const [actionResponse, setActionResponse] = useState<TSafeExecuteResult<any, any> | undefined>();
  const toastStates = use(toastCTX);

  const processResponse = async (response: TSafeExecuteResult<any, any>) => {
    setActionResponse(response);

    if (response.client) {
      // Handle redirects
      if (response.client.redirectUrl) {
        router.push(response.client.redirectUrl);
      }

      if (response.client.download) {
        const link = document.createElement("a");
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = "";
        link.href = response.client.download;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (response.client.toast) toastStates.addToast(response.client.toast);

      // Handle page refresh
      if (response.client.refresh) setTimeout(() => router.refresh(), 100);
    }
  };

  // Type-safe implementation that works with React Hook Form
  const execute = async <
    TFn extends (input: any) => Promise<TSafeExecuteResult<any, any>>,
    TParams = Parameters<TFn>[0],
    TResponse extends TSafeExecuteResult<any, any> = Awaited<ReturnType<TFn>>,
  >(
    action: TFn,
    params: TParams,
  ) => {
    try {
      let res;

      await new Promise((resolve) =>
        startTransition(async () => {
          // Execute the action with the provided parameters
          const responseOrPromise = action(params as TParams) as Promise<TResponse>;

          // Resolve the response if it's a promise
          const response = await Promise.resolve(responseOrPromise);

          await processResponse(response);

          res = response;
          resolve(void 0);
        }),
      );

      return res;
    } catch (error) {
      console.error("Error in useSafeExecuteV2", error);
      const isExecuteError = error instanceof Error && error.message.includes('"status":');

      if (isExecuteError) {
        const parsedError = JSON.parse(error.message);
        await processResponse(parsedError);
      } else return { status: "error", client: { toast: { title: "ERROR EXECUTING ACTION", description: "Unknown error", stylization: "error" } } } as TResponse;
    }
  };

  return { execute, transition, startTransition, response: actionResponse };
}
