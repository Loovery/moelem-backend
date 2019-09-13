import getUserRoles from './userRoles';

require('dotenv').config();

export default { USER_ROLES: getUserRoles() };
