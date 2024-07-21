const skillController = require('./skill.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { Skill, SkillCategory } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('Skill Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('getAll', () => {
    it('should return all skills', async () => {
      const skills = [{ id: 1, description: 'Skill 1' }];
      Skill.findAll.mockResolvedValue(skills);

      await skillController.getAll(req, res);

      expect(Skill.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skills);
    });
  });

  describe('getSkillById', () => {
    it('should return skill by id', async () => {
      const skill = { id: 1, description: 'Skill 1' };
      Skill.findByPk.mockResolvedValue(skill);
      req.params.id = 1;

      await skillController.getSkillById(req, res);

      expect(Skill.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skill);
    });

    it('should handle skill not found', async () => {
      Skill.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await skillController.getSkillById(req, res);

      expect(Skill.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('getSkillByDescription', () => {
    it('should return skill by description', async () => {
      const skill = [{ id: 1, description: 'Skill 1' }];
      Skill.findAll.mockResolvedValue(skill);
      req.params.description = 'Skill 1';

      await skillController.getSkillByDescription(req, res);

      expect(Skill.findAll).toHaveBeenCalledWith({ where: { description: 'Skill 1' } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skill);
    });

    it('should handle skill not found by description', async () => {
      Skill.findAll.mockResolvedValue([]);
      req.params.description = 'Skill 1';

      await skillController.getSkillByDescription(req, res);

      expect(Skill.findAll).toHaveBeenCalledWith({ where: { description: 'Skill 1' } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('create', () => {
    it('should create a new skill', async () => {
      const newSkill = { id: 1, description: 'Skill 1', skillCategoryId: 1 };
      req.body = { description: 'Skill 1', skill_category_id: 1 };
      SkillCategory.findAll.mockResolvedValue([{}]);
      Skill.create.mockResolvedValue(newSkill);

      await skillController.create(req, res);

      expect(SkillCategory.findAll).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(Skill.create).toHaveBeenCalledWith({
        description: 'Skill 1',
        skillCategoryId: 1
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newSkill);
    });

    it('should handle missing fields', async () => {
      req.body = { description: '', skill_category_id: 1 };

      await skillController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });

    it('should handle missing category', async () => {
      req.body = { description: 'Skill 1', skill_category_id: 1 };
      SkillCategory.findAll.mockResolvedValue([]);

      await skillController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('update', () => {
    it('should update an existing skill', async () => {
      const updatedSkill = { id: 1, description: 'Updated Skill', skillCategoryId: 1 };
      req.params.id = 1;
      req.body = { description: 'Updated Skill', skill_category_id: 1 };
      SkillCategory.findAll.mockResolvedValue([{}]);
      Skill.update.mockResolvedValue([1, [updatedSkill]]);

      await skillController.update(req, res);

      expect(SkillCategory.findAll).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(Skill.update).toHaveBeenCalledWith(
        { description: 'Updated Skill', skillCategoryId: 1 },
        { where: { id: 1 }, returning: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedSkill);
    });

    it('should handle missing fields', async () => {
      req.params.id = 1;
      req.body = { description: '', skill_category_id: 1 };

      await skillController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });

    it('should handle missing category', async () => {
      req.params.id = 1;
      req.body = { description: 'Updated Skill', skill_category_id: 1 };
      SkillCategory.findAll.mockResolvedValue([]);

      await skillController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('delete', () => {
    it('should delete a skill', async () => {
      req.body.id = 1;
      SkillCategory.destroy.mockResolvedValue(1);

      await skillController.deleting(req, res);

      expect(SkillCategory.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('skill deleted');
    });

    it('should handle skill not found for deletion', async () => {
      req.body.id = 1;
      SkillCategory.destroy.mockResolvedValue(0);

      await skillController.deleting(req, res);

      expect(SkillCategory.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });
});
