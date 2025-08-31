"use client";

import { ReactNode } from "react";

import { ErrorBoundary as NextErrorBoundary } from "next/dist/client/components/error-boundary";

const ErrorBoundary = ({ children, fallbackComponent }: { children: ReactNode; fallbackComponent?: ReactNode }) => (
  <NextErrorBoundary
    errorComponent={(errorObj) => {
      const getError = () => {
        let error: { h1: string; description: string } = { h1: "Houve um erro desconhecido", description: "Entre em contato com o suporte" };

        try {
          const parsedError = JSON.parse(errorObj.error.message);

          if (parsedError.h1) error.h1 = parsedError.h1;
          if (parsedError.description) error.description = parsedError.description;
        } catch (err) {
          console.log(err);
        }

        return error;
      };

      return fallbackComponent || <div>Error</div>;
    }}
  >
    {children}
  </NextErrorBoundary>
);

export default ErrorBoundary;
