const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.post('/', organizationController.createOrganization);
router.get('/', authMiddleware, organizationController.getAllOrganizations);
router.get('/:id', authMiddleware, organizationController.getOrganizationById);
router.put('/:id', authMiddleware, organizationController.updateOrganization);
router.delete('/:id', authMiddleware, organizationController.deleteOrganization);

module.exports = router;
