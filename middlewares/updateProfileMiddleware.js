async function updateProfile(req, res) {
    try {
      const { name, email, bio } = req.body;
      const photo = req.file.path;
    
      // Actualizar perfil
      const [result] = await connection.query(
        'UPDATE users SET name = ?, email = ?, bio = ?, photo = ? WHERE id = ?',
        [name, email, bio, photo, req.user.id]
      );
    
      if (result.affectedRows > 0) {
        res.status(200).send('Perfil actualizado con éxito.');
      } else {
        res.status(404).send('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.message);
      res.status(500).send('Error interno del servidor.');
    }
  }

export default updateProfile;
  