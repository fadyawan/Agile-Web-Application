const app = require('../app');
const controller = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/user/:firstname/:surname', controller.getByName);
router.get('/user/:job_role', controller.getByJobRole);
router.get('/user/:system_role', controller.getBySystemRole);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;