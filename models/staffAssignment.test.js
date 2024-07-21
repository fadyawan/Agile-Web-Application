// staffAssignment.test.js

const SequelizeMock = require('sequelize-mock');
const StaffAssignmentModelFactory = require('./staffAssignment.js'); // Update the path as necessary

describe('StaffAssignment Model', () => {
    let dbMock;
    let UserMock;
    let StaffAssignment;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        UserMock = dbMock.define('User', {
            name: 'John Doe'
        });

        StaffAssignment = StaffAssignmentModelFactory(dbMock, dbMock.Sequelize, UserMock);
    });

    it('should be defined', () => {
        expect(StaffAssignment).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(StaffAssignment.getTableName()).toBe('staff_assignment');
    });

    it('should not have timestamps', () => {
        expect(StaffAssignment.options.timestamps).toBe(false);
    });

    it('should freeze table name', () => {
        expect(StaffAssignment.options.freezeTableName).toBe(true);
    });

    it('should belong to User as staff', () => {
        expect(StaffAssignment.associations).toHaveProperty('User');
        const staffAssociation = StaffAssignment.associations.User.find(assoc => assoc.foreignKey === 'staff_id');
        expect(staffAssociation).toBeDefined();
        expect(staffAssociation.associationType).toBe('BelongsTo');
        expect(staffAssociation.foreignKey).toBe('staff_id');
    });

    it('should belong to User as manager', () => {
        expect(StaffAssignment.associations).toHaveProperty('User');
        const managerAssociation = StaffAssignment.associations.User.find(assoc => assoc.foreignKey === 'manager_id');
        expect(managerAssociation).toBeDefined();
        expect(managerAssociation.associationType).toBe('BelongsTo');
        expect(managerAssociation.foreignKey).toBe('manager_id');
    });
});
