import m, { Component } from "mithril"
import DirList from "../models/DirList"

declare namespace DirView {
	interface State { }
	interface Attrs {
		path: string
	}
}

const DirView: Component<DirView.Attrs> = {
	oncreate: async (vnode) => {
		await DirList.refresh(vnode.attrs.path)
	},
	view: () => {
		const dirs = DirList.dirs.map(e => ({ name: e, type: "dir" }))
		const files = DirList.files.map(e => ({ name: e, type: "file" }))

		return [
			m(".entrylist",
				m("table.entrylist-table",
					m("tr.entrylist",
						m("th", "Nom"),
						m("th", "Type"),
					),
					dirs.concat(files).map(entry => {
						const link: string = (entry.type == "dir" ? "/dir/" : "/file/") + entry.name

						return m(m.route.Link,
							{
								href: link,
								selector: "tr.entrylist-row",
							},
							m("td", m(m.route.Link, {
								href: link,
								selector: "a.entrylist-link",
							}, entry.name)),
							m("td", entry.type == "dir" ? "Dossier" : "Fichier"),
						)
					}),
				),
			),
		]

	}
}

export default DirView
