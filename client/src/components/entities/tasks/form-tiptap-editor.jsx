import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorView } from "prosemirror-view";
// import { Toolbar } from "./form-toolbar";

EditorView.prototype.updateState = function updateState(state) {
  if (!this.docView) return; // This prevents the matchesNode error on hot reloads
  this.updateStateInner(state, this.state.plugins != state.plugins);
};

const Tiptap = ({ description, onChange, styles }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
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
        class: styles,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div data-vaul-no-drag>
      {/* <Toolbar editor={editor} /> */}
      <EditorContent data-vaul-no-drag editor={editor} />
    </div>
  );
};

export default Tiptap;
// TODO: Fix Markdown toolbar triggers
