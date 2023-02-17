const { check } = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({ min: 3, max: 20 }).withMessage("El nombre debe tener entre 3 y 20 caracteres"),

    check("category")
        .notEmpty().withMessage("Debes indicar la categoría"),

    check("brand")
        .notEmpty().withMessage("Debes indicar la marca"),

    check("description")
        .notEmpty().withMessage("La descripción es obligatoria").bail()
        .isLength({ min: 20}).withMessage("La descripción debe tener mínimo 20 caracteres"),
    
    check("price")
        .notEmpty().withMessage("El precio es obligatorio").bail()
        .isInt({min:1}).withMessage("Debes indicar un precio"),

    check("discount")
        .notEmpty().withMessage("El descuento es obligatorio").bail()
        .isInt({min:0,max:99}).withMessage("El descuento no puede ser más del 100%"),

    check("image")
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".png", ".gif"];
            if (!file) {
                throw new Error("Tienes que subir una imagen");
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
                }
            }
            return true;
        })
];
