const app = require('../app');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/skill');

router.get('/', controller.getAll);
router.get('/id/:id', controller.getSkillById);
router.get('/description/:description', controller.getSkillByDescription);
router.get('/category/:category_id', controller.getSkillByCategory);

router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;