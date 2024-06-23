import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";

import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";

import { MdFormatListBulleted } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";

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
        active={editor.isActive("bold")}
      >
        <FaBold />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("italic")}
      >
        <FaItalic />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("underline")}
      >
        <FaUnderline />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="paragraph"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("paragraph")}
      >
        <PiTextTBold />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading1"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("heading", { level: 1 })}
      >
        <LuHeading1 />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading2"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        <LuHeading2 />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading3"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        <LuHeading3 />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading4"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("heading", { level: 4 })}
      >
        <LuHeading4 />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading5"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("heading", { level: 5 })}
      >
        <LuHeading5 />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading6"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("heading", { level: 6 })}
      >
        <LuHeading6 />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="unordered_list"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bulletList")}
      >
        <MdFormatListBulleted />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ordered_list"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("orderedList")}
      >
        <AiOutlineOrderedList />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
