import Application from '../app';
import config from '../config/environment';
import {setApplication} from '@ember/test-helpers';
import loadEmberExam from 'ember-exam/test-support/load';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

loadEmberExam();

setApplication(Application.create(config.APP));
