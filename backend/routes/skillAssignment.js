const app = require('../app');
const controller = require('../controllers/skillAssignment');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/id/:id', controller.getById);
router.get('/skill/:skill_id', controller.getBySkills);
router.get('/staff/:staff_id', controller.getByStaff);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);


module.exports = router;
