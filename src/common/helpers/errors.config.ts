import commonErrorCodes, { AuthErrorCodes } from 'src/auth/helpers/auth-error-codes.config';
import userErrorCodes, { UserErrorCodes } from 'src/users/helpers/user-error-codes.config';
import authErrorCodes, { CommonErrorCodes } from './common-error-codes.config';
import accountErrorCodes, { AccountErrorCodes } from 'src/core/utils/account-error-codes.config';

export type ErrorCode = UserErrorCodes | AuthErrorCodes | CommonErrorCodes | AccountErrorCodes;
export type DynamicMessage = (...args: any) => string;

export default () => ({
  ...userErrorCodes(),
  ...authErrorCodes(),
  ...commonErrorCodes(),
  ...accountErrorCodes(),
});
