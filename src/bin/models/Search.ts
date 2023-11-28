import api from "../services/api"

const SearchModel = {
	search: async (query: string) => {
		interface SearchRes {
			data: { path: string, type: "file" | "dir" }[]
		}

		const res: SearchRes = await api.request({
			url: "/fs/search",
			params: { query: query }
		})

		SearchModel.data = res.data
	},

	data: [] as { path: string, type: "file" | "dir" }[]
}

export default SearchModel
