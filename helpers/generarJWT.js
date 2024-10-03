import jwt from 'jsonwebtoken';


export const generarJWT = ( uid = '' ) => {
    return new Promise((resolve, reject) => {

        // Preparamos el payload
        const payload = { uid };

        // Generamos el JWT
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            // Validamos si se produjo algún error al generar el JWT
            if ( err ) {

                console.log(err);
                reject('No se pudo generar el token');

            } else {
                resolve( token );
            }

        });

    });
}