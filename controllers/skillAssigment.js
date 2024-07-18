const router = require('../routes/skillAssigment');
const utilities = require('../utilities/utility');
const db = require('../models');
const SkillAssigment = db.skillAssigment;

getAll  = async (req, res) =>{
    const skillAssigment = await SkillAssigment.findAll();
        res.status(200).json(skillAssigment);
}

getBySkills = async (req, res) =>{
    const skill = req.params.skill;

    try{
        const skillAssigment = await Tool.findAll(
            {where: {skill: skill}});
        if(skillAssigment.length==0){
            throw new Error("Unable to find any staff members with the skill: " + skill);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

getByStaff = async (req, res) =>{
    const staff = req.params.staff;

    try{
        const skillAssigment = await Tool.findAll(
            {where: {staff: staff}});
        if(skillAssigment.length==0){
            throw new Error("Unable to find any skills assigned to: " + staff);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

create = async (req, res) =>{
    const { staff, skill } = req.body;

    if (!staff || !skill) {
        return utilities.formatErrorResponse(res, 400, "Both 'staff' and 'skill' fields are required.");
    }

    try {
        const newSkillAssigment = await SkillAssigment.create({ staff, skill });
        res.status(201).json(newSkillAssigment);
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}

deleting = async (req, res) =>{
    const { id } = req.params;

    try {
        const skillAssigment = await SkillAssigment.findByPk(id);
        if (!skillAssigment) {
            return utilities.formatErrorResponse(res, 404, "Skill assignment not found.");
        }

        await skillAssigment.destroy();
        res.status(200).json({ message: "Skill assignment deleted successfully." });
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}

update  = async (req, res) =>{
    const { id } = req.params;
    const { staff, skill } = req.body;

    try {
        const skillAssigment = await SkillAssigment.findByPk(id);
        if (!skillAssigment) {
            return utilities.formatErrorResponse(res, 404, "Skill assignment not found.");
        }

        if (staff) skillAssigment.staff = staff;
        if (skill) skillAssigment.skill = skill;

        await skillAssigment.save();
        res.status(200).json(skillAssigment);
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}
