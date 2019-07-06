import userService from '../services/users'
let initialState = null
export const initializeUserList = () => {
	return async dispatch => {
		const userList = await userService.getAll()
		initialState = userList
		dispatch({
			type: 'INIT_USER_LIST',
			data: userList,
		})
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case 'INIT_USER_LIST':
		return action.data
	default: return state
	}
}

export default reducer