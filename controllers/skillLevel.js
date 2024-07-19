const router = require('../routes/skillLevel');
const utilities = require('../utilities/utility');

const db = require('../models/skillLevel');

const SkillLevel = db.skillLevel;

getAll  = async (req, res) =>{
    const skillLevel = await SkillLevel.findAll();
        res.status(200).json(skillLevel);
}

create  = async (req, res) =>{
    var skillLevel = {
        skillLevel: req.body.skill_level,
        };


        try{
            if (skillLevel.skillLevel==null ||
            skillLevel.skillLevel.length <1){
            throw new Error("Essential fields missing");
            }
            skillLevel = await SkillLevel.create(skillLevel);
            res.status(201).json(skillLevel);
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
        const deleted = await SkillLevel.destroy({where: { id: id }});
        
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

    const skillLevel = {
        skillLevel: req.body.skill_level
    };

    try{
        if (skillLevel.skillLevel == null ||
            skillLevel.skillLevel.length <1){
            throw new Error("Missing essential fields");
        }

        await SkillLevel.update(skillLevel, 
                           {where: { id: id }}
        );
        res.status(200).json(skillLevel);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }  
}

module.exports = {
    getAll,
    create,
    deleting,
    update
};