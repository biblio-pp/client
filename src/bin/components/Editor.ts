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
		view: (vnode) => {
			return m("",
				m("textarea"),
				m("button", {
					onclick: async () => {
						FileModel.content = editor.value()
						await FileModel.write(vnode.attrs.path)
						window.alert("Sauvegardé.")
					}
				}, "Sauvegarder")
			)
		},
	}
}

export default Editor
