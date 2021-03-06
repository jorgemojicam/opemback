module.exports = app => {

  const cursos = require("./cursos.routes")
  const cert = require("./certificaciones.routes")
  const empresa = require("./empresas.routes")
  const colabora = require('./colaboradores.routes')
  const cuentaacceso = require('./cuentaacceso.routes')
  const rol = require('./roles.routes')
  const certcol = require('./certcolaboradores.routes')
  const paises = require('./paises.routes')
  const tipodocs = require('./tipodocumentos.routes')
  const modulos = require('./modulos.routes')
  const permisosroles = require('./permisosroles.routes')
  const email = require('./email.routes')

  app.use(`/api/v1/cursos`, cursos);
  app.use(`/api/v1/certificaciones`, cert);
  app.use(`/api/v1/empresa`, empresa);
  app.use(`/api/v1/colaboradores`, colabora);
  app.use(`/api/v1/cuentaacceso`, cuentaacceso);
  app.use(`/api/v1/rol`, rol);
  app.use(`/api/v1/certcol`, certcol);
  app.use(`/api/v1/paises`, paises);
  app.use(`/api/v1/tipodocs`, tipodocs);
  app.use(`/api/v1/modulos`, modulos);
  app.use(`/api/v1/permisosroles`, permisosroles);
  app.use(`/api/v1/email`, email);

};