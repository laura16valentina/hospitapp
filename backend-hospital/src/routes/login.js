const express = require('express');
const logincontroller = require('../controllers/logincontroller');

const router = express.Router();

router.post('/api/login', logincontroller.auth);
router.post('/api/register', logincontroller.storeUser);
router.get('/api/user', logincontroller.obtenerUsuarios);
router.post('/api/citas', logincontroller.storecitas);
router.get('/api/obtenercitas', logincontroller.obtenercitas);
router.post('/api/storenovedades', logincontroller.storenovedades);
router.get('/api/obtenernovedades', logincontroller.obtenenovedades);
router.get('/api/obtenermiscitas/:email', logincontroller.obtenermiscitas);
router.get('/api/obtenermisnovedades/:email', logincontroller.obtenemisnovedades);

module.exports = router;