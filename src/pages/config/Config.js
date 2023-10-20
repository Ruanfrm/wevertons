import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DoneAllIcon from '@mui/icons-material/DoneAll';import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { format } from 'date-fns';
import Tooltip from '@mui/material/Tooltip';

const taskListStyle = {
  maxWidth: '800px',
  margin: '0px auto',
  background: '#dfdfdf',
  marginTop: '100px',
  borderRadius: '10px',
  color: '#000',
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  border: '1px solid #ddd',
  marginBottom: '8px',
  borderRadius: '4px',
  border: '1px solid black',
};

const listItemTextStyle = {
  flex: 1,
  marginRight: '8px',
  maxWidth: '92%',
  wordWrap: 'break-word',
  color: '#000',
};

function Config() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDateTime, setTaskDateTime] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [editDateTime, setEditDateTime] = useState('');
  const [taskCategory, setTaskCategory] = useState('Personal');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [customReminder, setCustomReminder] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // ... (código anterior)

function searchTasks() {
  return tasks.filter((task) => {
    const taskIsCompleted = completedTasks.some((ct) => ct.task === task.task);

    if (filter === 'Completed') {
      return taskIsCompleted;
    }

    if (filter === 'Low') {
      return !taskIsCompleted && task.priority === 'Low';
    }
    if (filter === 'Medium') {
      return !taskIsCompleted && task.priority === 'Medium';
    }
    if (filter === 'High') {
      return !taskIsCompleted && task.priority === 'High';
    }

    return (
      (filter === 'All' || filter === 'Uncompleted') && (
        (!taskIsCompleted && task.task.toLowerCase().includes(search.toLowerCase())) ||
        format(new Date(task.dateTime), 'dd/MM/yyyy HH:mm').includes(search)
      )
    );
  });
}

// ... (código anterior)


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setTasks(savedTasks);
    setCompletedTasks(savedCompletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = () => {
    if (editing) {
      if (newTaskContent.trim() !== '') {
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
        setNewTaskContent('');
        setEditDateTime('');
        setTaskCategory('Personal');
        setTaskPriority('Medium');
      }
    } else {
      if (newTask.trim() !== '') {
        setTasks([
          ...tasks,
          {
            task: newTask,
            dateTime: taskDateTime,
            category: taskCategory,
            priority: taskPriority,
          },
        ]);
        setNewTask('');
        setTaskDateTime('');
        setTaskCategory('Personal');
        setTaskPriority('Medium');
      }
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditing(true);
    setEditIndex(index);
    setNewTaskContent(tasks[index].task);
    setEditDateTime(tasks[index].dateTime);
    setTaskCategory(tasks[index].category);
    setTaskPriority(tasks[index].priority);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, ...completedTask]);
  };

  const showHistory = () => {
    setHistoryOpen(true);
  };

  const closeHistory = () => {
    setHistoryOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    tasks.forEach((task, index) => {
      const taskTime = new Date(task.dateTime).getTime();
      const currentTime = new Date().getTime();
      if (taskTime > currentTime) {
        const timeout = taskTime - currentTime;
        setTimeout(() => {
          setSelectedTask(task);
          setOpenModal(true);
          setCustomReminder('');
        }, timeout);
      }
    });
  }, [tasks]);

  useEffect(() => {
    if (customReminder.trim() !== '') {
      const taskTime = new Date(customReminder).getTime();
      const currentTime = new Date().getTime();
      if (taskTime > currentTime) {
        const timeout = taskTime - currentTime;
        setTimeout(() => {
          showSnackbar('Lembrete Personalizado: ' + newTaskContent);
        }, timeout);
      }
    }
  }, [customReminder, newTaskContent]);

  return (
    <Container style={taskListStyle}>
      <h1
        style={{
          marginBottom: '20px',
          textAlign: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
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
        style={{ color: '#fff', marginBottom: '10px' }}
      />
      <TextField
        type="datetime-local"
        variant="outlined"
        fullWidth
        value={taskDateTime}
        onChange={(e) => setTaskDateTime(e.target.value)}
        style={{ color: '#fff' }}
      />
      <FormControl variant="outlined" fullWidth style={{marginTop: '10px'}}>
        <InputLabel htmlFor="task-category">Categoria</InputLabel>
        <Select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
          label="Categoria"
          inputProps={{
            name: 'category',
            id: 'task-category',
          }}
        >
          <MenuItem value="Personal">Pessoal</MenuItem>
          <MenuItem value="Work">Trabalho</MenuItem>
          <MenuItem value="Shopping">Compras</MenuItem>
          <MenuItem value="Other">Outros</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth style={{marginTop: '10px'}}>
        <InputLabel htmlFor="task-priority">Prioridade</InputLabel>
        <Select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          label="Prioridade"
          inputProps={{
            name: 'priority',
            id: 'task-priority',
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
        style={{ margin: '5px 0px' }}
      >
        {editing ? 'Salvar Tarefa' : 'Adicionar Tarefa'}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={showHistory}
        style={{ margin: '5px 10px' }}
      >
        Histórico
      </Button>
      <TextField
        label="Pesquisar Tarefas"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ color: '#fff', marginBottom: '10px' }}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="filter">Filtrar</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filtrar"
          inputProps={{
            name: 'filter',
            id: 'filter',
          }}
        >
          <MenuItem value="All">Todas</MenuItem>
          <MenuItem value="Low">Baixa Prioridade</MenuItem>
          <MenuItem value="Medium">Média Prioridade</MenuItem>
          <MenuItem value="High">Alta Prioridade</MenuItem>
        </Select>
      </FormControl>
      <List>
        {searchTasks().map((task, index) => (
          <ListItem key={index} style={listItemStyle}>
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
                ) : (
                  format(new Date(task.dateTime), 'dd/MM/yyyy HH:mm')
                )
              }
              style={listItemTextStyle}
            />
            <ListItemSecondaryAction>
              {index === editIndex && editing ? (
                <Tooltip title="Salvar">
                <IconButton edge="end" aria-label="save" onClick={addTask}>
                  <SaveIcon style={{ color: '#000' }} />
                </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title="Editar" >
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => startEdit(index)}
                  >
                    <EditIcon style={{ color: '#000' }} />
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeTask(index)}
                  >
                    <DeleteIcon style={{ color: '#000' }} />
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Concluir">
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    onClick={() => completeTask(index)}
                  >
                    <DoneAllIcon style={{ color: '#000', fontSize: 'larger' }} />
                  </IconButton>
                  </Tooltip>
                </>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} >
        <DialogTitle style={{display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize: '28px'}}>
          Lembrete de Tarefa <NotificationsActiveIcon style={{margin: '0px 10px', fontSize: 'larger'}} />
        </DialogTitle>
        <DialogContent style={{fontSize: '20px'}}>
          <p>Tarefa: {selectedTask?.task}</p>
          <p>
            Data e Hora:{' '}
            {selectedTask
              ? format(new Date(selectedTask.dateTime), 'dd/MM/yyyy HH:mm')
              : ''}
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
              <ListItem key={index} style={listItemStyle}>
                <ListItemText
                  primary={task.task}
                  secondary={format(new Date(task.dateTime), 'dd/MM/yyyy HH:mm')}
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
