const app = require('../app');
const controller = require('../controllers/skillAssignment');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/skill/:skill', controller.getBySkills);
router.get('/staff/:firstname_surname', controller.getByStaff);

router.post('/', controller.create);
router.delete('/',controller.deleting);
router.delete('/',controller.staffIsDeleted);
router.delete('/',controller.skillIsDeleted);
router.put('/', controller.update);

module.exports = router;