import m, { Component } from "mithril"

class Msg {
	content: string
	type: string

	constructor(content: string, type: "user" | "ai") {
		this.content = content
		this.type = type
	}
}

let msgs: Msg[] = [
	new Msg("hi", "user"),
	new Msg("hello2", "ai"),
	new Msg("hi", "user"),
	new Msg("hello", "ai"),
]

const ConvoSchema = {
	msg: "",
	send: async () => {
		msgs.unshift(new Msg(ConvoSchema.msg, "user"))
		ConvoSchema.msg = ""
	}
}

const ConvoView: Component = {
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
						await ConvoSchema.send()
						const { target } = e
						if (target) (target as HTMLInputElement).value = ""
					}
				},
			})
		]
	}
}

export default ConvoView
