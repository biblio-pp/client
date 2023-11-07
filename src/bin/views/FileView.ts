import m, { Component } from "mithril"
import File from "../models/File"
import { basename } from "../services/utils"
import Editor from "../components/Editor"

declare namespace FileView {
	interface State { }
	interface Attrs {
		path: string
	}
}

const FileView: Component<FileView.Attrs> = {
	view: (vnode) => {
		return [
			m(Editor, { path: vnode.attrs.path })
		]
	}
}

export default FileView
