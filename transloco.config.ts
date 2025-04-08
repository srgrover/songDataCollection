import {TranslocoGlobalConfig} from '@jsverse/transloco-utils';
import { LangDefinition } from '@jsverse/transloco/lib/types';
    
export enum Languages {
  EN = 'en',
  ES = 'es',
}

export const AvailablesLanguajes: LangDefinition[] = [
  {
    id: Languages.EN,
    label: 'English',
  },
  {
    id: Languages.ES,
    label: 'Español',
  },
];

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: AvailablesLanguajes.map((lang) => lang.id),
  defaultLang: Languages.ES,
  keysManager: {},
};
    
export default config;