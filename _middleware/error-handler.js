const consola = require("consola");

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            consola.error("Status code: "+statusCode+"  ----> "+err);
            return res.status(statusCode).json({ error:true, message: err });
        case err.name === 'InvalidParams':
            consola.error("Status code: 422  ----> "+JSON.stringify(err.errores));
            return res.status(422).json({error:true,errores: err.errores});
        case err.name === 'UnauthorizedError':
            // jwt authentication error

            consola.error("Status code: 401  ----> Unauthorized");
            return res.status(401).json({error:true, message: 'Unauthorized' });
        default:
            consola.error("Status code: 500  ----> "+err.message);
            return res.status(500).json({ error:true, message: err.message });
    }
}