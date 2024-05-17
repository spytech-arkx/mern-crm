import { Bold, Heading, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";

export function Toolbar({ editor }) {
    if (!editor) {
      return null;
    }
  
    return (
      <ToggleGroup size={"s"} type="multiple" className="flex-none gap-4 mx-0 my-0">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          pressed={editor.isActive("bold")}
          onPressedChange={() =>
            editor
              .chain()
              .focus()
              .toggleBold({
                HTMLAttributes: {
                  class: "font-bold",
                },
              })
              .run()
          }>
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Toggle heading"
          pressed={editor.isActive("heading")}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  }