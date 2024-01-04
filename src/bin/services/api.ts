import m from "mithril"
import Auth from "./api"
import Mithril from "mithril"
import { Socket, io } from "socket.io-client"

const api = {
	baseUrl: "http://localhost:5000",
	sock: async () => {
		try {
			return io(api.baseUrl, {
				withCredentials: true,
				autoConnect: true,
				extraHeaders: {
					"Authorization": "Bearer " + api.token() || ""
				},
			})
		} catch (e) {
			if (e.code == 401) {
				m.route.set("/login", { next: m.route.get() })
				Auth.tokenRemove()
			}
			throw e
		}
	},
	request: async <T>(params: { url: string } & Mithril.RequestOptions<any>): Promise<T> => {
		const oldConfig = params.config
		params.config = (xhr: XMLHttpRequest) => {
			const tok = api.token();
			if (tok !== null) {
				xhr.setRequestHeader("Authorization", "Bearer " + api.token())
			}
			if (oldConfig) {
				oldConfig(xhr, params)
			}
		}

		params.url = api.baseUrl + params.url

		try {
			return await m.request(params)
		} catch (error) {
			if (error.code == 401) {
				m.route.set("/login", { next: m.route.get() })
				Auth.tokenRemove()
			}

			throw error
		}
	},
	token: (value?: string) => {
		if (value)
			localStorage.setItem("token", value)

		return localStorage.getItem("token")
	},
	tokenRemove: () => localStorage.removeItem("token")
}

export default api
