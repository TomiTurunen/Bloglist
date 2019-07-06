import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
	handleSubmit,
	username,
	handleUsernameChange,
	password,
	handlePasswordChange
}) => {

	return (
		<div>
			<h2>Log in to application</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>
						käyttäjätunnus
					</Form.Label>
					<Form.Control
						type="text"
						value={username}
						name="Username"
						onChange={handleUsernameChange}
					/>
					<Form.Label>
						salasana
					</Form.Label>
					<Form.Control
						type="password"
						value={password}
						name="Password"
						onChange={handlePasswordChange}
					/>
					<Button type="submit">Kirjaudu</Button> <br />
				</Form.Group>
			</Form>
		</div >
	)
}

export default LoginForm
