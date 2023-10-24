import m, { Component } from "mithril"
import UserWidget from "../components/UserWidget"
import Auth from "../models/Auth"

const Layout: Component = {
	view: function(vnode) {
		return m("main.layout", [
			m(".header", [
				m(m.route.Link, { href: "/", selector: "a.header-title-link" }, m("h2.header-title", "Intellicarnet")),
				m("nav.menu", [
				]),
				m(UserWidget)
			]),
			m("section", vnode.children)
		])
	}
}

export default Layout
