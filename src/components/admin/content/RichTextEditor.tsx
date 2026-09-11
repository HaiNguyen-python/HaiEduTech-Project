/**
 * @file RichTextEditor.tsx
 * @description Tiptap based rich text editor used by the Content Studio.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
// Underline ships inside StarterKit v3 - no separate extension import needed.
import {
  Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3, Underline as UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MediaUploader from "./MediaUploader";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const { t } = useLanguage();
  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: false })],
    content: value || "",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none min-h-[240px] rounded-md border border-border bg-background p-3 text-[16px] leading-relaxed text-foreground focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if ((value || "") !== editor.getHTML()) editor.commands.setContent(value || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  const btn = (active: boolean) => (active ? "default" : "outline");

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Button type="button" size="sm" variant={btn(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()} aria-label={t("Đậm", "Bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()} aria-label={t("Nghiêng", "Italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()} aria-label={t("Gạch chân", "Underline")}>
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("heading", { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="H2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("heading", { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} aria-label="H3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label={t("Danh sách", "Bullet list")}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label={t("Danh sách số", "Ordered list")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant={btn(editor.isActive("blockquote"))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()} aria-label={t("Trích dẫn", "Quote")}>
          <Quote className="h-4 w-4" />
        </Button>
        <MediaUploader
          label={t("Chèn ảnh", "Insert image")}
          onUploaded={(f) => editor.chain().focus().setImage({ src: f.url, alt: f.file_name }).run()}
        />
      </div>
      <EditorContent editor={editor} />
      {placeholder && !editor.getText().trim() && (
        <p className="text-xs text-muted-foreground">{placeholder}</p>
      )}
    </div>
  );
}
