import EasyMDE from "easymde"
import m from "mithril"

function Editor() {
	var editor: EasyMDE

	return {
		oncreate: function(vnode) {
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
		},
		onremove: function(vnode) {
			editor.cleanup()
			editor.toTextArea()
			vnode.dom.parentNode.removeChild(vnode.dom)
		},
		view: () => {
			return m("textarea")
		}
	}
}

export default Editor
