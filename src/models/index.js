const Sequelize = require("sequelize");

const cuentaaccesoModel = require("./cuentaacceso.model")
const cursosModel = require("./cursos.model.js")
const certificacionesModel = require("./certificaciones.model")
const empresasModel = require("./empresas.model")
const colaboradoresModel = require("./colaboradores.model")
const rolesModel = require("./roles.model")
const certColaboradoresModel = require("./certcolaboradores.model")
const paisesModel = require("./paises.model")
const tipodocumentosModel = require("./tipodocumentos.model")

const sequelize = new Sequelize("opem", "root", "mojica123", {
  host: "127.0.0.1",
  dialect: "mariadb",
  define: {
    timestamps: false
  }
});
sequelize.sync({
  force: false
}).then(() => {
  console.log('tablas sincronizadas')
})

const Cursos = cursosModel(sequelize, Sequelize);
const Certificaciones = certificacionesModel(sequelize, Sequelize, Cursos);
const Empresa = empresasModel(sequelize, Sequelize);
const Colaboradores = colaboradoresModel(sequelize, Sequelize)
const CuentaAcceso = cuentaaccesoModel(sequelize, Sequelize)
const Roles = rolesModel(sequelize, Sequelize)
const CertColaboradores = certColaboradoresModel(sequelize, Sequelize)
const Paises = paisesModel(sequelize,Sequelize)
const TipoDocumentos = tipodocumentosModel(sequelize,Sequelize)

Certificaciones.belongsTo(Cursos, {
  foreignKey: "idcur_cer"
})
Colaboradores.belongsTo(Paises,{
  foreignKey:"paisdocumento_col"
})

CertColaboradores.belongsTo(Colaboradores, {
  foreignKey: 'idcol_ceco'
})
CertColaboradores.belongsTo(Certificaciones, {
  foreignKey: 'idcer_ceco'
})
CertColaboradores.belongsTo(Empresa, {
  foreignKey: 'idemp_ceco'
})

module.exports = {
  Sequelize,
  sequelize,
  Cursos,
  Certificaciones,
  Empresa,
  Colaboradores,
  CuentaAcceso,
  Roles,
  CertColaboradores,
  Paises,
  TipoDocumentos
}