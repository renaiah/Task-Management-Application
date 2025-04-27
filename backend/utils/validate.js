import _ from 'lodash';

export const validateRegister = body => _.pick(body, ['name', 'email', 'password', 'role']);
