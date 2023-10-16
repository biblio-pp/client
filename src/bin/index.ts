import m from "mithril"
import TestView from "./views/Test"

m.route(document.body, "/", {
	"/": {
		render: function() {
			return m(TestView)
		}
	}
})
