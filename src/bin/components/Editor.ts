import EasyMDE from "easymde"
import m, { Component } from "mithril"
import FileModel from "../models/File"

declare namespace Editor {
	interface Attrs {
		path: string
	}
}

function Editor(): Component<Editor.Attrs> {
	var editor: EasyMDE

	return {
		oncreate: async function(vnode) {
			await FileModel.read(vnode.attrs.path)
			editor = new EasyMDE({
				element: vnode.dom,
				autoDownloadFontAwesome: true,
				spellChecker: false,
				status: false,
				/*
				toolbar: [
					{
						name: "bold",
						action: EasyMDE.toggleBold,
						className: "fa fa-bold",
						title: "Gras",
					},
					"italic",
					{
						name: "custom",
						action: EasyMDE.toggleItalic,
						className: "fa fa-star",
						title: "Italique",
					},
					"ordered-list",
					{
						name: "custom",
						action: EasyMDE.toggleItalic,
						className: "fa fa-star",
						title: "Italique",
					},
				]
				*/
			})
			editor.value(FileModel.content)
		},
		onremove: function(vnode) {
			editor.cleanup()
			editor.toTextArea()
			vnode.dom.parentNode.removeChild(vnode.dom)
		},
		view: () => {
			return m("textarea")
		},
	}
}

export default Editor
