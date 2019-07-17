import React from "react";
import { Form, Button } from "react-bootstrap";
import loginService from "../services/login";

const LoginForm = ({
  username,
  password,
  handlePasswordChange,
  props,
  setPassword,
  setMessage
}) => {
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password
      });
      username.reset();
      setPassword("");
      //Save login to cache
      window.localStorage.setItem("loggedBlogger", JSON.stringify(user));
      props.initializeUser();
      console.log(username);
      setMessage(`Welcome to use bloglist ${user.username}!`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    } catch (exception) {
      console.log(exception);
      props.handleNotification("Username or password is invalid.", false);
      setTimeout(() => {
        props.handleNotification(null, false);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>käyttäjätunnus</Form.Label>
          <Form.Control
            type="text"
            value={username.value}
            name="Username"
            onChange={username.onChange}
          />
          <Form.Label>salasana</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
          <Button type="submit">Kirjaudu</Button> <br />
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
