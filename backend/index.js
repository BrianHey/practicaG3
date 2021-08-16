const express = require('express');
const app = express();
app.listen(3000, console.log('Server up'))
const { get } = require('./controllers/getUsuarios')
const jwt = require('jwt');
const secretKey = 'laPwMasSecreta';
const expressFileUpload = require('express-fileupload');
const { deleteUser } = require('./consults.js');
app.get('/', get

);

//JWT Middleware
app.use((req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send({
            code: 401,
            message: 'El token no existe.'
        });
    };
    jwt.verify(token, secretKey, (error, data) => {
        if (error) {
            return res.status(401).send({
                code: 401,
                message: 'El token no es válido.'
            })
        };
        next();
    });
});
//Fin JWT Middleware

//Rutas mal consultadas
app.all('*', (req, res) => {
    res.status(404).send({
        code: 404,
        message: 'La ruta consultada no existe',
    });
});
//Fin Rutas mal consultadas

//Archivo excede tamaño
const config = expressFileUpload({
    limit: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'El peso del archivo supera el máximo permitido (5MB)'
});
app.use(config);
//Fin Archivo excede tamaño

//Delete user
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const {length: cantidadDeUsuariosEliminados} = await deleteUser([id]);
    if (!cantidadDeUsuariosEliminados){
        res.status(404).send({
            code: 404,
            message: 'No se encontró el usuario'
        })
    } res.send('Usuario eliminado con éxito')
})
//Fin Delete user