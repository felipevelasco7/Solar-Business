const { User } = require('../models');

exports.list = async (req, res, next) => {
  try {
    // SUPPORT can list everyone; CLIENT only own (handled below)
    if (req.user.role === 'SUPPORT') {
      const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'createdAt', 'installationDate', 'lastMaintenance'] });
      return res.json(users);
    }
    // CLIENT: only own record
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'role', 'createdAt', 'installationDate', 'lastMaintenance'] });
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json([user]);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (req.user.role !== 'SUPPORT' && req.user.id !== id) return res.status(403).json({ message: 'Forbidden' });
    // include installationDate and lastMaintenance so clients can read maintenance info
    const user = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'role', 'createdAt', 'installationDate', 'lastMaintenance'] });
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    // Allow SUPPORT to create any, CLIENT can create only CLIENT self (but registration exists)
    if (req.user.role !== 'SUPPORT') return res.status(403).json({ message: 'Forbidden' });

    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role: role === 'SUPPORT' ? 'SUPPORT' : 'CLIENT' });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    // tomar id del params; si no existe o no es número, usar el id del usuario autenticado
    let id = Number(req.params.id);
    if (!id || Number.isNaN(id)) id = req.user.id;

    // autorización: SUPPORT puede cualquier cosa; CLIENT solo su propio registro
    if (req.user.role !== 'SUPPORT' && req.user.id !== id) return res.status(403).json({ message: 'Forbidden' });

    const { name, email, password, role, installationDate, lastMaintenance } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // hook antes de guardar hará el hash
    if (role && req.user.role === 'SUPPORT') user.role = role === 'SUPPORT' ? 'SUPPORT' : 'CLIENT';

    // installationDate can be set by the user for their own account, or by SUPPORT for any user
    if (typeof installationDate !== 'undefined') {
      // accept ISO date or null
      user.installationDate = installationDate ? new Date(installationDate) : null;
    }

    // lastMaintenance should normally be set by SUPPORT, but allow user to set their own too
    if (typeof lastMaintenance !== 'undefined') {
      if (req.user.role === 'SUPPORT' || req.user.id === id) {
        user.lastMaintenance = lastMaintenance ? new Date(lastMaintenance) : null;
      }
    }

    await user.save();

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (req.user.role !== 'SUPPORT') return res.status(403).json({ message: 'Forbidden' });
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};