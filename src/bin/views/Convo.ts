import m, { Component } from "mithril"
import api from "../services/api"
import { Socket } from "socket.io-client"
import user_icon from "../../img/user.svg"
import ai_icon from "../../img/ai.svg"

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
			ConvoSchema.sock.emit("convo", ConvoSchema.msg)
			ConvoSchema.msg = ""
			return true
		}
	},
}

const ConvoView: Component = {
	oninit: async () => {
		ConvoSchema.sock = await api.sock()
		ConvoSchema.sock.on("convo", (data) => {
			msgs.unshift(new Msg(data, "ai"))
			m.redraw()
		})
	},
	view: () => {
		return [
			m(".chat-box",
				msgs.map((msg) => {
					return m(msg.type == "user" ? ".msg-user" : ".msg-ai",
						m("img.profile", { src: msg.type == "user" ? user_icon : ai_icon }),
						m("p.msg-content", msg.content)
					)
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
