import React, { FC, RefObject, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";

type EditorChangeType = {
  text: string;
  html: string;
};

type EditorProps = {
  initialValue: string;
  editorRef?: RefObject<Editor>;
};

const FAQEditor: FC<EditorProps> = ({ editorRef, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleEditorChange = (val: EditorChangeType): void => {
    const { text } = val;
    const newValue = text.replace(/\d/g, "");
    setValue(newValue);
  };

  return (
    <Editor
      ref={editorRef}
      view={{
        menu: true,
        md: true,
        html: false,
      }}
      value={value}
      style={{
        height: "500px",
      }}
      onChange={handleEditorChange}
      renderHTML={(text) => <ReactMarkdown source={text} />}
    />
  );
};

export default FAQEditor;
