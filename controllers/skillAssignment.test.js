const skillAssignmentController = require('./skillAssignment.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { SkillAssignment, Skill, User, SkillLevel } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('Skill Assignment Controller', () => {
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
    it('should return all skill assignments', async () => {
      const skillAssignments = [{ id: 1, staff_id: 1 }];
      SkillAssignment.findAll.mockResolvedValue(skillAssignments);

      await skillAssignmentController.getAll(req, res);

      expect(SkillAssignment.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillAssignments);
    });
  });

  describe('getById', () => {
    it('should return skill assignment by id', async () => {
      const skillAssignment = { id: 1, staff_id: 1 };
      SkillAssignment.findByPk.mockResolvedValue(skillAssignment);
      req.params.id = 1;

      await skillAssignmentController.getById(req, res);

      expect(SkillAssignment.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillAssignment);
    });

    it('should handle skill assignment not found', async () => {
      SkillAssignment.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await skillAssignmentController.getById(req, res);

      expect(SkillAssignment.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('getBySkills', () => {
    it('should return skill assignments by skill', async () => {
      const skills = [{ id: 1, description: 'Skill 1' }];
      const skillAssignments = [{ skill_id: 1, staff_id: 1 }];
      Skill.findAll.mockResolvedValue(skills);
      SkillAssignment.findAll.mockResolvedValue(skillAssignments);
      req.params.skill = 'Skill 1';

      await skillAssignmentController.getBySkills(req, res);

      expect(Skill.findAll).toHaveBeenCalledWith({ where: { description: 'Skill 1' } });
      expect(SkillAssignment.findAll).toHaveBeenCalledWith({ where: { skill_id: skills[0].id } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillAssignments);
    });

    it('should handle skill not found', async () => {
      Skill.findAll.mockResolvedValue([]);
      req.params.skill = 'Skill 1';

      await skillAssignmentController.getBySkills(req, res);

      expect(Skill.findAll).toHaveBeenCalledWith({ where: { description: 'Skill 1' } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('getByStaff', () => {
    it('should return skill assignments by staff', async () => {
      const staff = [{ id: 1, firstname: 'John', surname: 'Doe' }];
      const skillAssignments = [{ staff_id: 1, skill_id: 1 }];
      User.findAll.mockResolvedValue(staff);
      SkillAssignment.findAll.mockResolvedValue(skillAssignments);
      req.params.firstname = 'John';
      req.params.surname = 'Doe';

      await skillAssignmentController.getByStaff(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { firstname: 'John', surname: 'Doe' } });
      expect(SkillAssignment.findAll).toHaveBeenCalledWith({ where: { staff_id: staff[0].id } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(skillAssignments);
    });

    it('should handle staff not found', async () => {
      User.findAll.mockResolvedValue([]);
      req.params.firstname = 'John';
      req.params.surname = 'Doe';

      await skillAssignmentController.getByStaff(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { firstname: 'John', surname: 'Doe' } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('create', () => {
    it('should create a new skill assignment', async () => {
      const staff = [{ id: 1 }];
      const skill = [{ id: 1 }];
      const skillLevel = [{ id: 1 }];
      const newSkillAssignment = { id: 1, staff_id: 1, skill_id: 1, skill_level_id: 1 };
      req.body = { firstname: 'John', surname: 'Doe', skill: 'Skill 1', skill_level: 'Beginner', expiry_date: '2024-01-01' };
      User.findAll.mockResolvedValue(staff);
      Skill.findAll.mockResolvedValue(skill);
      SkillLevel.findAll.mockResolvedValue(skillLevel);
      SkillAssignment.create.mockResolvedValue(newSkillAssignment);

      await skillAssignmentController.create(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { firstname: 'John', surname: 'Doe' } });
      expect(Skill.findAll).toHaveBeenCalledWith({ where: { description: 'Skill 1' } });
      expect(SkillLevel.findAll).toHaveBeenCalledWith({ where: { skill_level: 'Beginner' } });
      expect(SkillAssignment.create).toHaveBeenCalledWith({
        staff_id: staff[0].id,
        skill_id: skill[0].id,
        skill_level_id: skillLevel[0].id,
        expiry_date: '2024-01-01',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newSkillAssignment);
    });

    it('should handle missing essential fields', async () => {
      req.body = { firstname: 'John', surname: 'Doe', skill: 'Skill 1', skill_level: 'Beginner' };

      await skillAssignmentController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });

    it('should handle staff not found', async () => {
      req.body = { firstname: 'John', surname: 'Doe', skill: 'Skill 1', skill_level: 'Beginner', expiry_date: '2024-01-01' };
      User.findAll.mockResolvedValue([]);

      await skillAssignmentController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });

    it('should handle skill not found', async () => {
      req.body = { firstname: 'John', surname: 'Doe', skill: 'Skill 1', skill_level: 'Beginner', expiry_date: '2024-01-01' };
      User.findAll.mockResolvedValue([{ id: 1 }]);
      Skill.findAll.mockResolvedValue([]);

      await skillAssignmentController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });

    it('should handle skill level not found', async () => {
      req.body = { firstname: 'John', surname: 'Doe', skill: 'Skill 1', skill_level: 'Beginner', expiry_date: '2024-01-01' };
      User.findAll.mockResolvedValue([{ id: 1 }]);
      Skill.findAll.mockResolvedValue([{ id: 1 }]);
      SkillLevel.findAll.mockResolvedValue([]);

      await skillAssignmentController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, expect.any(String));
    });
  });

  describe('delete', () => {
    it('should delete a skill assignment', async () => {
      req.body.id = 1;
      SkillAssignment.destroy.mockResolvedValue(1);

      await skillAssignmentController.deleting(req, res);

      expect(SkillAssignment.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('skill assignment deleted');
    });

    it('should handle skill assignment not found for deletion', async () => {
      req.body.id = 1;
      SkillAssignment.destroy.mockResolvedValue(0);

      await skillAssignmentController.deleting(req, res);

      expect(SkillAssignment.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });

  describe('update', () => {
    it('should update an existing skill assignment', async () => {
      const updatedSkillAssignment = { id: 1, expiry_date: '2024-01-01', skill_level_id: 1 };
      req.body = { id: 1, expiry_date: '2024-01-01', skill_level_id: 1 };
      SkillAssignment.update.mockResolvedValue([1, [updatedSkillAssignment]]);

      await skillAssignmentController.update(req, res);

      expect(SkillAssignment.update).toHaveBeenCalledWith(
        {
          expiry: req.body.expiry_date,
          skill_level: req.body.skill_level_id,
        },
        { where: { id: req.body.id } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedSkillAssignment);
    });

    it('should handle missing essential fields for update', async () => {
      req.body = { id: 1, expiry_date: '', skill_level_id: 1 };

      await skillAssignmentController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Missing essential fields');
    });
  });

  describe('getAllStaffDetails', () => {
    it('should return all staff details with skill assignments', async () => {
      const staffDetails = [
        {
          id: 1,
          firstname: 'John',
          surname: 'Doe',
          SkillAssignments: [
            {
              skill_id: 1,
              Skill: { id: 1, description: 'Skill 1', SkillCategory: { id: 1, name: 'Category 1' } },
              SkillLevel: { id: 1, skill_level: 'Beginner' },
            },
          ],
        },
      ];
      User.findAll.mockResolvedValue(staffDetails);

      await skillAssignmentController.getAllStaffDetails(req, res);

      expect(User.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: SkillAssignment,
            include: [
              { model: Skill, include: [SkillCategory] },
              { model: SkillLevel },
            ],
          },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(staffDetails);
    });

    it('should handle errors while fetching staff details', async () => {
      const error = new Error('Database error');
      User.findAll.mockRejectedValue(error);

      await skillAssignmentController.getAllStaffDetails(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 500, error.message);
    });
  });
});
