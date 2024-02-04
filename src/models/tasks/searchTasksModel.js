const searchTasksModel = async (searchTerm) => {
    const query = `
      SELECT *
      FROM tasks
      WHERE title LIKE '%${searchTerm}%'
      OR description LIKE '%${searchTerm}%';
    `;
  
    const tasks = await db.query(query);
  
    return tasks;
  };
  
  export default searchTasksModel;
  