import m, { Component } from "mithril"
import DirList from "../models/DirList"
import { basename } from "../services/utils"
import api from "../services/api"

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
	view: (vnode) => {
		const dirs = DirList.dirs.map(e => ({ name: e, type: "dir" }))
		const files = DirList.files.map(e => ({ name: e, type: "file" }))

		const curPath = vnode.attrs.path || ""

		let pathBuild = ""
		const segments = curPath.split('/').map((dir) => {
			pathBuild += dir
			return {full: pathBuild, base: dir}
		})

		return [
			curPath !== "" && m(m.route.Link, { href: "/dir/" }, "Retourner"),
			m("h2", segments.map((segment) => {
				return [m(m.route.Link, { href: "/dir/" + segment.full, selector: "a.entrylist-link" }, segment.base), m("t", "/")]
			})),
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
							}, basename(entry.name))),
							m("td", entry.type == "dir" ? "Dossier" : "Fichier"),
						)
					}),
				),
				m("button", {
					onclick: async () => {
						const name: string | null = window.prompt("Nom du dossier?")
						if (name === null) {
							return
						}

						await api.request({ url: "/fs/mkdir", params: { path: curPath + "/" + name }, method: "POST" })
						await DirList.refresh(curPath)
						m.redraw()
					}
				}, "Nouveau dossier")
			),
		]

	}
}

export default DirView
