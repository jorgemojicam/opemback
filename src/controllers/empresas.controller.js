const {
    Empresa
} = require('../models');

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Empresa.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const empresa = {       
        nombre_emp: req.body.nombre,
        nit_emp: req.body.nit,
        telefono_emp: req.body.telefono,
        correo_emp: req.body.correo,
        direccion_emp: req.body.direccion,
        personacontacto_emp: req.body.personacontacto
    };
    Empresa.create(empresa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Empresa.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Empresa was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Empresa with id=${id}. Maybe Empresa was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Empresa with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Empresa.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cursos was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cursos with id=${id}. Maybe Cursos was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cursos with id=" + id
            });
        });
};