import m from "mithril"
import TestView from "./views/Test"
import LoginView from "./views/Login"
import DirView from "./views/DirView"
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
