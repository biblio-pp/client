import api from "../services/api"

const DirList = {
	refresh: async (path: string) => {
		interface LsRes {
			files: string[],
			dirs: string[]
		}

		const res: LsRes = await api.request({
			url: "/fs/ls",
			params: { path: path }
		})

		DirList.files = res.files
		DirList.dirs = res.dirs
	},
	files: [] as string[],
	dirs: [] as string[],
}

export default DirList;
