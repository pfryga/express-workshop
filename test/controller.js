var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var rewire = require('rewire');
var expect = chai.expect;

chai.use(sinonChai);

var controller = rewire('../app/controller');

describe('#chat', function() {

  beforeEach(function() {
    this.req = {
      user: 'test'
    };
    this.res = {
      render: sinon.spy()
    };

    controller.__set__('getSongs', this.getSongs);
  });

  it('renders view', function() {
    controller.chat(this.req, this.res);
    expect(this.res.render).to.have.been.called;
  });

  it('gets songs', function() {
    // this.req = {
    //   q: 'Foo+Fighters'
    // };

    // this.res = {
    //   songs: sinon.spy()
    // };
    // this.req.q = 'Foo+Fighters';
    // controller.songs(this.req, this.res);
    // expect(this.getSongs).to.have.been.called;
  });

});
