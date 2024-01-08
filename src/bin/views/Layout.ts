import m, { Component } from "mithril"
import UserWidget from "../components/UserWidget"
import Auth from "../models/Auth"
import SearchBar from "../components/Search"

const Layout: Component = {
	view: function(vnode) {
		return m("main.layout", [
			m(".header", [
				m(m.route.Link, { href: "/", selector: "a.header-title-link" }, m("h2.header-title", "Intellicarnet")),
				m("nav.menu", [
					Auth.authenticated && m(m.route.Link, { href: "/convo", selector: "a.header-link" }, "Conversation"),
					Auth.authenticated && m(m.route.Link, { href: "/dir", selector: "a.header-link" }, "Fichiers"),
				]),
				Auth.authenticated && m(SearchBar),
				m(UserWidget),
			]),
			m("section", vnode.children)
		])
	}
}

export default Layout
