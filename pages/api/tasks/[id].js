import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const task = await Task.findByPk(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });

      task.status = 'completed';
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const task = await Task.findByPk(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });

      await task.destroy();
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}
