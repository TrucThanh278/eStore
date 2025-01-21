import { DEFAULT_TIMESTAMP_6 } from '../common/constant/database.constant';

const typeTimestamp = {
  type: 'timestamp' as const,
  default: () => DEFAULT_TIMESTAMP_6,
  nullable: false,
};
const typeString = {
  type: 'varchar' as const,
  length: 100,
  nullable: false,
  default: '',
};
const typeNumber = { type: 'integer' as const, nullable: false, default: 0 };
const typeBoolean = {
  type: 'boolean' as const,
  default: false,
  nullable: false,
};
const typeText = { type: 'text' as const, nullable: true };
export { typeTimestamp, typeString, typeNumber, typeBoolean, typeText };
