import highlight from "highlight.js";
import { createRef, useEffect } from "react";
import { findDOMNode } from "react-dom";

export default function HighlightCode({ children, language }) {
  const code = createRef();

  useEffect(() => {
    highlight.highlightBlock(findDOMNode(code.current));
  }, []);

  return (
    <pre>
      <code ref={code} classname={language}>
        {children}
      </code>
    </pre>
  );
}
