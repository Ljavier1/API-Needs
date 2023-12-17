import initDB from './initDB.js';

const connection = initDB.getConnection();

export async function getSolutionsByTaskId(req, res) {
    const taskId = req.params.taskId;
  
    try {
      const [rows] = await connection.query('SELECT * FROM solutions WHERE task_id = ?', [taskId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error getting solutions:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }

export async function createSolution(req, res) {
  try {
    const { description, file_path, task_id, user_id } = req.body;
    const [result] = await connection.query(
      'INSERT INTO solutions (description, file_path, task_id, user_id) VALUES (?, ?, ?, ?)',
      [description, file_path, task_id, user_id]
    );
    const newSolutionId = result.insertId;
    res.status(201).json({ id: newSolutionId, message: 'Solution created successfully' });
  } catch (error) {
    console.error('Error creating solution:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

export async function updateSolution(req, res) {
  const solutionId = req.params.id;

  try {
    const { description, file_path, task_id, user_id } = req.body;
    const [result] = await connection.query(
      'UPDATE solutions SET description = ?, file_path = ?, task_id = ?, user_id = ? WHERE id = ?',
      [description, file_path, task_id, user_id, solutionId]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Solution updated successfully' });
    } else {
      res.status(404).json({ message: 'Solution not found' });
    }
  } catch (error) {
    console.error('Error updating solution:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

export async function deleteSolution(req, res) {
  const solutionId = req.params.id;

  try {
    const [result] = await connection.query('DELETE FROM solutions WHERE id = ?', [solutionId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Solution deleted successfully' });
    } else {
      res.status(404).json({ message: 'Solution not found' });
    }
  } catch (error) {
    console.error('Error deleting solution:', error.message);
    res.status(500).send('Internal Server Error');
  }
}
