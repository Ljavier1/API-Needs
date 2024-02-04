const selectUncompletedTasksModel = async () => {
    const query = `
      SELECT *
      FROM tasks
      WHERE completed = false;
    `;
  
    const tasks = await db.query(query);
  
    return tasks;
  };
  
  export default selectUncompletedTasksModel;
  