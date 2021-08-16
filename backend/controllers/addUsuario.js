const { addUser } = require("consults");
const expresFileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const config = expresFileUpload({
  limit: { fileSize: 5000000 },
  abortOnLimit: true,
  responseOnLimit: `"El peso del archivo que intentas subir supera el limite permitido.`,
});
app.use(config);

const addUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    const { target_file } = req.files;
    const { mimetype } = target_file;
    if (!mimetype.startsWith("image"))
      return res.status(400).send({
        message: "El archivo que intentas subir no es de tipo imagen",
      });
    const nameImagen = `${usuario.name}.jpg`;
    await target_file.mv(`${__dirname}/public/imagenes/${nameImagen}`);
    const { password } = usuario;
    usuario.password = await bcrypt.hash(password, 10);
    usuario["photoURL"] = `http://localhost:3000/imagenes/${nameImagen}`;
    const userData = Object.values(usuario);
    const user = await addUser(userData);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).send({
      error: "500 Internal Server Error",
      message,
    });
  }
};

module.exports = addUsuario;
