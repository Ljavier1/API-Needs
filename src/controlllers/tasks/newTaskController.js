import insertTasksModel from "../../models/tasks/insertTasksModel.js";
import { fileService } from "../../service/fileService.js";

const newTaskController = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let photos = [];

    if (req.files) {
      for (let file of Object.values(req.files).slice(0, 3)) {
        let photoName = await fileService(file);

        const { taskId, photoId } = await insertTasksModel(
          title,
          description,
          photoName,
          req.user.id
        );

        photos.push({
          id: photoId,
          name: photoName,
        });
      }
    }

    res.send({
      status: "ok",
      data: {
        task: {
          id: taskId,
          title,
          description,
          userId: req.user.id,
          photos,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default newTaskController;
