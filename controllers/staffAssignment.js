const router = require('../routes/staffAssignment');
const utilities = require('../utilities/utility');

const db = require('../models');
const StaffAssignment = db.staffAssignment;
const User = db.user

getAll  = async (req, res) =>{
    const staffAssignment = await StaffAssignment.findAll({
        include: [
         {
          model: User,
          as: 'staffId'
        },
        {
            model: User,
            as: 'managerId'
          },
    ]
      });


        res.status(200).json(staffAssignment);
}





getById = async (req, res) =>{
    const id = req.params.id;

    try {
        const staffAssignment = await StaffAssignment.findByPk(id,
            {include: [{
                model: User,
                as: 'staffId'
              },
              {
                model: User,
                as: 'managerId'
              },]
            });

        if(staffAssignment==null || staffAssignment.length==0){
            throw new Error("Unable to find the staff assignment with id " + id);
        }
        res.status(200).json(staffAssignment);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
}

getByStaff = async (req, res) =>{
    const staffId = req.params.staff_id;
    try{
        const staff = await User.findByPk(staffId);
    
        if(staff==null || staff.length==0){
            throw new Error("Unable to find staff with id " + id);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
    }

    try {
        const staffAssignment = await StaffAssignment.findAll({where: {staff_id: staffId},
            include: [{
                model: User,
                as: 'staffId'
              },
              {
                model: User,
                as: 'managerId'
              },]
            });

        if(staffAssignment==null || staffAssignment.length==0){
            throw new Error("Unable to find assignments for staff with id " + staffId);
        }
        res.status(200).json(staffAssignment);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
}

getByManager = async (req, res) =>{
    const managerId = req.params.manager_id;
    try{
        const manager = await User.findByPk(managerId);
    
        if(manager==null || manager.length==0){
            throw new Error("Unable to find manager with id " + id);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
    }

    try {
        const staffAssignment = await StaffAssignment.findAll({where: {manager_id: managerId},
            include: [{
                model: User,
                as: 'staffId'
              },
              {
                model: User,
                as: 'managerId'
              },]
            });

        if(staffAssignment==null || staffAssignment.length==0){
            throw new Error("Unable to find assignments for manager with id " + managerId);
        }
        res.status(200).json(staffAssignment);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
}



create  = async (req, res) =>{
    var staffAssignment = {
        staff_id: req.body.staff_id,
        manager_id: req.body.manager_id
    };

        try{
            if (staffAssignment.staff_id==null ||
            staffAssignment.manager_id==null){
            throw new Error("Essential fields missing");
            }
            createAssignment = await StaffAssignment.create(staffAssignment);
            res.status(201).json(staffAssignment);
            }
            catch (error){
            return utilities.formatErrorResponse(res,
            400,
            error.message);
            }
}

deleting  = async (req, res) =>{

    const id = req.body.id;

    try{
        const doesAssignmentExist = await StaffAssignment.findAll({where: {id: id}});
        if(doesAssignmentExist.length==0 || doesAssignmentExist==null){
            throw new Error("Unable to find the staff assignment with id " + id);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
        }

    try{
        const deleted = await StaffAssignment.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("staff assignment deleted");
    }
    catch(error){
        return utilities.formatErrorResponse(res,404,error.message);
    }
    
}

module.exports = {
    getAll,
    getById,
    create,
    deleting,
    getByStaff,
    getByManager
};