import { ReactNode, useCallback, useState } from "react";

interface UsePopUpResult {
  isOpen: boolean;
  content: ReactNode | null;
  open: () => void;
  close: () => void;
  setPopUpContent: (content: ReactNode | null) => void;
}

export default function usePopUpStates(initialContent?: ReactNode): UsePopUpResult {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setInternalContent] = useState<ReactNode | null>(initialContent || null);

  const open = useCallback((newContent?: ReactNode) => {
    if (newContent !== undefined) setInternalContent(newContent);

    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setInternalContent(null);
  }, []);

  const setPopUpContent = useCallback((newContent: ReactNode | null) => {
    setInternalContent(newContent);
    if (newContent !== null) setIsOpen(true);
    else setIsOpen(false);
  }, []);

  return { isOpen, content, open, close, setPopUpContent };
}

export type TUsePopUpStates = ReturnType<typeof usePopUpStates>;
