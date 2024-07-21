const userController = require('./user.js');
const utilities = require('../utilities/utility');
const db = require('../models');
const { User, SystemRole } = db;

jest.mock('../models');
jest.mock('../utilities/utility');

describe('User Controller', () => {
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
    it('should return all users', async () => {
      const users = [{ id: 1, firstName: 'John', surname: 'Doe' }];
      User.findAll.mockResolvedValue(users);

      await userController.getAll(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const user = { id: 1, firstName: 'John', surname: 'Doe' };
      User.findByPk.mockResolvedValue(user);
      req.params.id = 1;

      await userController.getById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should handle user not found', async () => {
      User.findByPk.mockResolvedValue(null);
      req.params.id = 1;

      await userController.getById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find the user with id 1');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser = { id: 1, firstName: 'John', surname: 'Doe', username: 'johndoe', password: 'password', jobRole: 'Developer', systemRoleId: 1 };
      req.body = { firstname: 'John', surname: 'Doe', username: 'johndoe', password: 'password', job_role: 'Developer', system_role_id: 1 };
      SystemRole.findAll.mockResolvedValue([{ id: 1, systemRole: 'Admin' }]);
      User.create.mockResolvedValue(newUser);

      await userController.create(req, res);

      expect(SystemRole.findAll).toHaveBeenCalledWith({ where: { systemRoleId: 1 } });
      expect(User.create).toHaveBeenCalledWith(newUser);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it('should handle missing essential fields', async () => {
      req.body = { firstname: 'John', surname: 'Doe', username: 'johndoe', password: null, job_role: 'Developer', system_role_id: 1 };

      await userController.create(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Essential fields missing');
    });
  });

  describe('deleting', () => {
    it('should delete a user', async () => {
      req.body.id = 1;
      User.destroy.mockResolvedValue(1);

      await userController.deleting(req, res);

      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('user deleted');
    });

    it('should handle user not found for deletion', async () => {
      req.body.id = 1;
      User.destroy.mockResolvedValue(0);

      await userController.deleting(req, res);

      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 404, 'Id not found');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      req.body = { id: 1, firstname: 'John', surname: 'Doe', username: 'johndoe', password: 'newpassword', job_role: 'Developer', system_role_id: 1 };
      const updatedUser = { id: 1, firstName: 'John', surname: 'Doe', username: 'johndoe', password: 'newpassword', jobRole: 'Developer', systemRoleId: 1 };
      SystemRole.findAll.mockResolvedValue([{ id: 1, systemRole: 'Admin' }]);
      User.update.mockResolvedValue([1, [updatedUser]]);

      await userController.update(req, res);

      expect(SystemRole.findAll).toHaveBeenCalledWith({ where: { systemRoleId: 1 } });
      expect(User.update).toHaveBeenCalledWith(updatedUser, { where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should handle missing essential fields', async () => {
      req.body = { id: 1, firstname: 'John', surname: 'Doe', username: 'johndoe', password: null, job_role: 'Developer', system_role_id: 1 };

      await userController.update(req, res);

      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Missing essential fields');
    });
  });

  describe('getByName', () => {
    it('should return users by name', async () => {
      const users = [{ id: 1, firstName: 'John', surname: 'Doe' }];
      req.params.firstname = 'John';
      req.params.surname = 'Doe';
      User.findAll.mockResolvedValue(users);

      await userController.getByName(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { firstname: 'John', surname: 'Doe' } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle user not found by name', async () => {
      req.params.firstname = 'John';
      req.params.surname = 'Doe';
      User.findAll.mockResolvedValue([]);

      await userController.getByName(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { firstname: 'John', surname: 'Doe' } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find user with the name John Doe');
    });
  });

  describe('getByJobRole', () => {
    it('should return users by job role', async () => {
      const users = [{ id: 1, firstName: 'John', surname: 'Doe', jobRole: 'Developer' }];
      req.params.job_role = 'Developer';
      User.findAll.mockResolvedValue(users);

      await userController.getByJobRole(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { job_role: 'Developer' } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle user not found by job role', async () => {
      req.params.job_role = 'Developer';
      User.findAll.mockResolvedValue([]);

      await userController.getByJobRole(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { job_role: 'Developer' } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find any users with the job role Developer');
    });
  });

  describe('getBySystemRole', () => {
    it('should return users by system role', async () => {
      const systemRoles = [{ id: 1, systemRole: 'Admin' }];
      const users = [{ id: 1, firstName: 'John', surname: 'Doe', systemRoleId: 1 }];
      req.params.system_role = 'Admin';
      SystemRole.findAll.mockResolvedValue(systemRoles);
      User.findAll.mockResolvedValue(users);

      await userController.getBySystemRole(req, res);

      expect(SystemRole.findAll).toHaveBeenCalledWith({ where: { system_role: 'Admin' } });
      expect(User.findAll).toHaveBeenCalledWith({ where: { system_role_id: systemRoles[0].id } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle system role not found', async () => {
      req.params.system_role = 'Admin';
      SystemRole.findAll.mockResolvedValue([]);

      await userController.getBySystemRole(req, res);

      expect(SystemRole.findAll).toHaveBeenCalledWith({ where: { system_role: 'Admin' } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find the system role Admin');
    });

    it('should handle user not found by system role', async () => {
      const systemRoles = [{ id: 1, systemRole: 'Admin' }];
      req.params.system_role = 'Admin';
      SystemRole.findAll.mockResolvedValue(systemRoles);
      User.findAll.mockResolvedValue([]);

      await userController.getBySystemRole(req, res);

      expect(SystemRole.findAll).toHaveBeenCalledWith({ where: { system_role: 'Admin' } });
      expect(User.findAll).toHaveBeenCalledWith({ where: { system_role_id: systemRoles[0].id } });
      expect(utilities.formatErrorResponse).toHaveBeenCalledWith(res, 400, 'Unable to find any users with the system role Admin');
    });
  });
});
