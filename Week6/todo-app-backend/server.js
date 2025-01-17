// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Importing the Firestore database instance from firebase.js
const { db, authMiddleware } = require("./firebase");

// Creating an instance of Express
const app = express();

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Your API routes will go here...

// GET: Endpoint to retrieve all tasks for a user
app.get("/tasks/:user", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").where("user", "==", req.params.user).get();
    let tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to add a new task
app.post("/tasks", async (req, res) => {
  try {
    const { task, user } = req.body;
    const newTask = {
      task,
      user
    };
    const docRef = await db.collection("tasks").add(newTask);
    res.status(201).send({ id: docRef.id, ...newTask });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to remove a task (replacing DELETE)
app.post("/tasks/remove", async (req, res) => {
  try {
    const { id, user } = req.body;

    // Check if the task ID is provided
    if (!id) {
      res.status(400).send("Task ID is required");
      return;
    }

    const taskRef = db.collection("tasks").doc(id);
    const task = await taskRef.get();

    // Check if the task exists
    if (!task.exists) {
      res.status(404).send("Task not found");
      return;
    }

    // Check if the task belongs to the user
    if (task.data().user !== user) {
      res.status(403).send("Unauthorized");
      return;
    }

    await taskRef.delete();
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});