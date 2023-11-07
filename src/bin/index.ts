import m from "mithril"
import TestView from "./views/Test"
import LoginView from "./views/Login"
import DirView from "./views/DirView"
import FileView from "./views/FileView"
import Layout from "./views/Layout"

m.route(document.body, "/", {
	"/": {
		render: function() {
			return m(Layout, m(TestView))
		}
	},
	"/login": {
		render: function() {
			return m(Layout, m(LoginView))
		}
	},
	"/file/:path...": {
		render: function(vnode) {
			return m(Layout, m(FileView, {key: m.route.param("path"), ...vnode.attrs}))
		}
	},
	"/dir/:path...": {
		render: function(vnode) {
			return m(Layout, m(DirView, {key: m.route.param("path"), ...vnode.attrs}))
		}
	},
	"/dir/": {
		render: function() {
			return m(Layout, m(DirView))
		}
	}
})
