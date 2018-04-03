import Application from '../app';
import config from '../config/environment';
import {setApplication} from '@ember/test-helpers';
import loadEmberExam from 'ember-exam/test-support/load';

loadEmberExam();

setApplication(Application.create(config.APP));
