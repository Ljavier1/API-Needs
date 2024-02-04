const selectCompletedTasksModel = async () => {
    const query = `
      SELECT *
      FROM tasks
      WHERE completed = true;
    `;
  
    const tasks = await db.query(query);
  
    return tasks;
  };
  
  export default selectCompletedTasksModel;
  