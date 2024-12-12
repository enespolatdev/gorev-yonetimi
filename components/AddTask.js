import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const newTask = await res.json();
    onAdd(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Görev Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained">Ekle</Button>
    </Box>
  );
}
