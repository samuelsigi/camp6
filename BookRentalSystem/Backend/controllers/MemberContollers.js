const Member = require('../models/Member');

exports.createMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find().populate('rentedBooks');
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id).populate('rentedBooks');
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
