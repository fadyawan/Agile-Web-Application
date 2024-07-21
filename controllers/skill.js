const router = require('../routes/skill');
const utilities = require('../utilities/utility');

const db = require('../models');
const Skill = db.Skill;
const SkillCategory = db.SkillCategory;


getAll = async (req, res) =>{
    const skills = await skill.findAll();
        res.status(200).json(skills);
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
            utilities.formatErrorResponse(res,400,error.message);
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
            utilities.formatErrorResponse(res,400,error.message);
        }
}

getSkillByCategory = async (req, res) =>{
    const category = req.params.category;

    try {
        const skillCategory = await Skill.findAll({where: {description: category}});

        if(skillCategory==null || skillCategory.length==0){
            throw new Error("Unable to find the skill category " + category);
        }
        const categoryId = skillCategory.id;
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }

    try {
        const skill = await Skill.findAll({where: {skill_category_id: categoryId}});

        if(skill==null || skill.length==0){
            throw new Error("Unable to find the skills within the category " + category);
        }
        res.status(200).json(skill);
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }
}

create = async (req, res) =>{
    var skill = {
        description: req.body.description,
        skillCategoryId: req.body.skill_category_id
        };


        try{
            const category = await SkillCategory.findAll({where: {id: skillCategoryId}});
            if(category.length==0){
                throw new Error("Unable to find the skill category with id" + category);
            }
        }
        catch(error){
            utilities.formatErrorResponse(res,400,error.message);
        }

        try{
            if (skill.description==null ||
                skill.description.length <1 ||
                skill.skillCategoryId==null ||
                skill.skillCategoryId.length <1
            ){
            throw new Error("Essential fields missing");
            }
            skill = await Skill.create(skill);
            res.status(201).json(skill);
            }
            catch (error){
            utilities.formatErrorResponse(res,
            400,
            error.message);
            }
}

update = async (req, res) =>{
    const id = req.params.id;

    const skill = {
        description: req.body.description,
        skillCategoryId: req.body.skill_category_id
        };


    try{
        const category = await SkillCategory.findAll({where: {id: skillCategoryId}});
        if(category.length==0){
            throw new Error("Unable to find the skill category with id" + category);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }



    try{
        if (skill.description==null ||
            skill.description.length <1 ||
            skill.skillCategoryId==null ||
            skill.skillCategoryId.length <1){
        throw new Error("Essential fields missing");
        }
        skill = await Skill.create(skill);
        res.status(201).json(skill);
        }
        catch (error){
        utilities.formatErrorResponse(res,
        400,
        error.message);
        } 
}

deleting = async (req, res) =>{
    const id = req.body.id;
    try{
        const deleted = await SkillCategory.destroy({where: { id: id }});
        
        if (deleted==0) {
            throw new Error("Id not found");
        }
        
        res.status(200).send("skill deleted");
    }
    catch(error){
        utilities.formatErrorResponse(res,404,error.message);
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