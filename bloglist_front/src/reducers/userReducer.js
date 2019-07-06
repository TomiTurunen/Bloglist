let initialState = null
export const initializeUser = () => {
	console.log('user')
	return async dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
		console.log(loggedUserJSON)
		if (loggedUserJSON) {
			initialState = loggedUserJSON
			dispatch({
				type: 'INIT_USER',
				data: loggedUserJSON,
			})
		}
		else {
			return null
		}
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case 'INIT_USER':
		console.log(JSON.parse(action.data))
		return JSON.parse(action.data)
	default: return state
	}
}

export default reducer