import { useState } from 'react'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		console.log(event.target.value)
		setValue(event.target.value)
	}
	const reset = () => {
		console.log(value)
		setValue('')
		console.log(value)
	}

	return {
		type,
		value,
		onChange,
		reset,
	}
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
	// ...
}