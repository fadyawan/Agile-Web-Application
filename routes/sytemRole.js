const app = require('../app');
const controller = require('../controllers/systemRole');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;