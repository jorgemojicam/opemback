const express = require('express');
const router = express.Router();
const empresas = require("../controllers/empresas.controller");
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const auth = require('./../middleware/auth');

router.post("/", auth(), awaitHandlerFactory(empresas.create));
router.get("/GetAll/:id?", awaitHandlerFactory(empresas.findAll));
router.get("/:id?", awaitHandlerFactory(empresas.findPaging));
router.put("/:id", auth(), awaitHandlerFactory(empresas.update));
router.delete("/:id", auth(), awaitHandlerFactory(empresas.delete));

module.exports = router;