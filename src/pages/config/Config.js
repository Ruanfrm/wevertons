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
import UndoIcon from "@mui/icons-material/Undo";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Config() {
  const [tasks, setTasks] = useState([]);
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
  const [completedTasks, setCompletedTasks] = useState([]);

  // Defina TASK_HISTORY_COLLECTION no início do seu arquivo, onde as outras constantes estão definidas
  const TASK_HISTORY_COLLECTION = "tarefasconcluidas";


  useEffect(() => {
    const tasksRef = ref(database, "/tasks");

    onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        const tasksArray = Object.values(tasksData);
        setTasks(tasksArray);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
      }
    });
  }, [database]);

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    }
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

// Função para carregar tarefas concluídas do Firebase
const loadCompletedTasksFromFirebase = () => {
  const completedTasksRef = ref(database, "tarefasconcluidas");

  // Use onValue para ouvir alterações no nó "completed-tasks"
  onValue(completedTasksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const completedTaskList = Object.values(data);
      setCompletedTasks(completedTaskList);
    } else {
      setCompletedTasks([]);
    }
  });
};



  useEffect(() => {
    loadTasksFromFirebase();
    loadCompletedTasksFromFirebase();
  }, []);

  const addTask = () => {
    if (editing) {
      if (newTaskContent.trim() !== "") {
        const updatedTasks = [...tasks];
        const editedTask = {
          task: newTaskContent,
          dateTime: editDateTime,
          category: taskCategory,
          priority: taskPriority,
          id: tasks[editIndex].id,
        };
        updatedTasks[editIndex] = editedTask;
        setTasks(updatedTasks);
        setEditing(false);
        setEditIndex(null);
        setNewTaskContent("");
        setEditDateTime("");
        setTaskCategory(DEFAULT_TASK_CATEGORY);
        setTaskPriority(DEFAULT_TASK_PRIORITY);
        const taskRef = ref(database, `tasks/${editedTask.id}`);
        set(taskRef, editedTask);
      }
    } else {
      if (newTask.trim() !== "") {
        const newTaskData = {
          task: newTask,
          dateTime: taskDateTime,
          category: taskCategory,
          priority: taskPriority,
        };

        if (isValid(new Date(taskDateTime))) {
          setTasks([...tasks, newTaskData]);
          setNewTask("");
          setTaskDateTime("");
          setTaskCategory(DEFAULT_TASK_CATEGORY);
          setTaskPriority(DEFAULT_TASK_PRIORITY);
          addTaskToFirebase(newTaskData);
        } else {
          console.error("Data inválida");
        }
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
    setNewTaskContent(task.task);
    setEditDateTime(task.dateTime);
    setTaskCategory(task.category);
    setTaskPriority(task.priority);
    setEditIndex(tasks.findIndex((t) => t.id === task.id));
    setEditing(true);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1);
  
    const taskRef = ref(database, `tasks/${completedTask[0].id}`);
    remove(taskRef)
      .then(() => {
        console.log("Tarefa removida com sucesso do nó de tarefas");
      })
      .catch((error) => {
        console.error("Erro ao remover a tarefa do nó de tarefas:", error);
      });
  
    const completedTaskRef = ref(database, "tarefasconcluidas");
    completedTask.forEach((task) => {
      push(completedTaskRef, task)
        .then(() => {
          console.log("Tarefa adicionada com sucesso ao histórico");
          // Após adicionar a tarefa concluída, recarregue as tarefas concluídas
          loadCompletedTasksFromFirebase();
        })
        .catch((error) => {
          console.error("Erro ao adicionar a tarefa ao histórico:", error);
        });
    });
  };
  
  const reactivateTask = (taskId) => {
    const completedTask = completedTasks.find((task) => task.id === taskId);
  
    if (completedTask) {
      // Adicione a tarefa de volta à lista de tarefas ativas
      const taskRef = ref(database, `tasks/`);
      push(taskRef, { ...completedTask, id: taskId })
        .then(() => {
          console.log("Tarefa reativada com sucesso");
          // Recarregue as tarefas ativas e concluídas
          loadTasksFromFirebase();
          loadCompletedTasksFromFirebase();
        })
        .catch((error) => {
          console.error("Erro ao reativar a tarefa:", error);
        });
    } else {
      console.error("Tarefa concluída não encontrada");
    }
  };
  
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };



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
          .filter((task) => task.task && task.task.includes(search))
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
    
 
      <Dialog open={historyOpen} onClose={closeHistory} >
  <DialogTitle>Histórico de Tarefas</DialogTitle>
  <DialogContent>
    <List style={{minWidth: '500px'}}>
      {completedTasks.map((task) => (
       <ListItem key={task.id} style={listItemStyle}>
  <ListItemText
    primary={task.task}
    secondary={format(new Date(task.dateTime), "dd/MM/yyyy HH:mm")}
    style={listItemTextStyle}
  />
  <ListItemSecondaryAction>
    <IconButton edge="end" onClick={() => reactivateTask(task.id)}>
      <UndoIcon />
    </IconButton>
  </ListItemSecondaryAction>
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