import m, { Component } from "mithril"

const SearchSchema = {
	query: "",
	search: async () => {
		m.route.set("/search/" + SearchSchema.query)
	}
}

const SearchBar: Component = {
	view: () => {
		return m("input.searchbar", {
			placeholder: "Rechercher",
			oninput: (e: Event) => {
				const { target } = e
				if (target) SearchSchema.query = (target as HTMLInputElement).value
			},
			onkeypress: async (e: KeyboardEvent) => {
				if (e.key == "Enter") {
					await SearchSchema.search()
				}
			},

		})
	}
}

export default SearchBar
