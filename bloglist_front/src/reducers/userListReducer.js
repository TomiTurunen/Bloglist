import userService from '../services/users'
let initialState = null
export const initializeUserList = () => {
	console.log('hep')
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
	console.log('hep2')
	switch (action.type) {
	case 'INIT_USER_LIST':
		console.log(action.data)
		console.log('hep3')
		return action.data
	default: return state
	}
}

export default reducer