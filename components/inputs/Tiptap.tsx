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
  label: string;
  disabled?: boolean;
  control: Control<FieldValues>;
}

const Tiptap = ({ name, label, control, disabled }: TiptapProps) => {
  const { field } = useController({ name, control });

  const CustomStarterKit = StarterKit.configure({
    // ...
    paragraph: {
      HTMLAttributes: {
        class: "min-h-[1rem]",
      },
    },
  });

  const editor = useEditor({
    extensions: [CustomStarterKit],
    content: field.value,
    onUpdate({ editor }) {
      const value = editor.getHTML();
      field.onChange(value);
    },
    editorProps: {
      attributes: {
        class:
          "peer p-4 pt-0 border border-neutral-300 h-64 overflow-y-auto border-t-0 rounded-b outline-none",
      },
    },
  });

  return (
    <div className="relative">
      <div className="absolute top-0 -translate-y-1/2 scale-75 left-5 bg-white text-zinc-400 origin-[0] px-1 ">
        {label}
      </div>
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
