import Application from 'ember-boilerplate/app';
import config from 'ember-boilerplate/config/environment';
import {setApplication} from '@ember/test-helpers';
import {start} from 'ember-mocha';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiDom from 'chai-dom';

chai.use(sinonChai);
chai.use(chaiDom);

setApplication(Application.create(config.APP));

start();
