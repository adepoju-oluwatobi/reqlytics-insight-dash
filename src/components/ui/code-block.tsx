import React from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash" }) => {
  return (
    <pre className="bg-gray-100 text-sm p-4 rounded overflow-x-auto my-4">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
