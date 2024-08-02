const app = require('../app');
const controller = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/id/:id', controller.getById);
router.get('/name/:firstname/:surname', controller.getByName);
router.get('/jobrole/:job_role', controller.getByJobRole);
router.get('/sysRole/:system_role_id', controller.getBySystemRole);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;