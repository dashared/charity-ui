import React, { FC, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";

type EditorChangeType = {
  text: string;
  html: string;
};

const FAQEditor: FC = () => {
  const mdEditor = React.useRef<Editor>(null);
  const [value, setValue] = React.useState("xxx");

  // eslint-disable-next-line
  const handleClick = useCallback(() => {
    if (mdEditor !== null) {
      console.log("hello");
      //alert((mdEditor as React.RefObject<Editor>).current?.getMdValue())
    }
  }, []);

  const handleEditorChange = (val: EditorChangeType): void => {
    const { text } = val;
    const newValue = text.replace(/\d/g, "");
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Editor
      ref={mdEditor}
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
