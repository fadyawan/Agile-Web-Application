const router = require('../routes/systemRole');
const utilities = require('../utilities/utility');

const db = require('../models');
const SystemRole = db.systemRole;

getAll  = async (req, res) =>{
    const systemRole = await SystemRole.findAll();
        res.status(200).json(systemRole);
}

getById = async (req, res) =>{
    const id = req.params.id;

    try {
        const systemRole = await SystemRole.findByPk(id);

        if(systemRole==null || systemRole.length==0){
            throw new Error("Unable to find the system role with id " + id);
        }
        res.status(200).json(systemRole);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
}

create  = async (req, res) =>{
    var systemRole = {
        system_role: req.body.system_role,
        };


        try{
            if (systemRole.system_role==null ||
            systemRole.system_role.length <1){
            throw new Error("Essential fields missing");
            }
            systemRole = await SystemRole.create(systemRole);
            res.status(201).json(systemRole);
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
        const deleted = await SystemRole.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("system role deleted");
    }
    catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
    
}

update  = async (req, res) =>{
    const id =req.body.id;

    const systemRole = {
        system_role: req.body.system_role
    };

    try{
        if (systemRole.system_role == null ||
            systemRole.system_role.length <1){
            throw new Error("Missing essential fields");
        }

        await SystemRole.update(systemRole, 
                           {where: { id: id }}
        );
        res.status(200).json(systemRole);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }  
}

module.exports = {
    getAll,
    getById,
    create,
    deleting,
    update
};