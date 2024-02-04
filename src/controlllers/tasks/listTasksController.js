const listTasksController = async (req, res, next) => {
  try {
    const { completed } = req.query;

    let tasks;

    if (completed === "true") {
      tasks = await selectCompletedTasksModel();
    } else if (completed === "false") {
      tasks = await selectUncompletedTasksModel();
    } else {
      tasks = await selectAllTasksModel();
    }

    res.send({
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export default listTasksController;
