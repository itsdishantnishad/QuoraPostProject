const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const cors = require('cors');
app.use(cors());

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
  { id: uuidv4(), username: "dishant", content: "I love Coding!" },
];

// API endpoint to get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// API endpoint to get a single post by id
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.json(post);
});

// API endpoint to create a new post
app.post("/api/posts", (req, res) => {
  const { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.status(201).json({ id, username, content });
});

// API endpoint to update a post
app.patch("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find((p) => p.id === id);
  post.content = content;
  res.status(200).json(post);
});

// API endpoint to delete a post
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
