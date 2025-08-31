import { TToast } from "../components/Toast/types";

type BaseActionResponse = { redirectUrl?: string; toast?: TToast; refresh?: boolean; download?: string };

export type ActionSuccess<T> = {
  status: "success";
  data: NonNullable<T>;
  client?: BaseActionResponse;
};
export type ActionError<E = unknown> = {
  status: "error";
  message?: string;
  error?: unknown;
  errorCustom?: NonNullable<E>;
  client?: BaseActionResponse;
};
export type TSafeExecuteResult<T, E = unknown> = ActionSuccess<T> | ActionError<E>;

type InferFnReturn<T> = T extends (input: any) => Promise<TSafeExecuteResult<infer R, any>> ? R : never;
type InferFnErrorCustom<T> = T extends (input: any) => Promise<TSafeExecuteResult<any, infer E>> ? E : never;
type InferFnInput<T> = T extends (input: infer I) => any ? I : never;

/**
 * This function is used to execute a function and return a safe execute result

 * The main purpose is to use this function in several places to obtain a safe guard result

 * The idea is to never throw errors or use try catches in the codebase, but there are some cases in which is usefull to throw
 inside the safeExecute, which is the case if you want to use safeExecute inside a prisma transaction for example.
 *
 * @param config - The config object
 * @param config.schema - The schema to validate the input
 * @param config.onCatchError - The error handling strategy
 * @param config.defaultError - The default error
 * @param config.fn - The function to execute
 * @param config.log - The log object
 */
export const safeExecute = <TFn extends (input: any) => Promise<TSafeExecuteResult<any, any>>>(config: {
  onError?: (error: unknown) => ActionError<InferFnErrorCustom<TFn>> | undefined | void;
  defaultError?: TSafeExecuteResult<InferFnReturn<TFn>, InferFnErrorCustom<TFn>>;
  fn: TFn;
  log?: { name: string; logBody?: boolean; onlyOnError?: boolean };
}) => {
  return async (input?: InferFnInput<TFn>): Promise<TSafeExecuteResult<InferFnReturn<TFn>, InferFnErrorCustom<TFn>>> => {
    try {
      const data = await config.fn(input);

      return data;
    } catch (error) {
      console.log("Safe Execute Return Error!", error);

      return (
        config.defaultError ?? {
          status: "error",
          message: "Erro ao executar ação",
          error,
        }
      );
    }
  };
};
