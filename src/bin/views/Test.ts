import m, { Component } from "mithril"

const TestView: Component = {
	view: () => {
		return [m(m.route.Link,  {href: "/dir/" }, "skdlfjs")]
	}
}

export default TestView
