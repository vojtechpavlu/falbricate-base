import {
  Charset,
  getCharset,
  randomCharacter,
  randomInteger,
} from '../../utils';
import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import {
  DeclarativeFieldDefinition,
  Fabricator,
  ObjectFalsum,
  SchemaInput,
} from '../../schema';
import { FabricationContext } from '../../schema/fabricationContext';

export interface StringTemplateVariables {
  [variable: string]:
    | DeclarativeFieldDefinition
    | ValueGenerator<GeneratedValue, ValueGeneratorConfig>;
}

export interface CustomCharsets {
  [tag: string]: Charset;
}

export type StringTemplateGeneratorConfig = {
  template: string;
  variables?: StringTemplateVariables;
  customCharsets?: CustomCharsets;
} & ValueGeneratorConfig;

export class StringTemplateGenerator extends ValueGenerator<
  GeneratedValue,
  StringTemplateGeneratorConfig
> {
  private fabricator: Fabricator;

  constructor(config: StringTemplateGeneratorConfig) {
    if (!config.template) {
      throw new Error(`Property 'template' is required`);
    }

    config.variables = config.variables ?? {};
    config.customCharsets = config.customCharsets ?? {};

    super(config);

    let protoCompiled: SchemaInput = {
      fields: config.variables ?? {},
    };

    this.fabricator = new Fabricator(protoCompiled);
  }

  protected get = (context?: FabricationContext): GeneratedValue => {
    const generatedVariables = this.fabricator.generate(
      context,
    ) as ObjectFalsum;
    let templateString = this.config.template;

    // Replace all the variables
    templateString = this.replaceVariables(templateString, generatedVariables);

    // Replace custom charsets
    templateString = this.replaceCustomCharsets(
      templateString,
      this.config.customCharsets!,
    );

    // Replace numerics
    templateString = this.replaceNumerics(templateString);

    // Replace characters
    templateString = this.replaceCharacters(templateString);

    return templateString;
  };

  private replaceVariables = (template: string, variables: ObjectFalsum) => {
    Object.keys(variables).forEach((variableName) => {
      template = template.replace(
        new RegExp(`{${variableName}}`, 'g'),
        variables[variableName],
      );
    });

    return template;
  };

  private replaceCustomCharsets = (
    template: string,
    customCharsets: CustomCharsets,
  ) => {
    Object.keys(customCharsets).forEach((tagName) => {
      template = template.replace(new RegExp(tagName, 'g'), () =>
        randomCharacter(customCharsets[tagName]),
      );
    });

    return template;
  };

  private replaceNumerics = (template: string) => {
    // Replace %d (numbers in range [0, 9])
    template = template.replace(new RegExp('%d', 'g'), () =>
      randomInteger(0, 9).toString(),
    );

    // Replace %D (numbers in range [1, 9])
    template = template.replace(new RegExp('%D', 'g'), () =>
      randomInteger(1, 9).toString(),
    );

    return template;
  };

  private replaceCharacters = (template: string) => {
    // Replace %c (ASCII characters like [a-z])
    const lowercase_chars = getCharset('lowercase');
    template = template.replace(new RegExp('%c', 'g'), () =>
      randomCharacter(lowercase_chars),
    );

    // Replace %C (ASCII characters like [A-Z])
    const uppercase_chars = getCharset('uppercase');
    template = template.replace(new RegExp('%C', 'g'), () =>
      randomCharacter(uppercase_chars),
    );

    return template;
  };
}
