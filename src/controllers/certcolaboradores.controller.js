const {
    CertColaboradores,
    Colaboradores,
    Sequelize,
    Certificaciones,
    Empresa,
    Cursos
} = require('../models');

const Op = Sequelize.Op;
const paging = require("./../utils/Paging.utils");

exports.findAll = async (req, res, next) => {
    var numerodocumento = req.params.id
    const {
        page,
        size,
        idcer,
        idcol,
        idcur,
        idemp,
        cohorte
    } = req.query;

    var condition = {};
    var conditioncol = {};
    var conditioncert = {}

    if (idcur) {
        conditioncert.idcur_cer = {
            [Op.eq]: idcur
        }
    }
    if (cohorte) {
        conditioncert.cohorte_cer = {
            [Op.eq]: cohorte
        }
    }

    if (numerodocumento) {
        conditioncol.numerodocumento = {
            [Op.eq]: numerodocumento
        }
    }

    if (idcer) {
        condition.idcer_ceco = {
            [Op.eq]: idcer
        }
    }
    if (idcol) {
        condition.idcol_ceco = {
            [Op.eq]: idcol
        }
    }
    if (idemp) {
        condition.idemp_ceco = {
            [Op.eq]: idemp
        }
    }

    const {
        limit,
        offset
    } = paging.getPagination(page, size);

    CertColaboradores.findAndCountAll({
        include: [{
            model: Colaboradores,
            where: conditioncol
        },
        {
            model: Certificaciones,
            include: [{
                model: Cursos,
            }],
            where: conditioncert
        },
        {
            model: Empresa
        },
        ],
        where: condition,
        order: ['consecutivo_ceco'],
        limit,
        offset
    })
        .then(data => {
            const response = paging.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            next(err)
        });
};

exports.findByCedula = async (req, res, next) => {

    const {
        numerodocumento,
        page,
        size,
    } = req.query;
    var conditioncol = {}
    if (numerodocumento) {
        conditioncol.numerodocumento_col = {
            [Op.eq]: numerodocumento
        }
    } else {
        next({
            message: 'Cedula requerida',
            status: 500
        })
    }

    const {
        limit,
        offset
    } = paging.getPagination(page, size);

    CertColaboradores.findAndCountAll({
        include: [{
            model: Colaboradores,
            where: conditioncol
        },
        {
            model: Certificaciones,
            include: [{
                model: Cursos
            }]

        },
        {
            model: Empresa
        },
        ],
        limit,
        offset
    })
        .then(data => {
            const response = paging.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            next(err)
        });
};

exports.findOne = async (req, res, next) => {
    const id = req.params.id;

    CertColaboradores.findOne({
        include: [{
            model: Colaboradores
        },
        {
            model: Certificaciones,
            include: [{
                model: Cursos
            }]
        },
        {
            model: Empresa
        }],
        where: {
            id_ceco: {
                [Op.eq]: id
            }
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find certificados with id=${id}.`
                });
            }
        })
        .catch(err => {
            next(err);
        });
};

exports.create = async (req, res, next) => {

    CertColaboradores.bulkCreate(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = async (req, res, next) => {
    const id = req.params.id;

    const cercol = {
        idcer_ceco: req.body.idcer,
        idcol_ceco: req.body.idcol,
        idemp_ceco: req.body.idemp,
        estado_ceco: req.body.estado,
        descargado_ceco: req.body.descargado
    };

    CertColaboradores.update(cercol, {
        where: {
            id_ceco: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Certificacion was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Certificacion with id=${id}. Maybe Certificacion was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id + " error " + err
            });
        });
};

exports.updateEstado = async (req, res, next) => {
    const id = req.params.id;

    const cercol = {
        estado_ceco: req.body.estado,
    };
    CertColaboradores.update(cercol, {
        where: {
            id_ceco: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Certificacion was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Certificacion with id=${id}. Maybe Certificacion was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            next(err)
        });
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    CertColaboradores.destroy({
        where: {
            id_ceco: id
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