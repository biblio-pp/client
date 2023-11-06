import m, { Component } from "mithril"
import DirList from "../models/DirList"

declare namespace DirView {
	interface State {}
	interface Attrs {
		path: string
	}
}

const DirView: Component<DirView.Attrs> = {
	oncreate: async (vnode) => {
		await DirList.refresh(vnode.attrs.path)
	},
	view: () => {
		return DirList.files.concat(DirList.dirs).map((e => m("p", e)))
	}
}

export default DirView
