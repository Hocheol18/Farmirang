import React from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/colors.min.js";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false, // This line ensures the editor is only loaded on the client-side
});

export default function Editor() {
  return (
    <FroalaEditorComponent
      tag="textarea"
      config={{
        placeholderText: "글을 작성해주세요",
        charCounterCount: false,
        height: 300,
      }}
      // onModelChange={handleModelChange} Uncomment and define handleModelChange if you need to handle data changes
    />
  );
}
