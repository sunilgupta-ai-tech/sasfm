"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  RemoveFormat,
  FontColor,
  FontBackgroundColor,
  FontSize,
  FontFamily,
  Alignment,
  List,
  ListProperties,
  Indent,
  IndentBlock,
  Link,
  BlockQuote,
  Table,
  TableToolbar,
  HorizontalLine,
  SourceEditing,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="rich-text-editor rounded-md border border-line bg-paper [&_.ck-editor__editable]:min-h-[10rem] [&_.ck-editor__editable]:!text-sm [&_.ck-editor__editable]:!leading-relaxed [&_.ck-toolbar]:!border-0 [&_.ck-toolbar]:!border-b [&_.ck-toolbar]:!border-line [&_.ck-toolbar]:!bg-paper-dim [&_.ck-editor__editable]:!border-0">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            RemoveFormat,
            FontColor,
            FontBackgroundColor,
            FontSize,
            FontFamily,
            Alignment,
            List,
            ListProperties,
            Indent,
            IndentBlock,
            Link,
            BlockQuote,
            Table,
            TableToolbar,
            HorizontalLine,
            SourceEditing,
          ],
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontFamily",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "code",
              "removeFormat",
              "|",
              "alignment",
              "bulletedList",
              "numberedList",
              "outdent",
              "indent",
              "|",
              "link",
              "blockQuote",
              "insertTable",
              "horizontalLine",
              "|",
              "sourceEditing",
            ],
            shouldNotGroupWhenFull: true,
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
            ],
          },
          placeholder,
        }}
        onChange={(_event, editor) => {
          const html = editor.getData();
          const isEmpty = editor.getData().replace(/<[^>]+>/g, "").trim() === "";
          onChange(isEmpty ? "" : html);
        }}
      />
    </div>
  );
}
