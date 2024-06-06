import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { Element } from "@ckeditor/ckeditor5-engine";

class MentionOutputAdapterPlugin extends Plugin {
  init() {
    const editor = this.editor;
    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        key: "data-mention",
        classes: "mention",
        attributes: {
          "data-user-id": true,
        },
      },
      model: {
        key: "mention",
        value: (viewItem: Element) => {
          const mentionAttribute = editor.plugins
            .get("Mention")
            .toMentionAttribute(viewItem, {
              userID: viewItem.getAttribute("data-user-id"),
            });

          return mentionAttribute;
        },
      },
      converterPriority: "high",
    });

    // Downcast the model 'mention' text attribute to a view <a> element.
    editor.conversion.for("downcast").attributeToElement({
      model: "mention",
      view: (modelAttributeValue, { writer }) => {
        // Do not convert empty attributes (lack of value means no mention).
        if (!modelAttributeValue) {
          return;
        }

        return writer.createAttributeElement(
          "span",
          {
            class: "mention",
            "data-mention": modelAttributeValue.id,
            "data-user-id": modelAttributeValue.userID,
          },
          {
            // Make mention attribute to be wrapped by other attribute elements.
            priority: 20,
            // Prevent merging mentions together.
            id: modelAttributeValue.uid,
          },
        );
      },
      converterPriority: "high",
    });
  }
}

export default MentionOutputAdapterPlugin;
