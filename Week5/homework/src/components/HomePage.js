import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Grid,
} from "@mui/material";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // State to hold the list of tasks.
  const [taskList, setTaskList] = useState([]);

  // State for the task name being entered by the user.
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      fetch(`${process.env.REACT_APP_BACKEND}/tasks/${currentUser.uid}`)
      .then(response => response.json())
      .then(data => {
        setTaskList(data);
      })
      .catch(error => {
        console.error('Failed to fetch:', error);
      })
    }
  }, [currentUser, navigate]);

  // TODO: Support retrieving your todo list from the API.
  // Currently, the tasks are hardcoded. You'll need to make an API call
  // to fetch the list of tasks instead of using the hardcoded data.

  function handleAddTask() {
    // Check if task name is provided and if it doesn't already exist.
    if (newTaskName && !taskList.some((task) => task.task === newTaskName)) {

      // TODO: Support adding todo items to your todo list through the API.
      // In addition to updating the state directly, you should send a request
      // to the API to add a new task and then update the state based on the response.

      fetch(`${process.env.REACT_APP_BACKEND}/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: newTaskName,
          user: currentUser.uid,
        }),
      })
      .then(response => response.json())
      .then(data => {
        setTaskList([...taskList, data]);
        setNewTaskName(newTaskName);
      })
      .catch(error => {
        console.error('Failed to post:', error);
      })
    } else if (taskList.some((task) => task.task === newTaskName)) {
      alert("Task already exists!");
    }
  }

  function toggleTaskCompletion(task) {
    // Make a POST request to the new endpoint with the task ID and user
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        user: task.user, // Ensure `task.user` is included or replace it with the appropriate user identifier
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Filter out the deleted task from the list and update state
      const updatedTaskList = taskList.filter((t) => t.id !== task.id);
      setTaskList(updatedTaskList);
    })
    .catch(error => {
      console.error('Failed to delete task:', error);
    });
}

  // Function to compute a message indicating how many tasks are unfinished.
  function getUnfinishedTaskMessage() {
    const unfinishedTasks = taskList.filter((task) => !task.finished).length;
    return unfinishedTasks === 1
      ? `You have 1 unfinished task`
      : `You have ${unfinishedTasks} tasks left to do`;
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm">
        {/* Main layout and styling for the ToDo app. */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Display the unfinished task summary */}
          <Typography variant="h4" component="div" fontWeight="bold">
            {getUnfinishedTaskMessage()}
          </Typography>
          <Box
            sx={{
              width: "100%",
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Input and button to add a new task */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small" // makes the textfield smaller
                  value={newTaskName}
                  placeholder="Type your task here"
                  onChange={(event) => setNewTaskName(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTask}
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            {/* List of tasks */}
            <List sx={{ marginTop: 3 }}>
              {taskList.map((task) => (
                <ListItem
                  key={task.task}
                  dense
                >
                  <Checkbox
                    checked={task.finished}
                    onChange={() => toggleTaskCompletion(task)}
                  />
                  <ListItemText primary={task.task} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </>
  );
}