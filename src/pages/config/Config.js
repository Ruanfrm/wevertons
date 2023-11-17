import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  remove,
  onValue,
} from "firebase/database";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { isValid, format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";

const taskListStyle = {
  maxWidth: "800px",
  margin: "0px auto",
  background: "#dfdfdf",
  marginTop: "100px",
  borderRadius: "10px",
  color: "#000",
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  border: "1px solid black",
};

const listItemTextStyle = {
  flex: 1,
  marginRight: "8px",
  maxWidth: "92%",
  wordWrap: "break-word",
  color: "#000",
};

const DEFAULT_TASK_CATEGORY = "Personal";
const DEFAULT_TASK_PRIORITY = "Medium";


const firebaseConfig = {
  apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
  authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
  databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
  projectId: "cardapiovirtual-d2d6b",
  storageBucket: "cardapiovirtual-d2d6b.appspot.com",
  messagingSenderId: "173010671308",
  appId: "1:173010671308:web:15fd5e2dea8851860a9469"
};

function Config() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDateTime, setTaskDateTime] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [editDateTime, setEditDateTime] = useState("");
  const [taskCategory, setTaskCategory] = useState(DEFAULT_TASK_CATEGORY);
  const [taskPriority, setTaskPriority] = useState(DEFAULT_TASK_PRIORITY);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editTask, setEditTask] = useState(null);

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    const tasksRef = ref(database, "/tasks");

    onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        const tasksArray = Object.values(tasksData);
        setTasks(tasksArray);
      }
    });
  }, []);

  const addTaskToFirebase = (taskData) => {
    const taskRef = push(ref(database, "tasks"));
    const taskId = taskRef.key;
    const taskDataWithId = { ...taskData, id: taskId };
    set(taskRef, taskDataWithId);
  };

  const loadTasksFromFirebase = () => {
    const tasksRef = ref(database, "tasks");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskList = Object.values(data);
        setTasks(taskList);
      } else {
        setTasks([]);
      }
    });
  };

  useEffect(() => {
    loadTasksFromFirebase();
  }, []);

  const addTask = () => {
    if (editing) {
      if (newTaskContent.trim() !== "") {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = {
          task: newTaskContent,
          dateTime: editDateTime,
          category: taskCategory,
          priority: taskPriority,
        };
        setTasks(updatedTasks);
        setEditing(false);
        setEditIndex(null);
        setNewTaskContent("");
        setEditDateTime("");
        setTaskCategory(DEFAULT_TASK_CATEGORY);
        setTaskPriority(DEFAULT_TASK_PRIORITY);
        const taskRef = ref(database, `tasks/${tasks[editIndex].id}`);
        set(taskRef, {
          task: newTaskContent,
          dateTime: editDateTime,
          category: taskCategory,
          priority: taskPriority,
        });
      }
    } else {
      if (newTask.trim() !== "") {
        const newTaskData = {
          task: newTask,
          dateTime: taskDateTime,
          category: taskCategory,
          priority: taskPriority,
        };
        setTasks([...tasks, newTaskData]);
        setNewTask("");
        setTaskDateTime("");
        setTaskCategory(DEFAULT_TASK_CATEGORY);
        setTaskPriority(DEFAULT_TASK_PRIORITY);
        addTaskToFirebase(newTaskData);
      }
    }
  };

  const removeTask = (taskId) => {
    const taskRef = ref(database, `tasks/${taskId}`);
    remove(taskRef)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        console.log("Tarefa excluída com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao excluir a tarefa:", error);
      });
  };

  const showHistory = () => {
    setHistoryOpen(true);
  };

  const closeHistory = () => {
    setHistoryOpen(false);
  };

  const startEdit = (task) => {
    setEditTask(task);
    setNewTaskContent(task.task);
    setEditDateTime(task.dateTime);
    setTaskCategory(task.category);
    setTaskPriority(task.priority);
    setEditIndex(tasks.indexOf(task));
    setEditing(true);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, ...completedTask]);
    const completedTaskRef = ref(database, "completed-tasks");
    push(completedTaskRef, completedTask[0]);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const checkTaskAlerts = () => {
      tasks.forEach((task) => {
        const taskDateTime = new Date(task.dateTime);
        if (isValid(taskDateTime) && taskDateTime <= new Date()) {
          setSnackbarMessage(`Chegou a hora da sua tarefa: "${task.task}"!`);
          setSnackbarOpen(true);
        }
      });
    };

    const alertInterval = setInterval(checkTaskAlerts, 1000 * 60); // Verifique a cada minuto

    return () => {
      clearInterval(alertInterval);
    };
  }, [tasks]);

  return (
    <Container style={taskListStyle}>
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        Lista de Tarefas
      </h1>
      <TextField
        label="Nova Tarefa"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ color: "#fff", marginBottom: "10px" }}
      />
      <TextField
        type="datetime-local"
        variant="outlined"
        fullWidth
        value={taskDateTime}
        onChange={(e) => setTaskDateTime(e.target.value)}
        style={{ color: "#fff" }}
      />
      <FormControl variant="outlined" fullWidth style={{ marginTop: "10px" }}>
        <InputLabel htmlFor="task-category">Categoria</InputLabel>
        <Select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
          label="Categoria"
          inputProps={{
            name: "category",
            id: "task-category",
          }}
        >
          <MenuItem value="Personal">Pessoal</MenuItem>
          <MenuItem value="Work">Trabalho</MenuItem>
          <MenuItem value="Shopping">Compras</MenuItem>
          <MenuItem value="Other">Outros</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth style={{ marginTop: "10px" }}>
        <InputLabel htmlFor="task-priority">Prioridade</InputLabel>
        <Select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          label="Prioridade"
          inputProps={{
            name: "priority",
            id: "task-priority",
          }}
        >
          <MenuItem value="Low">Baixa</MenuItem>
          <MenuItem value="Medium">Média</MenuItem>
          <MenuItem value="High">Alta</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={addTask}
        style={{ margin: "5px 0px" }}
      >
        {editing ? "Salvar Tarefa" : "Adicionar Tarefa"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={showHistory}
        style={{ margin: "5px 10px" }}
      >
        Histórico
      </Button>
      <TextField
        label="Pesquisar Tarefas"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ color: "#fff", marginBottom: "10px" }}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="filter">Filtrar</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filtrar"
          inputProps={{
            name: "filter",
            id: "filter",
          }}
        >
          <MenuItem value="All">Todas</MenuItem>
          <MenuItem value="Low">Baixa Prioridade</MenuItem>
          <MenuItem value="Medium">Média Prioridade</MenuItem>
          <MenuItem value="High">Alta Prioridade</MenuItem>
        </Select>
      </FormControl>
      <List>
        {tasks
          .filter((task) => {
            if (filter === "All") return true;
            return task.priority === filter;
          })
          .filter((task) => task.task.includes(search))
          .map((task, index) => (
            <ListItem key={task.id || index} style={listItemStyle}>
              <ListItemText
                primary={
                  index === editIndex && editing ? (
                    <TextField
                      value={newTaskContent}
                      onChange={(e) => setNewTaskContent(e.target.value)}
                    />
                  ) : (
                    task.task
                  )
                }
                secondary={
                  index === editIndex && editing ? (
                    <TextField
                      type="datetime-local"
                      value={editDateTime}
                      onChange={(e) => setEditDateTime(e.target.value)}
                    />
                  ) : isValid(new Date(task.dateTime)) ? (
                    format(new Date(task.dateTime), "dd/MM/yyyy HH:mm")
                  ) : (
                    "Data inválida"
                  )
                }
                style={listItemTextStyle}
              />
              {index !== editIndex || !editing ? (
                <ListItemSecondaryAction>
                  <Tooltip title="Editar">
                    <IconButton edge="end" onClick={() => startEdit(task)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar">
                    <IconButton edge="end" onClick={() => removeTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Finalizar">
                    <IconButton edge="end" onClick={() => completeTask(index)}>
                      <DoneAllIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={addTask}>
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
      </List>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        Lembrete de Tarefa{" "}
        <NotificationsActiveIcon
          style={{ margin: "0px 10px", fontSize: "larger" }}
        />
      </DialogTitle>
      <DialogContent style={{ fontSize: "20px" }}>
        <p>Tarefa: {selectedTask?.task}</p>
        <p>
          Data e Hora:{" "}
          {selectedTask
            ? format(new Date(selectedTask.dateTime), "dd/MM/yyyy HH:mm")
            : ""}
        </p>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenModal(false)} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={historyOpen} onClose={closeHistory}>
      <DialogTitle>Histórico de Tarefas</DialogTitle>
      <DialogContent>
        <List>
          {completedTasks.map((task, index) => (
            <ListItem key={task.id || index} style={listItemStyle}>
              <ListItemText
                primary={task.task}
                secondary={format(
                  new Date(task.dateTime),
                  "dd/MM/yyyy HH:mm"
                )}
                style={listItemTextStyle}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHistory} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      message={snackbarMessage}
    />
  </Container>
  );
}

export default Config;
