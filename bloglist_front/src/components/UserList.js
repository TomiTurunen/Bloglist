import React from 'react'
import { Table } from 'react-bootstrap'
import {
	BrowserRouter as Route, Link
} from 'react-router-dom'

const User = ({ user }) => {
	const padding = {
		paddingRight: 5
	}
	const link = '/users/' + user.id
	return (
		<tr>
			<td><Link to={link} style={padding}>{user.name}</Link></td>
			<td>{user.blogs.length}</td>
		</tr >
	)
}

const UserContent = ({ user }) => {
	if (!user) {
		return (<div></div>)
	} else {

		return (
			<div>
				<h2>{user.name} </h2>
				<b>Added blogs</b> <br />
				<ul>
					{user.blogs.map(blog =>
						<li key={blog.id}>{blog.title}</li>
					)}
				</ul>

			</div >
		)
	}
}

const userById = (userList, id) =>
	userList.find(a => a.id === id)

const UserList = ({ userList }) => (
	<div>
		<Route exact path="/users/:id" render={({ match }) =>
			<UserContent user={userById(userList, match.params.id)} />
		} />
		<Table striped>
			<tbody>
				<tr><th></th><th><b>blogs created</b></th></tr>
				{userList.map(user =>
					<User key={user.id} user={user} />
				)}
			</tbody>
		</Table>
	</div>
)

export default UserList