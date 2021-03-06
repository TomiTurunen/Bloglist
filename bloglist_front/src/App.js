import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Alert, ListGroup } from "react-bootstrap";
import { handleNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  updateBlog,
  updateLikes,
  addBlog
} from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeUserList } from "./reducers/userListReducer";
import { Blog, SingleBlog } from "./components/Blog";
import UserList from "./components/UserList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Navigation from "./components/Navigation";
import CreateForm from "./components/CreateForm";
import { useField } from "./hooks";
import "./App.css";

const App = props => {
  const [password, setPassword] = useState("");
  const username = useField("text");
  const [setBlogs] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchAPI() {
      await props.initializeUser();
      await props.initializeUserList();
      await props.initializeBlogs();
    }
    fetchAPI();
  }, []);
  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            setPassword={setPassword}
            setMessage={setMessage}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            props={props}
          />
        </Togglable>
      </div>
    );
  };

  if (props.user) {
    blogService.setToken(props.user.token);
  }

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password
      });
      //Save login to cache
      window.localStorage.setItem("loggedBlogger", JSON.stringify(user));
      props.initializeUser();
      username.reset();
      setPassword("");

      props.handleNotification(
        "Tervetuloa käyttämään blogilistaa, " + user.username,
        true
      );
      setMessage(`welcome ${user.username}`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    } catch (exception) {
      props.handleNotification(
        "Käyttäjätunnus tai salasana on virheellinen.",
        false
      );
      setTimeout(() => {
        props.handleNotification(null, false);
      }, 5000);
    }
  };
  const userList = props.userList;
  const usersForm = () => (
    <div>
      <h2>Users</h2>
      {userList ? <UserList userList={userList} /> : ""}
    </div>
  );
  const mainForm = () => (
    <div>
      <ListGroup>
        {<CreateForm props={props} />}
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </ListGroup>
    </div>
  );

  const user = props.user;
  const blogs = props.blogs;
  const blogById = (blogList, id) => blogList.find(a => a.id === id);
  const blogForm = () => (
    <div>
      <Router>
        {message && <Alert variant="success">{message}</Alert>}
        <Navigation user={user} />
        <Route exact path="/users*" render={() => usersForm()} />
        <Route exact path="/" render={() => mainForm()} />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => (
            <SingleBlog
              props={props}
              blog={blogById(blogs, match.params.id)}
              user={user}
              setBlogs={setBlogs}
            />
          )}
        />
      </Router>
    </div>
  );
  const notification = props.notification;
  return (
    <div className="container">
      <h2>blogs</h2>
      <div>
        <Notification
          message={notification.message}
          notificationClass={notification.notificationClass}
        />
      </div>
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

const notificationsToShow = ({ notifications }) => {
  return notifications;
};
const blogsToShow = ({ blogs }) => {
  return blogs;
};
const loggedUser = ({ user }) => {
  return user;
};

const userListToShow = ({ userList }) => {
  return userList;
};

const mapStateToProps = state => {
  return {
    notification: notificationsToShow(state),
    blogs: blogsToShow(state),
    user: loggedUser(state),
    userList: userListToShow(state)
  };
};
const mapDispatchToProps = {
  handleNotification,
  initializeBlogs,
  updateBlog,
  updateLikes,
  addBlog,
  initializeUser,
  initializeUserList
};
const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedForm;
