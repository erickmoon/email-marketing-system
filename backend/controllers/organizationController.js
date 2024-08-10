const Organization = require('../models/Organization');

// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json(organization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a specific organization by ID
exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an organization by ID
exports.updateOrganization = async (req, res) => {
  try {
    const [updated] = await Organization.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    const updatedOrganization = await Organization.findByPk(req.params.id);
    res.status(200).json(updatedOrganization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an organization by ID
exports.deleteOrganization = async (req, res) => {
  try {
    const deleted = await Organization.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(204).json({ message: 'Organization deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
