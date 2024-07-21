const skillCategoryController = require('./skillCategory.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { SkillCategory } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('Skill Category Controller', () => {
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
    it('should return all skill categories', async () => {
      const skillCategories = [{ id: 1, description: 'Category 1' }];
      SkillCategory.findAll.mockResolvedValue(skillCategories);

      await skillCategoryController.getAll(req, res);

      expect(SkillCategory.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillCategories);
    });
  });

  describe('getById', () => {
    it('should return skill category by id', async () => {
      const skillCategory = { id: 1, description: 'Category 1' };
      SkillCategory.findByPk.mockResolvedValue(skillCategory);
      req.params.id = 1;

      await skillCategoryController.getById(req, res);

      expect(SkillCategory.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillCategory);
    });

    it('should handle skill category not found', async () => {
      SkillCategory.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await skillCategoryController.getById(req, res);

      expect(SkillCategory.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('create', () => {
    it('should create a new skill category', async () => {
      const newSkillCategory = { id: 1, description: 'Category 1' };
      req.body = { description: 'Category 1' };
      SkillCategory.create.mockResolvedValue(newSkillCategory);

      await skillCategoryController.create(req, res);

      expect(SkillCategory.create).toHaveBeenCalledWith({ description: 'Category 1' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newSkillCategory);
    });

    it('should handle missing essential fields', async () => {
      req.body = { description: '' };

      await skillCategoryController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });
  });

  describe('delete', () => {
    it('should delete a skill category', async () => {
      req.body.id = 1;
      SkillCategory.destroy.mockResolvedValue(1);

      await skillCategoryController.deleting(req, res);

      expect(SkillCategory.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('skill category deleted');
    });

    it('should handle skill category not found for deletion', async () => {
      req.body.id = 1;
      SkillCategory.destroy.mockResolvedValue(0);

      await skillCategoryController.deleting(req, res);

      expect(SkillCategory.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });

  describe('update', () => {
    it('should update an existing skill category', async () => {
      const updatedSkillCategory = { id: 1, description: 'Updated Category' };
      req.body = { id: 1, description: 'Updated Category' };
      SkillCategory.update.mockResolvedValue([1, [updatedSkillCategory]]);

      await skillCategoryController.update(req, res);

      expect(SkillCategory.update).toHaveBeenCalledWith(
        { description: 'Updated Category' },
        { where: { id: req.body.id } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ description: 'Updated Category' });
    });

    it('should handle missing essential fields for update', async () => {
      req.body = { id: 1, description: '' };

      await skillCategoryController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Missing essential fields');
    });
  });
});
