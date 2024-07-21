const router = require('../routes/skill');
const utilities = require('../utilities/utility');

const db = require('../models');
const Skill = db.skill;
const SkillCategory = db.skillCategory;
const SkillAssignment = db.skillAssignment;


getAll = async (req, res) =>{
    const skill = await Skill.findAll();
        res.status(200).json(skill);
}

getSkillById = async (req, res) =>{
    const id = req.params.id;

    try {
        const skill = await Skill.findByPk(id);

        if(skill==null || skill.length==0){
            throw new Error("Unable to find the skill with id " + id);
        }
        res.status(200).json(skill);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
}

getSkillByDescription = async (req, res) =>{
    const description = req.params.description;

    try {
        const skill = await Skill.findAll({where: {description: description}});

        if(skill==null || skill.length==0){
            throw new Error("Unable to find the skill with the description " + description);
        }
        res.status(200).json(skill);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
}

getSkillByCategory = async (req, res) =>{
    const categoryId = req.params.category_id;


    try {
        const skill = await Skill.findAll({where: {skill_category_id: categoryId}});

        if(skill==null || skill.length==0){
            throw new Error("Unable to find the skills within the category " + category);
        }
        res.status(200).json(skill);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
}

create = async (req, res) =>{
    var skill = {
        description: req.body.description,
        skill_category_id: req.body.skill_category_id
        };


        try{
            const category = await SkillCategory.findAll({where: {id: skill.skill_category_id}});
            if(category.length==0){
                throw new Error("Unable to find the skill category with id " + skill_category_id);
            }
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }

        try{
            if (skill.description==null ||
                skill.description.length <1 ||
                skill.skill_category_id==null ||
                skill.skill_category_id.length <1
            ){
            throw new Error("Essential fields missing");
            }
            skill = await Skill.create(skill);
            res.status(201).json(skill);
            }
            catch (error){
            return utilities.formatErrorResponse(res,
            400,
            error.message);
            }
}

update = async (req, res) =>{
    const id = req.body.id;

    var skill = {
        description: req.body.description,
        skill_category_id: req.body.skill_category_id
        };

        try{
            const doesSkillExist = await Skill.findAll({where: {id: id}});
            if(doesSkillExist.length==0 || doesSkillExist==null){
                throw new Error("Unable to find the  skill with id" + id);
            }
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
            }

    try{
        const category = await SkillCategory.findAll({where: {id: skill.skill_category_id}});
        if(category.length==0){
            throw new Error("Unable to find the skill category with id" + category);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
    }



    try{
        if (skill.description==null ||
            skill.description.length <1 ||
            skill.skill_category_id==null ||
            skill.skill_category_id.length <1){
        throw new Error("Essential fields missing");
        }
        skillUpdate = await Skill.update(skill, {where: { id: id }});
        res.status(201).json(skill);
        }
        catch (error){
            return utilities.formatErrorResponse(res,
        400,
        error.message);
        } 
}

deleting = async (req, res) =>{
    const id = req.body.id;

    try{
        const doesSkillExist = await Skill.findAll({where: {id: id}});
        if(doesSkillExist.length==0 || doesSkillExist==null){
            throw new Error("Unable to find the  skill with id" + id);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
        }

        try{
            const doesSkillHaveAssignments = await SkillAssignment.findAll({where: {skill_id: id}});
            if(doesSkillHaveAssignments.length!==0){
                throw new Error("this skill has assignments, delete these first.");
            }
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
            }

    try{
        const deleted = await Skill.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("skill deleted");
    }
    catch(error){
        return utilities.formatErrorResponse(res,404,error.message);
    }
}

module.exports = {
    getAll,
    getSkillById,
    getSkillByDescription,
    getSkillByCategory,
    create,
    deleting,
    update,
};