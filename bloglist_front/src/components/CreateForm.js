import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import blogService from "../services/blogs";
const CreateForm = ({ props }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleCreate = async event => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url
      });
      props.addBlog(blog);
      props.handleNotification(
        "Blogi " + title + " luotu onnistuneesti!",
        true
      );
    } catch (exception) {
      console.log(exception);
      props.handleNotification(
        "Blogin luonti epäonnistui. Tarkista syöttämäsi tiedot.",
        false
      );
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  );
};
export default CreateForm;
