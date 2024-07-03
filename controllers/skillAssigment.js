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

}

deleting = async (req, res) =>{

}

update  = async (req, res) =>{

}
