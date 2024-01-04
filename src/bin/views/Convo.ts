import m, { Component } from "mithril"
import api from "../services/api"
import { Socket } from "socket.io-client"

class Msg {
	content: string
	type: string

	constructor(content: string, type: "user" | "ai") {
		this.content = content
		this.type = type
	}
}

let msgs: Msg[] = [
]

const ConvoSchema = {
	sock: undefined as Socket | undefined,
	msg: "",
	send: async () => {
		if (ConvoSchema.sock !== undefined && ConvoSchema.sock.connected) {
			msgs.unshift(new Msg(ConvoSchema.msg, "user"))
			ConvoSchema.sock.emit("convo", ConvoSchema.msg, (resp: string) => {
				msgs.unshift(new Msg(resp, "ai"))
				m.redraw()
			})
			ConvoSchema.msg = ""
			return true
		}
	},
}

const ConvoView: Component = {
	oninit: async () => {
		ConvoSchema.sock = await api.sock()
	},
	view: () => {
		return [
			m(".chat-box",
				msgs.map((msg) => {
					if (msg.type === "user") {
						return m(".msg-user", msg.content)
					} else {
						return m(".msg-ai", msg.content)
					}
				}),
			),
			m("input.form-textbox", {
				placeholder: "Envoyer un message",
				oninput: (e: Event) => {
					const { target } = e
					if (target) ConvoSchema.msg = (target as HTMLInputElement).value
				},
				onkeypress: async (e: KeyboardEvent) => {
					if (e.key == "Enter") {
						if (await ConvoSchema.send()) {
							const { target } = e
							if (target) (target as HTMLInputElement).value = ""
						}
					}
				},
			})
		]
	}
}

export default ConvoView
