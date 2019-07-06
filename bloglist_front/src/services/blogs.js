import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	let blogs = response.data
	console.log(blogs)
	return blogs.sort((a, b) => b.likes - a.likes)
}

const create = async newObject => {
	console.log(token)
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	console.log(response)
	return response.data
}

const addOneLike = async (newObject, setBlogs) => {
	const config = {
		headers: { Authorization: token },
	}
	newObject.likes = newObject.likes + 1
	const url = baseUrl + '/' + newObject.id
	const response = await axios.put(url, newObject, config)
	const blogs = await getAll()
	setBlogs(blogs)
	return response.data
}

const deleteOne = async (deleteObject, setBlogs) => {
	const config = {
		headers: { Authorization: token },
	}
	const url = baseUrl + '/' + deleteObject.id
	const response = await axios.delete(url, config)
	const blogs = await getAll()
	setBlogs(blogs)
	return response.data
}

const createComment = async (newComment, blogId) => {
	console.log(url, newComment)
	const url = baseUrl + '/' + blogId + '/comments'
	const response = await axios.post(url, newComment)
	return response.data
}

export default { getAll, setToken, create, addOneLike, deleteOne, createComment }