const systemRoleController = require('./systemRole.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { SystemRole } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('System Role Controller', () => {
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
    it('should return all system roles', async () => {
      const systemRoles = [{ id: 1, systemRole: 'Admin' }];
      SystemRole.findAll.mockResolvedValue(systemRoles);

      await systemRoleController.getAll(req, res);

      expect(SystemRole.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(systemRoles);
    });
  });

  describe('getById', () => {
    it('should return system role by id', async () => {
      const systemRole = { id: 1, systemRole: 'Admin' };
      SystemRole.findByPk.mockResolvedValue(systemRole);
      req.params.id = 1;

      await systemRoleController.getById(req, res);

      expect(SystemRole.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(systemRole);
    });

    it('should handle system role not found', async () => {
      SystemRole.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await systemRoleController.getById(req, res);

      expect(SystemRole.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find the system role with id 1');
    });
  });

  describe('create', () => {
    it('should create a new system role', async () => {
      const newSystemRole = { id: 1, systemRole: 'Admin' };
      req.body = { system_role: 'Admin' };
      SystemRole.create.mockResolvedValue(newSystemRole);

      await systemRoleController.create(req, res);

      expect(SystemRole.create).toHaveBeenCalledWith({ systemRole: 'Admin' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newSystemRole);
    });

    it('should handle missing essential fields', async () => {
      req.body = { system_role: null };

      await systemRoleController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });
  });

  describe('deleting', () => {
    it('should delete a system role', async () => {
      req.body.id = 1;
      SystemRole.destroy.mockResolvedValue(1);

      await systemRoleController.deleting(req, res);

      expect(SystemRole.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('system role deleted');
    });

    it('should handle system role not found for deletion', async () => {
      req.body.id = 1;
      SystemRole.destroy.mockResolvedValue(0);

      await systemRoleController.deleting(req, res);

      expect(SystemRole.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });

  describe('update', () => {
    it('should update a system role', async () => {
      req.body = { id: 1, system_role: 'User' };
      const updatedSystemRole = { id: 1, systemRole: 'User' };
      SystemRole.update.mockResolvedValue([1, [updatedSystemRole]]);

      await systemRoleController.update(req, res);

      expect(SystemRole.update).toHaveBeenCalledWith({ systemRole: 'User' }, { where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ systemRole: 'User' });
    });

    it('should handle missing essential fields', async () => {
      req.body = { id: 1, system_role: null };

      await systemRoleController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Missing essential fields');
    });
  });
});
