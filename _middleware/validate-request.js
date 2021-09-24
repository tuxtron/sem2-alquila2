module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
        errors: {
            wrap: {
                label: ''
            }
        }
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {

        var errores = {}
        error.details.map(x => {
            errores[x.path] = x.message
        })
        next({name: 'InvalidParams',errores:errores} );
    } else {
        req.body = value;
        next();
    }
}