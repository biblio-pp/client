import m, { Component } from "mithril"
import Auth from "../models/Auth"

const LoginSchema = {
	username: "",
	password: "",
	error: "",
	login: async () => {
		try {
			await Auth.login({ username: LoginSchema.username, password: LoginSchema.password })
			LoginSchema.password = ""
			LoginSchema.username = ""
			LoginSchema.error = ""
		} catch (error) {
			if (error.code == 401) {
				LoginSchema.error = "Informations invalides."
				return
			}
			throw error
		}
	}
}

const LoginView: Component = {
	view: () => {
		if (Auth.authenticated) {
			const next = m.route.param("next")
			m.route.set(next || "/")
			m.redraw()
		}

		return m(".login-box",
			m(".login-form",
				m("h2", "Connexion"),
				m("label.form-label", "Nom d'utilisateur"),
				m("input.form-textbox#username", {
					oninput: (e: Event) => {
						const { target } = e
						if (target) LoginSchema.username = (target as HTMLInputElement).value
					},
					onkeypress: async (e: KeyboardEvent) => {
						if (e.key == "Enter") {
							await LoginSchema.login()
						}
					},
				}),
				m("label.form-label", "Mot de passe"),
				m("input.form-textbox#password[type=password]", {
					oninput: (e: Event) => {
						const { target } = e
						if (target) LoginSchema.password = (target as HTMLInputElement).value
					},
					onkeypress: async (e: KeyboardEvent) => {
						if (e.key == "Enter") {
							await LoginSchema.login()
						}
					},
				}),
				m("button.form-button", {
					onclick: async () => {
						await LoginSchema.login()
					}
				}, "Connexion"),
				m(".form-error", LoginSchema.error),
			)
		)
	}
}

export default LoginView
