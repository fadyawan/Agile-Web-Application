const app = require('../app');
const controller = require('../controllers/skillLevel');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.deleting);
router.put('/:id', controller.update);

module.exports = router;