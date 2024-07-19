const router = require('../routes/user');
const utilities = require('../utilities/utility');

const dbUser = require('../models/user');
const dbSystemrole = require('../models/systemRole')

const User = dbUser.user;
const SystemRole = dbSystemrole.systemRole

getAll  = async (req, res) =>{
    const user = await User.findAll();
        res.status(200).json(user);
}

create  = async (req, res) =>{
    var user = {
        firstName: req.body.firstname,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        jobRole: req.body.job_role,
        systemRoleId: req.body.system_role_id
        };

        try{
            const systemRole = await SystemRole.findAll({where: {systemRoleId: id}});
            if(systemRole.length==0){
                throw new Error("Unable to find the system role with id" + id);
            }
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }

        try{
            if (user.firstName==null ||
            user.firstName.length <1 ||
            user.surname==null ||
            user.surname.length <1 ||
            user.username==null ||
            user.username.length <1 ||
            user.password==null ||
            user.password.length <1 ||
            user.jobRole==null ||
            user.jobRole.length <1){
            throw new Error("Essential fields missing");
            }
            user = await User.create(user);
            res.status(201).json(user);
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
        const deleted = await User.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("user deleted");
    }
    catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
    
}

update  = async (req, res) =>{
    const id =req.body.id;

    const user = {
        firstName: req.body.firstname,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        jobRole: req.body.job_role,
        systemRoleId: req.body.system_role_id
    };

    try{
        const systemRole = await SystemRole.findAll({where: {systemRoleId: id}});
        if(systemRole.length==0){
            throw new Error("Unable to find the system role with id" + id);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }

    try{
        if (user.firstName==null ||
        user.firstName.length <1 ||
        user.surname==null ||
        user.surname.length <1 ||
        user.username==null ||
        user.username.length <1 ||
        user.password==null ||
        user.password.length <1 ||
        user.jobRole==null ||
        user.jobRole.length <1){
        throw new Error("Essential fields missing");
        }
        user = await User.create(user);
        res.status(201).json(user);
        }
        catch (error){
        utilities.formatErrorResponse(res,
        400,
        error.message);
        } 
}

module.exports = {
    getAll,
    create,
    deleting,
    update
};