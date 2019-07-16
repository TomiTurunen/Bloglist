/* eslint-disable no-case-declarations */
import blogService from "../services/blogs";

let initialState = [];
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    initialState = blogs;
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const updateBlog = (blog, comment) => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_BLOG",
      blog: blog,
      comment: comment
    });
  };
};

export const addBlog = blog => {
  console.log("Add blog", blog);
  return async dispatch => {
    dispatch({
      type: "CREATE",
      blog: blog
    });
  };
};

export const updateLikes = blog => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_BLOG",
      blog: blog,
      likes: true
    });
  };
};

const reducer = (state = initialState, action) => {
  console.log("reducer");
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "CREATE":
      console.log("create");
      return state.concat(action.blog);
    case "UPDATE_BLOG":
      const id = action.blog.id;
      const blogToChange = state.find(a => a.id === id);
      let changedBlog;

      changedBlog = action.likes
        ? {
            ...blogToChange,
            likes: blogToChange.likes + 1
          }
        : {
            ...blogToChange,
            comments: blogToChange.comments.concat(action.comment)
          };
      const blogs = state.map(blog => (blog.id !== id ? blog : changedBlog));
      blogs.sort((a, b) => b.votes - a.votes);

      return blogs;
    default:
      return state;
  }
};

export default reducer;
