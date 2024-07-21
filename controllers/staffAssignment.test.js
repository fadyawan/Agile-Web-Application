const staffAssignmentController = require('./staffAssignment.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { StaffAssignment, User } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('Staff Assignment Controller', () => {
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
    it('should return all staff assignments', async () => {
      const staffAssignments = [{ id: 1, staffId: 1, managerId: 1 }];
      StaffAssignment.findAll.mockResolvedValue(staffAssignments);

      await staffAssignmentController.getAll(req, res);

      expect(StaffAssignment.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(staffAssignments);
    });
  });

  describe('getById', () => {
    it('should return staff assignment by id', async () => {
      const staffAssignment = { id: 1, staffId: 1, managerId: 1 };
      StaffAssignment.findByPk.mockResolvedValue(staffAssignment);
      req.params.id = 1;

      await staffAssignmentController.getById(req, res);

      expect(StaffAssignment.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(staffAssignment);
    });

    it('should handle staff assignment not found', async () => {
      StaffAssignment.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await staffAssignmentController.getById(req, res);

      expect(StaffAssignment.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find the staff assignment with id 1');
    });
  });

  describe('getByStaff', () => {
    it('should return assignments for staff by staff id', async () => {
      const staff = { id: 1, name: 'John Doe' };
      const staffAssignments = [{ id: 1, staffId: 1, managerId: 2 }];
      User.findByPk.mockResolvedValue(staff);
      StaffAssignment.findAll.mockResolvedValue(staffAssignments);
      req.params.staff_id = 1;

      await staffAssignmentController.getByStaff(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(StaffAssignment.findAll).toHaveBeenCalledWith({ where: { staff_id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(staffAssignments);
    });

    it('should handle staff not found', async () => {
      User.findByPk.mockResolvedValue(null);
      req.params.staff_id = 1;

      await staffAssignmentController.getByStaff(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find staff with id 1');
    });
  });

  describe('getByManager', () => {
    it('should return assignments for manager by manager id', async () => {
      const manager = { id: 1, name: 'Jane Smith' };
      const staffAssignments = [{ id: 1, staffId: 2, managerId: 1 }];
      User.findByPk.mockResolvedValue(manager);
      StaffAssignment.findAll.mockResolvedValue(staffAssignments);
      req.params.manager_id = 1;

      await staffAssignmentController.getByManager(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(StaffAssignment.findAll).toHaveBeenCalledWith({ where: { manager_id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(staffAssignments);
    });

    it('should handle manager not found', async () => {
      User.findByPk.mockResolvedValue(null);
      req.params.manager_id = 1;

      await staffAssignmentController.getByManager(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find manager with id 1');
    });
  });

  describe('create', () => {
    it('should create a new staff assignment', async () => {
      const newStaffAssignment = { id: 1, staffId: 1, managerId: 1 };
      req.body = { staff_id: 1, manager_id: 1 };
      User.findAll.mockResolvedValue([{ id: 1 }]);
      StaffAssignment.create.mockResolvedValue(newStaffAssignment);

      await staffAssignmentController.create(req, res);

      expect(User.findAll).toHaveBeenCalledTimes(2);
      expect(StaffAssignment.create).toHaveBeenCalledWith({ staffId: 1, managerId: 1 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newStaffAssignment);
    });

    it('should handle missing essential fields', async () => {
      req.body = { staff_id: null, manager_id: null };

      await staffAssignmentController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });
  });

  describe('delete', () => {
    it('should delete a staff assignment', async () => {
      req.body.id = 1;
      StaffAssignment.destroy.mockResolvedValue(1);

      await staffAssignmentController.deleting(req, res);

      expect(StaffAssignment.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('staff assignment deleted');
    });

    it('should handle staff assignment not found for deletion', async () => {
      req.body.id = 1;
      StaffAssignment.destroy.mockResolvedValue(0);

      await staffAssignmentController.deleting(req, res);

      expect(StaffAssignment.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });
});
