export async function getCommentsByTaskId(req, res) {
    const taskId = req.params.taskId;
  
    try {
      const [rows] = await connection.query('SELECT * FROM comments WHERE task_id = ? AND parent_id IS NULL', [taskId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error getting comments:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export async function getRepliesByCommentId(req, res) {
    const commentId = req.params.commentId;
  
    try {
      const [rows] = await connection.query('SELECT * FROM comments WHERE parent_id = ?', [commentId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error getting replies:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export async function createComment(req, res) {
    try {
      const { content, task_id, parent_id } = req.body;
      const [result] = await connection.query(
        'INSERT INTO comments (content, task_id, user_id, parent_id) VALUES (?, ?, ?, ?)',
        [content, task_id, req.user.id, parent_id]
      );
      const newCommentId = result.insertId;
      res.status(201).json({ id: newCommentId, message: 'Comment created successfully' });
    } catch (error) {
      console.error('Error creating comment:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  export async function createReply(req, res) {
    try {
      const { content, task_id, parent_id } = req.body;
      const [result] = await connection.query(
        'INSERT INTO comments (content, task_id, user_id, parent_id) VALUES (?, ?, ?, ?)',
        [content, task_id, req.user.id, parent_id]
      );
      const newCommentId = result.insertId;
      res.status(201).json({ id: newCommentId, message: 'Reply created successfully' });
    } catch (error) {
      console.error('Error creating reply:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }  
  
  export async function deleteComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const [result] = await connection.query('DELETE FROM comments WHERE id = ?', [commentId]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
  