import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import Underline from "@tiptap/extension-underline";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-screen",
      },
    },
  });
  return (
    <div className="max-w-3xl mx-auto">
      {editor ? <Menubar editor={editor} /> : null}
      <div className="p-3 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
