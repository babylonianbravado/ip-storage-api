import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Schema } from './schema';

export default (config: Record<string, string | number>) => {
  const validatedConfig = plainToInstance(Schema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
