import resolver from './helpers/resolver';
import {setResolver} from 'ember-mocha';
import loadEmberExam from 'ember-exam/test-support/load';

loadEmberExam();

setResolver(resolver);
