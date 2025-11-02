const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ajustar la importación del middleware para tolerar ambos estilos de export
const authModule = require('../middleware/authMiddleware');
const authenticate = authModule.authenticate || authModule;

router.use(authenticate);

router.get('/', userController.list);
router.post('/', userController.create);
router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;