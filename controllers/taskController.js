import initDB from './initDB.js';

const connection = initDB.getConnection();

export async function getAllTasks() {
    try {
      const [rows] = await connection.query('SELECT * FROM tasks');
      return rows;
    } catch (error) {
      console.error('Error obteniendo tareas:', error.message);
      throw new Error('Internal Server Error');
    }
  }
  

export async function createTask(req, res) {
  try {
    const { title, description, file_path, user_id } = req.body;
    const [result] = await connection.query(
      'INSERT INTO tasks (title, description, file_path, user_id) VALUES (?, ?, ?, ?)',
      [title, description, file_path, user_id]
    );
    const newTaskId = result.insertId;
    res.status(201).json({ id: newTaskId, message: 'Tarea Creada' });
  } catch (error) {
    console.error('Error creando tarea:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

export async function getTaskById(taskId) {
    try {
      const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
      
      if (rows.length === 0) {
        throw new Error('Tarea no encontrada');
      }
  
      return rows[0];
    } catch (error) {
      console.error(`Error obteniendo tarea con id ${taskId}:`, error.message);
      throw new Error('Internal Server Error');
    }
  }
  

export async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const { title, description, file_path, user_id, completed } = req.body;
    const [result] = await connection.query(
      'UPDATE tasks SET title = ?, description = ?, file_path = ?, user_id = ?, completed = ? WHERE id = ?',
      [title, description, file_path, user_id, completed, taskId]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Tarea completada' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error actualizando tarea:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

export async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const [result] = await connection.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Tarea borrada' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error borrando tarea:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

export async function markTaskAsCompleted(req, res) {
    const taskId = req.params.id;
  
    try {
      const [result] = await connection.query(
        'UPDATE tasks SET completed = true WHERE id = ?',
        [taskId]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).send('Tarea marcada como completada.');
      } else {
        res.status(404).send('Tarea no encontrada.');
      }
    } catch (error) {
      console.error('Error marcando tarea como completada:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }


