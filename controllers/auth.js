import { response, request } from 'express';
import Usuario from '../models/Usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT.js';


export const login = async (req = request, res = response) => {

    // Obtenemos los datos del cuerpo
    const { correo, contrasena } = req.body;

    try {

        // Verificamos si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({ errors: [
                {
                    msg: 'Usuario y/o contraseña incorrectos'
                }
            ]});
        }

        // Verificamos si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({ errors: [
                {
                    msg: 'Usuario y/o contraseña incorrectos'
                }
            ]});
        }
        
        // Verificamos la contraseña
        const validPassword = bcryptjs.compareSync( contrasena, usuario.contrasena );
        if ( !validPassword ) {
            return res.status(400).json({ errors: [
                {
                    msg: 'Usuario y/o contraseña incorrectos'
                }
            ]});
        }

        // Generamos el JWT
        const token = await generarJWT( usuario.id );

        // Devolvemos una respuesta
        return res.status(200).json({
            usuario,
            token
        });

    } catch ( error ) {
        return res.status(500).json( error );
    }

}
