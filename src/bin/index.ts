import m from "mithril"
import TestView from "./views/Test"
import LoginView from "./views/Login"
import DirView from "./views/DirView"
import FileView from "./views/FileView"
import SearchView from "./views/Search"
import Layout from "./views/Layout"
import ConvoView from "./views/Convo"

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
	"/search/:query...": {
		render: function(vnode) {
			return m(Layout, m(SearchView, {key: m.route.param("query"), ...vnode.attrs}))
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
	},
	"/convo": {
		render: function() {
			return m(Layout, m(ConvoView))
		}
	}
})
