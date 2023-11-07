import m, { Component } from "mithril"
import Editor from "../components/Editor"

const TestView: Component = {
	view: () => {
		return [
			m(m.route.Link,  {href: "/dir/" }, "skdlfjs"),
		]
	}
}

export default TestView
