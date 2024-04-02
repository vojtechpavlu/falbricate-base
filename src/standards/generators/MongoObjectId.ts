import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../../generators';
import { getRandomizer } from '../../utils/random/randomizer';

export class MongoObjectId extends ValueGenerator<
  GeneratedValue,
  ValueGeneratorConfig
> {
  constructor(config?: ValueGeneratorConfig) {
    super(config ?? {});
  }

  get = (): string => {
    const r = getRandomizer();

    const timestamp = Math.floor(new Date().getTime() / 1000)
      .toString(16)
      .padStart(8, '0');
    const machineId = Math.floor(r() * 16777215)
      .toString(16)
      .padStart(6, '0');
    const processId = Math.floor(r() * 65535)
      .toString(16)
      .padStart(4, '0');
    const counter = Math.floor(r() * 16777215)
      .toString(16)
      .padStart(6, '0');

    return timestamp + machineId + processId + counter;
  };
}
