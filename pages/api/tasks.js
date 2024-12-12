import Task from '../../models/Task';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  }
}
