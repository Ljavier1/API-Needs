import selectTaskByIdModel from "../../models/tasks/selectTaskByIdModel.js";
import { canNotResolveTaskError } from "../../service/errorService.js";
import insertSolutionModel from "../../models/tasks/insertSolutionModel.js";
import { fileService } from "../../service/fileService.js";

const solutionsEntryController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { description } = req.body;

    const task = await selectTaskByIdModel(taskId);

    if (task.user_id === req.user.id) canNotResolveTaskError();

    let photos = [];

    if (req.files) {
      for (let file of Object.values(req.files).slice(0, 3)) {
        let photoName = await fileService(file);

        const solution = await insertSolutionModel(description, photoName, taskId, req.user.id);

        solution.createdAt = solution.createdAt; // Devolver el timestamp de creación desde la base de datos

        photos.push({
          id: solution,
          name: photoName,
        });
      }
    }
    res.send({
      status: "ok",
      data: photos,
    });
  } catch (error) {
    next(error);
  }
};

export default solutionsEntryController;
