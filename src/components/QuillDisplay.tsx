import React from "react";
import "quill/dist/quill.snow.css";

interface QuillDisplayProps {
  content: string;
  className?: string;
}

const QuillDisplay: React.FC<QuillDisplayProps> = ({
  content,
  className = "",
}) => {
  return (
    <div
      className={`ql-editor ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        padding: 0,
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#374151",
      }}
    />
  );
};

export default QuillDisplay;
