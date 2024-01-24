import insertTasksModel from "../../models/tasks/insertTasksModel.js";
import { fileService } from "../../service/fileService.js";

const newTaskController = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let files = [];

    if (req.files) {
      for (let file of Object.values(req.files).slice(0, 3)) {
        let fileName = await fileService(file);

        const fileId = await insertTasksModel(
          title,
          description,
          fileName,
          req.user.id
        );

        files.push({
          id: fileId,
          name: fileName,
          createdAt: task.createdAt, // Set createdAt timestamp
        });
      }
    }

    const task = await insertTasksModel(
      title,
      description,
      files[0].name,
      req.user.id
    );

    task.createdAt = task.createdAt; // Return createdAt timestamp from database

    files[0].createdAt = task.createdAt; // Set photo's createdAt timestamp to equal task's createdAt timestamp

    res.send({
      status: "ok",
      data: {
        task,
        files,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default newTaskController;


