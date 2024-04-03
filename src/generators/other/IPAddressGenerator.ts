import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig
} from '../ValueGenerator';
import { StringTemplateGenerator } from '../string';
import { IntegerGenerator } from '../numeric';

/** Definition of an octet */
interface OctetDefinition {
  min: number,
  max: number,
}

/** Helper for easier referencing */
interface IPAddressConfigHelper {
  [octet: string]: OctetDefinition
}

/**
 * Configuration specifying ranges per each octet.
 */
export type IPAddressConfig = {
  octet1: OctetDefinition;
  octet2: OctetDefinition;
  octet3: OctetDefinition;
  octet4: OctetDefinition;
} & ValueGeneratorConfig & IPAddressConfigHelper;

/**
 * This generator simply returns a string representing an IPv4 address.
 */
export class IPAddressValueGenerator extends ValueGenerator<
  GeneratedValue,
  IPAddressConfig
> {

  private readonly generator;

  constructor(config: IPAddressConfig) {

    const octetNames = ["octet1", "octet2", "octet3", "octet4"];

    octetNames.forEach((octetName) => {
      if (config[octetName]!.min < 0) {
        throw new Error(`Every octet has to have minimum positive`)
      } else if (config[octetName]!.max > 255) {
        throw new Error(`Every octet has to have maximum <= 255`)
      } else if (config[octetName]!.min > config[octetName]!.max) {
        throw new Error(`Every octet's minimum value has to be less or equal to max`)
      }
    });

    const { octet1, octet2, octet3, octet4 } = config;

    if (!octet1 || !octet2 || !octet3 || !octet4) {
      throw new Error(`All four octets are required`);
    }

    super(config);

    this.generator = new StringTemplateGenerator({
      template: '{o1}.{o2}.{o3}.{o4}',
      variables: {
        o1: new IntegerGenerator({ min: this.config.octet1.min, max: this.config.octet1.max }),
        o2: new IntegerGenerator({ min: this.config.octet2.min, max: this.config.octet2.max }),
        o3: new IntegerGenerator({ min: this.config.octet3.min, max: this.config.octet3.max }),
        o4: new IntegerGenerator({ min: this.config.octet4.min, max: this.config.octet4.max })
      }
    });
  }

  get = (): string => {
    return this.generator.generate();
  };
}
