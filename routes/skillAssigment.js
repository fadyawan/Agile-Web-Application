const app = require('../app');
const controller = require('../controllers/skillAssignment');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/skill/:skill', controller.getBySkills);
router.get('/staff/:staff', controller.getByStaff);

router.post('/', controller.create);
router.delete('/',controller.deleting);
router.put('/', controller.update);

module.exports = router;