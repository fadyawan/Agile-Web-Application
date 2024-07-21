const skillLevelController = require('./skillLevel.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { SkillLevel } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('Skill Level Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe('getAll', () => {
    it('should return all skill levels', async () => {
      const skillLevels = [{ id: 1, skillLevel: 'Beginner' }];
      SkillLevel.findAll.mockResolvedValue(skillLevels);

      await skillLevelController.getAll(req, res);

      expect(SkillLevel.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillLevels);
    });
  });

  describe('getById', () => {
    it('should return skill level by id', async () => {
      const skillLevel = { id: 1, skillLevel: 'Beginner' };
      SkillLevel.findByPk.mockResolvedValue(skillLevel);
      req.params.id = 1;

      await skillLevelController.getById(req, res);

      expect(SkillLevel.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillLevel);
    });

    it('should handle skill level not found', async () => {
      SkillLevel.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await skillLevelController.getById(req, res);

      expect(SkillLevel.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find the skill level with id 1');
    });
  });

  describe('create', () => {
    it('should create a new skill level', async () => {
      const newSkillLevel = { id: 1, skillLevel: 'Beginner' };
      req.body = { skill_level: 'Beginner' };
      SkillLevel.create.mockResolvedValue(newSkillLevel);

      await skillLevelController.create(req, res);

      expect(SkillLevel.create).toHaveBeenCalledWith({ skillLevel: 'Beginner' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newSkillLevel);
    });

    it('should handle missing essential fields', async () => {
      req.body = { skill_level: '' };

      await skillLevelController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });
  });

  describe('delete', () => {
    it('should delete a skill level', async () => {
      req.body.id = 1;
      SkillLevel.destroy.mockResolvedValue(1);

      await skillLevelController.deleting(req, res);

      expect(SkillLevel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('skill category deleted');
    });

    it('should handle skill level not found for deletion', async () => {
      req.body.id = 1;
      SkillLevel.destroy.mockResolvedValue(0);

      await skillLevelController.deleting(req, res);

      expect(SkillLevel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });

  describe('update', () => {
    it('should update an existing skill level', async () => {
      const updatedSkillLevel = { id: 1, skillLevel: 'Advanced' };
      req.body = { id: 1, skill_level: 'Advanced' };
      SkillLevel.update.mockResolvedValue([1, [updatedSkillLevel]]);

      await skillLevelController.update(req, res);

      expect(SkillLevel.update).toHaveBeenCalledWith(
        { skillLevel: 'Advanced' },
        { where: { id: req.body.id } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ skillLevel: 'Advanced' });
    });

    it('should handle missing essential fields for update', async () => {
      req.body = { id: 1, skill_level: '' };

      await skillLevelController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Missing essential fields');
    });
  });
});
