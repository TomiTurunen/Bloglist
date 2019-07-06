import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	let blogs = response.data
	return blogs.sort((a, b) => b.likes - a.likes)
}

export default { getAll }