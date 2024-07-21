const router = require('../routes/skillAssignment');
const utilities = require('../utilities/utility');

const db = require('../models');

const SkillAssignment = db.skillAssignment;
const Skill = db.skill;
const Staff = db.user;
const SkillLevel = db.skillLevel;

getAll  = async (req, res) =>{
    const skillAssignment = await SkillAssignment.findAll();
        res.status(200).json(skillAssignment);
}

getById = async (req, res) =>{
    const id = req.params.id;

    try {
        const skillAssignment = await SkillAssignment.findByPk(id);

        if(skillAssignment==null || skillAssignment.length==0){
            throw new Error("Unable to find the skill assignment with id " + id);
        }
        res.status(200).json(skillAssignment);
        }
        catch(error){
            return utilities.formatErrorResponse(res,400,error.message);
        }
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
        return utilities.formatErrorResponse(res,400,error.message);
    }


    try{
        const skillAssignment = await SkillAssignment.findAll({where: {skill_id: skillId}});
        if(skillAssignment.length==0){
            throw new Error("Unable to find any staff members with the skill: " + skill);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
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
        return utilities.formatErrorResponse(res,400,error.message);
    }


    try{
        const skillAssignment = await SkillAssignment.findAll({where: {staff_id: staffId}});
        if(skillAssignment.length==0){
            throw new Error("Unable to find any skill allocated to: " + firstname + " " + surname);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
    }
}

create = async (req, res) =>{

    var skillAssignment = {
        staff_id: req.body.staff_id,
        skill_id: req.body.skill_id,
        skill_level_id: req.body.skill_level_id,
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
        return utilities.formatErrorResponse(res,400,error.message);
     }

}

deleting = async (req, res) =>{
const id = req.body.id;

try{
    const doesAssignmentExist = await SkillAssignment.findAll({where: {id: id}});
    if(doesAssignmentExist.length==0 || doesAssignmentExist==null){
        throw new Error("Unable to find the  skill assignment with id" + id);
    }
}
catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
    }

try{
    const deleted = await SkillAssignment.destroy({where: { id: id }});

    if (deleted==0) {
      throw new Error("Id not found");
    }

    res.status(200).send("skill assignment deleted");
  }
 catch(error){
    return utilities.formatErrorResponse(res,404,error.message);
 }

}

update  = async (req, res) =>{
    const id =req.body.id;

    const assignment = {
        expiry: req.body.expiry_date,
        skill_level: req.body.skill_level_id
    };

    try{
        const doesAssignmentExist = await SkillAssignment.findAll({where: {id: id}});
        if(doesAssignmentExist.length==0 || doesAssignmentExist==null){
            throw new Error("Unable to find the  skill assignment with id" + id);
        }
    }
    catch(error){
        return utilities.formatErrorResponse(res,400,error.message);
        }

    try{
        if (assignment.expiry == null ||
            assignment.skill_level == null
        ){
           throw new Error("Missing essential fields");
         }
     
         await SkillAssignment.update(skillAssignment, 
                           {where: { id: id }}
         );
         res.status(200).json(skillAssignment);
       }
      catch (error){
        return utilities.formatErrorResponse(res,400,error.message);
       }  
}

getAllStaffDetails = async (req, res) => {
    try {
        const staffDetails = await Staff.findAll({
            include: [
                {
                    model: SkillAssignment,
                    include: [
                        {
                            model: Skill,
                            include: [SkillCategory]
                        },
                        {
                            model: SkillLevel
                        }
                    ]
                }
            ]
        });

        res.status(200).json(staffDetails);
    } catch (error) {
        return utilities.formatErrorResponse(res, 500, error.message);
    }
}

module.exports = {
    getAll,
    getById,
    getBySkills,
    getByStaff,
    create,
    deleting,
    update,
    getAllStaffDetails
};