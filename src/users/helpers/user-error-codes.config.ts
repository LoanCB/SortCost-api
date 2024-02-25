import { DynamicMessage } from '../../common/helpers/errors.config';

export type UserErrorCodes = 'USER_EMAIL_ALREADY_EXISTS' | 'USER_NOT_FOUND' | 'ARCHIVE_HIMSELF' | 'FORBIDDEN';

export default (): { [key in UserErrorCodes]: string | DynamicMessage } => ({
  USER_EMAIL_ALREADY_EXISTS: 'User already exists',
  USER_NOT_FOUND: (id) => `User with id #${id} not found`,
  ARCHIVE_HIMSELF: 'User cannot archive himself',
  FORBIDDEN: "You haven't rigths to access on this resource",
});
