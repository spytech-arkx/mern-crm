import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorView } from "prosemirror-view";
// import { Toolbar } from "./form-toolbar";

EditorView.prototype.updateState = function updateState(state) {
  if (!this.docView) return; // This prevents the matchesNode error on hot reloads
  this.updateStateInner(state, this.state.plugins != state.plugins);
};

const Tiptap = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Placeholder.configure({
        placeholder: "Write here...",
        showOnlyCurrent: false,
        showOnlyWhenEditable: false,
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "border-none rounded-lg min-h-20 max-h-60 w-[620px] shadow-none py-0 pl-0 text-s break-words",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <>
      {/* <Toolbar editor={editor} /> */}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
// TODO: Fix Markdown toolbar triggers
