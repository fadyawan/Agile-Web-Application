// systemRole.test.js

const SequelizeMock = require('sequelize-mock');
const SystemRoleModelFactory = require('./systemRole.js'); // Update the path as necessary

describe('SystemRole Model', () => {
    let dbMock;
    let SystemRole;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        SystemRole = SystemRoleModelFactory(dbMock, dbMock.Sequelize);
    });

    it('should be defined', () => {
        expect(SystemRole).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(SystemRole.getTableName()).toBe('system_role');
    });

    it('should have a system_role field', () => {
        const attributes = SystemRole.rawAttributes;
        expect(attributes).toHaveProperty('system_role');
        expect(attributes.system_role.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should not have timestamps', () => {
        expect(SystemRole.options.timestamps).toBe(false);
    });

    it('should freeze table name', () => {
        expect(SystemRole.options.freezeTableName).toBe(true);
    });
});
