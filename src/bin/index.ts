import m from "mithril"
import TestView from "./views/Test"
import LoginView from "./views/Login"
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
	}
})
