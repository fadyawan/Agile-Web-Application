const router = require('../routes/skillCategory');
const utilities = require('../utilities/utility');
const db = require('../models').default;
const SkillCategory = db.skillCategory;

getAll  = async (req, res) =>{
    const skillCategory = await SkillCategory.findAll();
        res.status(200).json(skillCategory);
}

getById = async (req, res) =>{
    const id = req.params.id;

    try {
        const skillCategory = await SkillCategory.findByPk(id);

        if(skillCategory==null || skillCategory.length==0){
            throw new Error("Unable to find the skill category with id " + id);
        }
        res.status(200).json(skillCategory);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
}

create  = async (req, res) =>{
    var skillCategory = {
        description: req.body.description,
        };


        try{
            if (skillCategory.description==null ||
            skillCategory.description.length <1){
            throw new Error("Essential fields missing");
            }
            skillCategory = await SkillCategory.create(skillCategory);
            res.status(201).json(skillCategory);
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
        const deleted = await SkillCategory.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("skill category deleted");
    }
    catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
    
}

update  = async (req, res) =>{
    const id =req.body.id;

    const skillCategory = {
        description: req.body.description
    };

    try{
        if (skillCategory.description == null ||
            skillCategory.description.length <1){
            throw new Error("Missing essential fields");
        }

        await SkillCategory.update(skillCategory, 
                           {where: { id: id }}
        );
        res.status(200).json(skillCategory);
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