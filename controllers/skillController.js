const db = require('../models');
const Skill = db.skill;
const utilities = require('../utilities/utility');

exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}

exports.getSkillById = async (req, res) => {
    const id = req.params.id;

    try {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            return utilities.formatErrorResponse(res, 404, "Skill not found.");
        }
        res.status(200).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}

exports.createSkill = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return utilities.formatErrorResponse(res, 400, "Skill name is required.");
    }

    try {
        const newSkill = await Skill.create({ name });
        res.status(201).json(newSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}

exports.updateSkill = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            return utilities.formatErrorResponse(res, 404, "Skill not found.");
        }

        skill.name = name;
        await skill.save();
        res.status(200).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}

exports.deleteSkill = async (req, res) => {
    const id = req.params.id;

    try {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            return utilities.formatErrorResponse(res, 404, "Skill not found.");
        }

        await skill.destroy();
        res.status(200).json({ message: "Skill deleted successfully." });
    } catch (error) {
        utilities.formatErrorResponse(res, 500, error.message);
    }
}