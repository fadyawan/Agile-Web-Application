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

getById = async (req, res) =>{
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);

        if(user==null || user.length==0){
            throw new Error("Unable to find the user with id " + id);
        }
        res.status(200).json(user);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
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


getByName  = async (req, res) =>{
    const firstname = req.params.firstname;
    const surname = req.params.surname;

    try {
        const user = await User.findAll({where: {firstname: firstname, surname: surname}});

        if(user==null || user.length==0){
            throw new Error("Unable to find user with the name " + firstname + " " + surname);
        }
        res.status(200).json(user);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
}


getByJobRole  = async (req, res) =>{
    const jobRole = req.params.job_role;

    try {
        const user = await User.findAll({where: {job_role: jobRole}});

        if(user==null || user.length==0){
            throw new Error("Unable to find any users with the job role " + jobRole);
        }
        res.status(200).json(user);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
}


getBySystemRole  = async (req, res) =>{
    const systemRole = req.params.system_role;


    try {
        const sys = await SystemRole.findAll({where: {system_role: systemRole}});

        if(sys==null || sys.length==0){
            throw new Error("Unable to find the system role " + systemRole);
        }
        const sysRoleId = sys.id;
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }

    try {
        const user = await User.findAll({where: {system_role_id: sysRoleId}});

        if(user==null || user.length==0){
            throw new Error("Unable to find any users with the system role " + systemRole);
        }
        res.status(200).json(user);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
}


module.exports = {
    getAll,
    getById,
    create,
    deleting,
    update,
    getByName,
    getByJobRole,
    getBySystemRole
};