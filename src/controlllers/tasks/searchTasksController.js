const searchTasksController = async (req, res, next) => {
    try {
      const { searchTerm } = req.query;
  
      const tasks = await searchTasksModel(searchTerm);
  
      res.send({
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export default searchTasksController;
  