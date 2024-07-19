const app = require('../app');
const controller = require('../controllers/skillAssignment');
const express = require('express');
const router = express.Router();

// Some of these endpoints don't run properly, mainly delete, there were some endpoints that had the same call conditions with differing functions being called from the endpoint.

router.get('/', controller.getAll);
router.get('/:skill', controller.getBySkills);
router.get('/:firstname/surname', controller.getByStaff);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.delete('/', controller.staffIsDeleted);
router.delete('/', controller.skillIsDeleted);
router.put('/', controller.update);

router.get('/staffDetails', controller.getAllStaffDetails);

module.exports = router;
