import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

interface RichTextComponentProps {
  content: SerializedEditorState;
  className?: string;
}

const RichTextComponent: React.FC<RichTextComponentProps> = ({ content, className }) => {
  if (!content || !content.root) {
    return <p className="text-neutral-500 italic">No content available</p>;
  }

  return (
    <div className={className}>
      <RichText data={content} />
    </div>
  );
};

export default RichTextComponent;
