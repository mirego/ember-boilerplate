import Application from '../app';
import config from '../config/environment';
import {setApplication} from '@ember/test-helpers';
import start from 'ember-exam/test-support/start';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiDom from 'chai-dom';

chai.use(sinonChai);
chai.use(chaiDom);

setApplication(Application.create(config.APP));

start();
