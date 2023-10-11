const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        //Payload
        const payload = { uid };

        //Generar el token
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: "4h" },
            (err, token) => {
                if(err){
                    console.log(err);
                    reject("No se puede generar el TOKEN");
                }else{
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generarJWT,
}