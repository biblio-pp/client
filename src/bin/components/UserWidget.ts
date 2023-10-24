import m, { Component } from "mithril";
import Auth from "../models/Auth";

const UserWidget: Component = {
	view: () => {
		return Auth.authenticated ?
			m("t.userwidget-loggedin",
				m(m.route.Link, { href: "#", selector: "a.header-link", onclick: async () => { await Auth.logout() } }, "Déconnexion")
			) :
			m("t.userwidget-login", m(m.route.Link, { href: "/login", selector: "a.header-link" }, "Connexion"))
	}
}

export default UserWidget
