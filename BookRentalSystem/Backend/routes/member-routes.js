const express = require('express');
const router = express.Router();
const memberController = require('../controllers/MemberContollers');

router.post('/addmember', memberController.createMember);
router.get('/', memberController.getMembers);
router.patch('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);



module.exports = router;
