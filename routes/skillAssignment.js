const app = require('../app');
const controller = require('../controllers/skillAssignment');
const express = require('express');
const router = express.Router();

// Some of these endpoints don't run properly, mainly delete, there were some endpoints that had the same call conditions with differing functions being called from the endpoint.

router.get('/', controller.getAll);
router.get('/id/:id', controller.getById);
router.get('/skill/:skill', controller.getBySkills);
router.get('/name/:firstname/:surname', controller.getByStaff);
router.get('/staffDetails', controller.getAllStaffDetails);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);


module.exports = router;
