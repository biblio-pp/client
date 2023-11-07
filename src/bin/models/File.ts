import api from "../services/api"

const FileModel = {
	read: async (path: string) => {
		interface FileRes {
			content: string
		}

		const res: FileRes = await api.request({
			url: "/fs/read",
			params: { path: path }
		})

		FileModel.content = res.content
	},

	write: async (path: string) => {
		await api.request({
			url: "/fs/write",
			params: { path: path },
			body: { content: FileModel.content },
			method: "POST",
		})
	},

	content: "",
}

export default FileModel
