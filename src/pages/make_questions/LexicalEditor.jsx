// components/LexicalEditor.js
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {};

const editorConfig = {
  namespace: "MyEditor",
  theme,
  onError(error) {
    console.error(error);
  },
};

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        onChange(root.getTextContent());
      });
    });
  }, [editor, onChange]);

  return null;
}

const LexicalEditor = ({ onChange }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative border border-gray-300 p-4 rounded bg-white min-h-[400px]">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[350px] text-base leading-relaxed" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              Start typing...
            </div>
          }
          ErrorBoundary={({ error }) => {
            console.error("Lexical error:", error);
            return <div className="text-red-500">Something went wrong.</div>;
          }}
        />
        <HistoryPlugin />
        <MyOnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
