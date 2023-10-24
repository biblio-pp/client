import api from "../services/api"
import m from "mithril"

const Auth = {
	login: async ({ username, password }: { username: string, password: string }) => {
		interface LoginRes {
			token: string
			username: string
		}
		const loginRes: LoginRes = await api.request({
			url: "/auth/login", method: "POST", body: {
				"username": username,
				"password": password
			}
		})

		Auth.username = loginRes.username
		api.token(loginRes.token)
	},
	logout: async () => {
		api.request({
			url: "/auth/logout", method: "POST", body: {
				token: api.token()
			}
		})
		api.tokenRemove()
		Auth.username = ""
		m.route.set("/login")
	},
	get authenticated() {
		return api.token() !== null
	},
	username: "",
}

export default Auth
