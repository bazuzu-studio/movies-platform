import * as migration_20261008_220946 from './20261008_220946';
import * as migration_20261010_120000 from './20261010_120000';

export const migrations = [
  {
    up: migration_20261008_220946.up,
    down: migration_20261008_220946.down,
    name: '20261008_220946'
  },

  {
    up: migration_20261010_120000.up,
    down: migration_20261010_120000.down,
    name: '20261010_120000'
  },
];
