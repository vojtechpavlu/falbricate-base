import {
  GeneratedValue,
  registerStandard,
  registerValueGenerator,
  StandardValueGeneratorBuilder,
  ValueGeneratorBuilder,
  ValueGeneratorConfig,
} from '../generators';
import { Charset, registerCharset } from '../utils';
import {
  ProfileFabricatorBuilder,
  registerProfileFabricator,
} from '../profiles/ProfileFabricatorRegistry';
import { FalsumPipe, registerFalsumPipe } from '../pipes';
import { registerValuePipe, ValuePipe } from '../pipes/value';

/**
 * Common interface declaring that every registrable
 * needs to be accessible by key
 */
interface Registrable {
  key: string;
}

/** Declaration for Value Generator plugins */
export interface ValueGeneratorPlugin extends Registrable {
  builder: ValueGeneratorBuilder<GeneratedValue, ValueGeneratorConfig>;
}

/** Declaration for Standard Value Generator plugins */
export interface StandardPlugin extends Registrable {
  builder: StandardValueGeneratorBuilder;
}

/** Declaration for Charset plugins */
export interface CharsetPlugin extends Registrable {
  charset: Charset;
}

/** Declaration for Profile plugins */
export interface ProfilePlugin extends Registrable {
  builder: ProfileFabricatorBuilder;
}

/** Declaration for Falsum pipes plugins */
export interface FalsumPipePlugin extends Registrable {
  builder: FalsumPipe;
}

/** Declaration for Value Pipes plugins */
export interface ValuePipePlugin extends Registrable {
  builder: ValuePipe;
}

/**
 * Common declaration for all the plugins to be imported.
 */
export interface Plugin {
  valueGenerators?: ValueGeneratorPlugin[];
  standards?: StandardPlugin[];
  charsets?: CharsetPlugin[];
  profiles?: ProfilePlugin[];
  falsumPipes?: FalsumPipePlugin[];
  valuePipes?: ValuePipePlugin[];
}

/**
 * Registers all the contents of the given plugin
 *
 * @param plugin to be registered
 */
export const registerPlugin = (plugin: Plugin) => {
  plugin.valueGenerators?.forEach((plugin) => {
    registerValueGenerator(plugin.key, plugin.builder);
  });

  plugin.standards?.forEach((plugin) => {
    registerStandard(plugin.key, plugin.builder);
  });

  plugin.charsets?.forEach((plugin) => {
    registerCharset(plugin.key, plugin.charset);
  });

  plugin.profiles?.forEach((plugin) => {
    registerProfileFabricator(plugin.key, plugin.builder);
  });

  plugin.falsumPipes?.forEach((plugin) => {
    registerFalsumPipe(plugin.key, plugin.builder);
  });

  plugin.valuePipes?.forEach((plugin) => {
    registerValuePipe(plugin.key, plugin.builder);
  });
};
