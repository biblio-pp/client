import m, { Component } from "mithril"
import SearchModel from "../models/Search"
import { basename } from "../services/utils"

declare namespace QueryView {
	interface State { }
	interface Attrs {
		query: string
	}
}

const DirView: Component<QueryView.Attrs> = {
	oncreate: async (vnode) => {
		await SearchModel.search(decodeURI(vnode.attrs.query || ""))
	},
	view: (vnode) => {
		return [
			m(m.route.Link, { href: "/" }, "Retourner"),
			m("h2", `Recherche: ${decodeURI(vnode.attrs.query || "")}`),
			SearchModel.data.length > 0 ? [
				m(".entrylist",
					m("table.entrylist-table",
						SearchModel.data.map(entry => {
							const path = entry.path

							const link: string = entry.type == "dir" ? `/dir/${path}` : `/file/${path}`
							return m(m.route.Link,
								{
									href: link,
									selector: "tr.entrylist-row",
								},
								m("td", m(m.route.Link, {
									href: link,
									selector: "a.entrylist-link",
								}, path)),
							)
						}),
					),
				),
			] : [
				m("p", "Aucun résultat trouvé.")
			]
		]

	}
}

export default DirView
