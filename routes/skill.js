const app = require('../app');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillController');

router.get('/', controller.getAll);
router.get('/:id', controller.getSkillById);
router.get('/:description', controller.getSkillByDescription);
router.get('/:category', controller.getSkillByCategory);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleting);

module.exports = router;