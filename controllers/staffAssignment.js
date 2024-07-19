const router = require('../routes/staffAssignment');
const utilities = require('../utilities/utility');

const dbStaffAssignment = require('../models/staffAssignment');
const dbUser = require('../models/user');
const { getByStaff } = require('./skillAssignment');

const StaffAssignment = dbStaffAssignment.staffAssignment;
const User = dbUser.user

getAll  = async (req, res) =>{
    const staffAssignment = await StaffAssignment.findAll();
        res.status(200).json(staffAssignment);
}

getByStaff = async (req, res) =>{
    const staffId = req.params.staff_id;
    try{
        const staff = await User.findByPk(id);
    
        if(staff==null || staff.length==0){
            throw new Error("Unable to find staff with id " + id);
        }
        res.status(200).json(staff);
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

getByManager = async (req, res) =>{
    const managerId = req.params.manager_id;
    try{
        const manager = await User.findByPk(id);
    
        if(manager==null || manager.length==0){
            throw new Error("Unable to find manager with id " + id);
        }
        res.status(200).json(manager);
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



create  = async (req, res) =>{
    var staffAssignment = {
        staffId: req.body.staff_id,
        managerId: req.body.manager_id
    };


    try{
        const user = await User.findAll({where: {id: staffId}});
        if(user.length==0){
            throw new Error("Unable to find the staff member with id" + id);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }

    try{
        const user = await User.findAll({where: {id: managerId}});
        if(user.length==0){
            throw new Error("Unable to find the manager with id" + id);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }


        try{
            if (staffAssignment.staffId==null ||
            staffAssignment.managerId==null){
            throw new Error("Essential fields missing");
            }
            staffAssignment = await StaffAssignment.create(staffAssignment);
            res.status(201).json(staffAssignment);
            }
            catch (error){
            utilities.formatErrorResponse(res,
            400,
            error.message);
            }
}

deleting  = async (req, res) =>{

    const id = req.body.id;
    try{
        const deleted = await StaffAssignment.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("staff assignment deleted");
    }
    catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
    
}

module.exports = {
    getAll,
    create,
    deleting,
};