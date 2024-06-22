import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

export default function Menubar({ editor }: Props) {
  return (
    <ToggleGroup
      type="multiple"
      className="bg-slate-200 rounded-full py-1 px-3 flex flex-wrap mb-3"
    >
      <ToggleGroupItem
        value="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-slate-300" : ""}
      ></ToggleGroupItem>
    </ToggleGroup>
  );
}
