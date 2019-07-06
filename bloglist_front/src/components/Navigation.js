import React from 'react'
import {
	BrowserRouter as Router,
	Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const logout = () => {

	window.localStorage.removeItem('loggedBlogger')
	window.location.reload()
}

const Navigation = (user) => {
	const style = {
		backgroundColor: 'lightGrey'
	}
	return (
		<Navbar collapseOnSelect="true" expand="" bg="light" variant="light" style={style}>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#" as="span">
						<Link to='/'>blogs</Link>{' '}
					</Nav.Link>
					<Nav.Link href="#" as="span">
						<Link to='/users'>users</Link>
					</Nav.Link>
					<Nav.Link href="#" as="span">
						{user.name} logged in
						<button onClick={(() => logout())}>logout</button>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse >
		</Navbar >
	)
}

export default Navigation