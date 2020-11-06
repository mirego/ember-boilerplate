// Types for compiled templates
declare module 'ember-boilerplate/templates/*' {
  import {TemplateFactory} from 'htmlbars-inline-precompile';
  const template: TemplateFactory;
  export default template;
}
