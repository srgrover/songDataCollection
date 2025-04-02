import {TranslocoGlobalConfig} from '@jsverse/transloco-utils';
    
export enum Languages {
  EN = 'en',
  ES = 'es',
}

export const AvailablesLanguajes = [
  Languages.EN,
  Languages.ES,
]

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: AvailablesLanguajes,
  defaultLang: Languages.ES,
  keysManager: {},
};
    
export default config;