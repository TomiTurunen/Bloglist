let token = null
const blogs = [
	{
		'title': 'Title',
		'author': 'minä',
		'url': 'www.goole.fi',
		'likes': 2,
		'user': {
			'username': 'tomit',
			'name': 'Tomi Turunen',
			'id': '5cf0bdcc443c6b482418050a'
		},
		'id': '5cf11583e50100408c1cc054'
	},
	{
		'title': 'Rise',
		'author': 'UKK',
		'url': '',
		'likes': 3,
		'user': {
			'username': 'tomit',
			'name': 'Tomi Turunen',
			'id': '5cf0bdcc443c6b482418050a'
		},
		'id': '5cf4b7510d72bc41506bdcac'
	},
	{
		'title': 'Forever',
		'author': 'Mäkelä',
		'url': '',
		'likes': 4,
		'user': {
			'username': 'tomit',
			'name': 'Tomi Turunen',
			'id': '5cf0bdcc443c6b482418050a'
		},
		'id': '5cf4b80d0d72bc41506bdcad'
	},
	{
		'title': 'Free',
		'author': 'Tomi Turunen',
		'url': 'rethreherh',
		'likes': 0,
		'user': {
			'username': 'tomit',
			'name': 'Tomi Turunen',
			'id': '5cf0bdcc443c6b482418050a'
		},
		'id': '5cf616f1b7e43334981fbc54'
	}
]

const getAll = () => {
	return Promise.resolve(blogs)
}

const setToken = () => {
	token = 'bearer 1231231214'
}

export default { getAll, setToken }