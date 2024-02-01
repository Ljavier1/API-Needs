# API-Needs

Esta aplicación está creada para gestionar la oferta y demanda de servicios por parte de trabajadores/freelancers y quien los quiera contratar. En ella los usuarios deben registrar su perfil para publicar su anuncio y ponerse en contacto con el resto de usuarios.

ENDPOINTS

ANONIMO
    TASKS
        getAllTasks - Devuelve una lista de las tareas publicadas
        getTaskById - Devuelve una lista de las tareas según su ID
    USERS
        newUser - Registro de nuevo usuario
        loginUser - Login de usuario ya registrado

REGISTRADOS
    TASKS
        newTask - Publicación de nueva tarea
        newSolutions - Publicación de nueva solución a la tarea
        newComment - Publicación de un nuevo comentario
        statusTask - Devuelve el estado de la tarea (resuelta o no)
    USERS
        uploadAvatar - Subida de archivo para personalizar el avatar