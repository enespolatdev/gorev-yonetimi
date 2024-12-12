import { useState, useEffect } from 'react';
import { Container, Button, TextField, Card, CardContent, Typography, Box, Grid, Paper, Divider } from '@mui/material';
import { CheckCircle, Delete, AddCircle } from '@mui/icons-material';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Veri çekme
  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  // Görev ekleme
  const addTask = async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      setTitle('');
      setDescription('');
      fetchTasks();
    }
  };

  // Görev tamamlama
  const completeTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'PUT' });
    fetchTasks();
  };

  // Görev silme
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  // Sayfa yüklendiğinde görevleri çek
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Görev Yönetimi
      </Typography>

      {/* Görev Ekleme Formu */}
      <Box mb={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Başlık"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Açıklama"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          startIcon={<AddCircle />}
          sx={{ alignSelf: 'center' }}
        >
          Görev Ekle
        </Button>
      </Box>

      {/* Görev Listesi */}
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Card sx={{ border: task.status === 'completed' ? '2px solid green' : '2px solid gray' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {task.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => completeTask(task.id)}
                      disabled={task.status === 'completed'}
                      startIcon={<CheckCircle />}
                    >
                      Tamamla
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteTask(task.id)}
                      startIcon={<Delete />}
                    >
                      Sil
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Footer */}
      <Typography variant="body2" color="text.secondary" align="center">
        © 2024 Görev Yönetimi Uygulaması
      </Typography>
    </Container>
  );
};

export default Home;
