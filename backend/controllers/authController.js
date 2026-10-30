import { dataStore, DEMO_ACCOUNTS } from '../models/dataStore.js';

export const login = (req, res) => {
  const { loginId, role } = req.body;
  const targetRole = role || 'user';

  // Check demo accounts first
  let user = DEMO_ACCOUNTS[targetRole];
  
  if (loginId) {
    const matched = dataStore.findUserByRollOrEmail(loginId);
    if (matched) user = matched;
  }

  if (!user) {
    user = DEMO_ACCOUNTS[targetRole] || DEMO_ACCOUNTS.user;
  }

  return res.status(200).json({
    success: true,
    message: `Authenticated successfully as ${user.name} (${user.role.toUpperCase()})`,
    user,
    token: `jwt_sim_${user.id}_${Date.now()}`
  });
};

export const register = (req, res) => {
  const { name, role, rollNo, year, phone, email, title } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  const newUser = dataStore.registerUser({
    name,
    role: role || 'user',
    rollNo,
    year,
    phone,
    email,
    title
  });

  return res.status(201).json({
    success: true,
    message: `Account created successfully for ${newUser.name}`,
    user: newUser,
    token: `jwt_sim_${newUser.id}_${Date.now()}`
  });
};

export const getProfile = (req, res) => {
  const role = req.query.role || 'user';
  const user = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.user;
  return res.status(200).json({ success: true, user });
};
