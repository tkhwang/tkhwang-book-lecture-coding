import axios from "axios"

const http = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: process.env.MOVIEDB_API_KEY,
		language: "en-US",
	},
})

http.get("tv/2333")

export default http
