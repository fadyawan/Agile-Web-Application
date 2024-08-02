const app = require('../app');
const controller = require('../controllers/staffAssignment');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/id/:id', controller.getById);
router.get('/staff/:staff_id', controller.getByStaff);
router.get('/manager/:manager_id', controller.getByManager);

router.post('/', controller.create);
router.delete('/', controller.deleting);

module.exports = router;