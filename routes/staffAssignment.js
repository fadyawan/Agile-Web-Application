const app = require('../app');
const controller = require('../controllers/staffAssignment');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:staff_id', controller.getByStaff);
router.get('/:manager_id', controller.getByManager);


router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;