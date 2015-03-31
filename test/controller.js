var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(sinonChai);

var controller = require('../app/controller');

describe('#chat', function() {

  beforeEach(function() {
    this.req = {
      user: 'test'
    };
    this.res = {
      render: sinon.spy()
    };
  });

  it('renders view', function() {
    controller.chat(this.req, this.res);
    expect(this.res.render).to.have.been.called;
  });

  // it('renders view with user', function() {
  //   controller.chat(this.req, this.res);
  //   expect(this.res.render).to.have.been.calledWith('chat', this.re)
  // });

});
