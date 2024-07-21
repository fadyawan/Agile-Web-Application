// user.test.js

const SequelizeMock = require('sequelize-mock');
const UserModelFactory = require('./user.js'); // Update the path as necessary

describe('User Model', () => {
    let dbMock;
    let SystemRoleMock;
    let User;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        SystemRoleMock = dbMock.define('SystemRole', {
            system_role: 'Admin'
        });

        User = UserModelFactory(dbMock, dbMock.Sequelize, SystemRoleMock);
    });

    it('should be defined', () => {
        expect(User).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(User.getTableName()).toBe('user');
    });

    it('should have a firstname field', () => {
        const attributes = User.rawAttributes;
        expect(attributes).toHaveProperty('firstname');
        expect(attributes.firstname.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should have a surname field', () => {
        const attributes = User.rawAttributes;
        expect(attributes).toHaveProperty('surname');
        expect(attributes.surname.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should have a username field', () => {
        const attributes = User.rawAttributes;
        expect(attributes).toHaveProperty('username');
        expect(attributes.username.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should have a password field', () => {
        const attributes = User.rawAttributes;
        expect(attributes).toHaveProperty('password');
        expect(attributes.password.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should have a job_role field', () => {
        const attributes = User.rawAttributes;
        expect(attributes).toHaveProperty('job_role');
        expect(attributes.job_role.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should not have timestamps', () => {
        expect(User.options.timestamps).toBe(false);
    });

    it('should freeze table name', () => {
        expect(User.options.freezeTableName).toBe(true);
    });

    it('should belong to SystemRole', () => {
        expect(User.associations).toHaveProperty('SystemRole');
        expect(User.associations.SystemRole.associationType).toBe('BelongsTo');
        expect(User.associations.SystemRole.foreignKey).toBe('system_role_id');
    });
});
