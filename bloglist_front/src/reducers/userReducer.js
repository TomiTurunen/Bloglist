let initialState = null
export const initializeUser = () => {
	return async dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
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
		return JSON.parse(action.data)
	default: return state
	}
}

export default reducer