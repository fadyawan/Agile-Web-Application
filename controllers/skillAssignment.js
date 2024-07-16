const router = require('../routes/skillAssignment');
const utilities = require('../utilities/utility');

const db = require('../models');
const SkillAssignment = db.skillAssignment;
const Skill = db.skill;
const Staff = db.user;
const SkillLevel = db.skill_level;


//################################# could create methods out of the code that gets a skill name and returns an ID, same with staff to reduce repeated code.

getAll  = async (req, res) =>{
    const skillAssignment = await SkillAssignment.findAll();
        res.status(200).json(skillAssignment);
}

getBySkills = async (req, res) =>{
    const skillName = req.params.skill;

    try{
        const skill = await Skill.findAll({where: {description: skillName}});
        if(skill.length==0){
            throw new Error("Unable to find the skill: " + skill);
        }
        const skillId = skill.id;
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }


    try{
        const skillAssignment = await SkillAssignment.findAll({where: {skill_id: skillId}});
        if(skillAssignment.length==0){
            throw new Error("Unable to find any staff members with the skill: " + skill);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

getByStaff = async (req, res) =>{
    const firstname = req.params.firstname;
    const surname = req.params.surname;

    try{
        const staff = await Staff.findAll({where: {firstname: firstname, surname: surname}});
        if(staff.length==0){
            throw new Error("Unable to find the staff member: " + firstname + " " + surname);
        }
        const staffId = staff.id;
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }


    try{
        const skillAssignment = await SkillAssignment.findAll({where: {staff_id: staffId}});
        if(skillAssignment.length==0){
            throw new Error("Unable to find any skill allocated to: " + firstname + " " + surname);
        }
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

create = async (req, res) =>{
// inputs, skill, staff firstname, staff surname, skill level, expiry
// needs to check the staff table for firstname and surname together as one variable, if present return the id.
// needs to check the skill level table to ensure the level entered is one of the options and return the id.
//
//needs to check the skill table for the description and return the Id
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    try{
        const staff = await Staff.findAll({where: {firstname: firstname, surname: surname}});
        if(staff.length==0){
            throw new Error("Unable to find the staff member: " + firstname + " " + surname);
        }
        const staffId = staff.id;
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }



    const skillInput = req.body.skill;
    try{
        const skill = await Skill.findAll({where: {description: skillInput}});
        if(skill.length==0){
            throw new Error("Unable to find the skill: " + skillInput);
        }
        const skillId = skill.id;
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }


    const skillLevelInput = req.body.skill_level;
    try{
        const skillLevel = await SkillLevel.findAll({where: {skill_level: skillLevelInput}});
        if(skillLevel.length==0){
            throw new Error(skillLevelInput +  " Is not an applicable skill level.");
        }
        const skillLevelId = skillLevel.id;
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }

    const expiryInput = req.body.expiry_date;

    var skillAssignment = {
        staff_id: staffId,
        skill_id: skillId,
        skill_level_id: skillLevelId,
        expiry_date: req.body.expiry_date,
    };

    try{
        if (skillAssignment.staff_id==null ||
            skillAssignment.skill_id==null ||
            skillAssignment.skill_level_id==null ||
            skillAssignment.expiry_date==null
        ){
          throw new Error("Essential fields missing");
        }
    
        skillAssignment = await SkillAssignment.create(skillAssignment);
    
        res.status(201).json(skillAssignment);
      }
     catch (error){
          utilities.formatErrorResponse(res,400,error.message);
     }

}

deleting = async (req, res) =>{
//inputs id 
const id = req.body.id;

try{
    const deleted = await SkillAssignment.destroy({where: { id: id }});

    if (deleted==0) {
      throw new Error("Id not found");
    }

    res.status(200).send("skill assignment deleted");
  }
 catch(error){
   utilities.formatErrorResponse(res,404,error.message);
 }

}

staffIsDeleted  = async (req, res) =>{
//to be ran when a staff member is deleted, requires the staff id, deletes all skill assignments with that staff id.
const staffId = req.body.staff_id;

try{
    const deleted = await SkillAssignment.destroy({where: { staff_id: staffId }});

    if (deleted==0) {
      throw new Error("Staff Id not found");
    }

    res.status(200).send("skill assignments deleted for staff with Id" + staffId);
  }
 catch(error){
   utilities.formatErrorResponse(res,404,error.message);
 }
}

skillIsDeleted  = async (req, res) =>{
//to be ran when a skill is deleted, requires the skill id, deletes all skill assignments with that skill id.
const skillId = req.body.skill_id;

try{
    const deleted = await SkillAssignment.destroy({where: { skill_id: skillId }});

    if (deleted==0) {
      throw new Error("Skill Id not found");
    }

    res.status(200).send("skill assignments deleted for the skill with Id" + skillId);
  }
 catch(error){
   utilities.formatErrorResponse(res,404,error.message);
 }
}

update  = async (req, res) =>{
    const id =req.body.id;

    const assignment = {
        expiry: req.body.expiry_date,
        skill_level: req.body.skill_level_id
    };

    try{
        if (assignment.expiry == null ||
            assignment.skill_level == null
        ){
           throw new Error("Missing essential fields");
         }
     
         await SkillAssignment.update(tool, 
                           {where: { id: id }}
         );
         res.status(200).json(tool);
       }
      catch (error){
         utilities.formatErrorResponse(res,400,error.message);
       }  
}

