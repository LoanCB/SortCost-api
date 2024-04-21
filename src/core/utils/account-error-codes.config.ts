import { DynamicMessage } from 'src/common/helpers/errors.config';

export type AccountErrorCodes = 'USERS_NOT_FOUND';

export default (): { [key in AccountErrorCodes]: string | DynamicMessage } => ({
  USERS_NOT_FOUND: (ids: number[]) => `Users not found with id in [${ids.join(', ')}]`,
});
