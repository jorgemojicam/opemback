module.exports = (sequelize, type) => {
    return sequelize.define('roles', {
        id_rol: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_rol: type.STRING,
        descripcion_rol: type.STRING,        
    });
}