"use client";

import React from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapProps {
  name: string;
  disabled?: boolean;
  control: Control<FieldValues>;
}

const Tiptap = ({ name, control, disabled }: TiptapProps) => {
  const { field } = useController({ name, control });

  const editor = useEditor({
    extensions: [StarterKit],
    content: field.value,
    onUpdate({ editor }) {
      const value = editor.getHTML();
      field.onChange(value);
    },
    editorProps: {
      attributes: {
        class:
          "p-4 pt-0 border border-neutral-300 h-64 overflow-y-auto border-t-0 rounded-b",
      },
    },
  });

  return (
    <div className="relative">
      <div className="flex items-center gap-2 p-4 border border-neutral-300 border-b-0 rounded-t">
        <span
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${
            editor?.isActive("bulletList") ? "text-accent" : "text-neutral-400"
          }`}
        >
          <AiOutlineUnorderedList size={20} />
        </span>
        <span
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${
            editor?.isActive("bold") ? "text-accent" : "text-neutral-400"
          }`}
        >
          <AiOutlineBold size={20} />
        </span>
        <span
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${
            editor?.isActive("italic") ? "text-accent" : "text-neutral-400"
          }`}
        >
          <AiOutlineItalic size={20} />
        </span>
      </div>
      <EditorContent disabled={disabled} editor={editor} className="  " />
    </div>
  );
};

export default Tiptap;
