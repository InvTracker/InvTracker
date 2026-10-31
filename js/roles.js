const ADMIN_EMAILS = [
  'admin@example.com',
  'admin@campus.edu'
];

const KITCHEN_EMAILS = [
  'kitchen@example.com',
  'kitchen@campus.edu'
];

function getUserRole(email) {
  if (!email || typeof email !== 'string') {
    return 'student';
  }
  const normalized = email.trim().toLowerCase();
  if (ADMIN_EMAILS.some(e => e.toLowerCase() === normalized)) {
    return 'admin';
  }
  if (KITCHEN_EMAILS.some(e => e.toLowerCase() === normalized)) {
    return 'kitchen';
  }
  return 'student';
}

if (typeof window !== 'undefined') {
  window.ADMIN_EMAILS = ADMIN_EMAILS;
  window.KITCHEN_EMAILS = KITCHEN_EMAILS;
  window.getUserRole = getUserRole;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ADMIN_EMAILS, KITCHEN_EMAILS, getUserRole };
}

