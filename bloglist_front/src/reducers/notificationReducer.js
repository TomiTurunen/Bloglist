/* eslint-disable no-case-declarations */

const reducer = (state = '', action) => {
	switch (action.type) {
	case 'ADD_NOTIFICATION':
		const newNotification = {
			message: action.text,
			notificationClass: action.isSuccess ? 'success' : 'error'
		}
		return newNotification
	default:
		return state
	}
}

const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export function handleNotification(text, isSuccess) {
	return { type: ADD_NOTIFICATION, text, isSuccess }
}


export default reducer