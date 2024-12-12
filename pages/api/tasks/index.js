import Task from '../../../models/Task';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      const newTask = await Task.create({ title, description });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
}
