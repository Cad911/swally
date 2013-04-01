var app, compound 
  , request = require('supertest')
  , sinon   = require('sinon');
require('../init')

function PledgeStub () {
    return {
        pledge: ''
    };
}

describe('PledgeController', function() {
  beforeEach(function(done) {
    app = getApp();
    compound = app.compound;
    compound.on('ready', done);
  });

  /*
   * GET /pledges/new
   * Should render pledges/new.jade
   */
  it('should render "new" template on GET /pledges/new', function (done) {
    request(app)
      .get('/pledges/new')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        app.didRender(/pledges\/new\.jade$/i).should.be.true;
        done();
      });
  });

  /*
   * GET /pledges
   * Should render pledges/index.jade
   */
  it('should render "index" template on GET /pledges', function (done) {
    request(app)
      .get('/pledges')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        app.didRender(/pledges\/index\.jade$/i).should.be.true;
        done();
      });
  });

  /*
   * GET /pledges.json
   * Should render pledges.json
   */
  // it('should render json datas on GET /pledges.json', function (done) {
  //   request(app)
  //     .get('/pledges.json')
  //     .end(function (err, res) {
  //       var datas = JSON.parse(res.text).data;

  //       res.statusCode.should.equal(200);
  //       datas.should.have.property('category')
  //       // datas.category.should.be.a('object');
        
  //       done();
  //     });
  // });

  /*
   * GET /pledges/:id/edit
   * Should access Pledge#find and render pledges/edit.jade
   */
  it('should access Pledge#find and render "edit" template on GET /pledges/:id/edit', function (done) {
    var Pledge = app.models.Pledge;

    // Mock Pledge#find
    Pledge.find = sinon.spy(function (id, callback) {
      callback(null, new Pledge);
    });

    request(app)
      .get('/pledges/42/edit')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        Pledge.find.calledWith('42').should.be.true;
        app.didRender(/pledges\/edit\.jade$/i).should.be.true;

        done();
      });
  });

  /*
   * GET /pledges/:id
   * Should render pledges/index.jade
   */
  it('should access Pledge#find and render "show" template on GET /pledges/:id', function (done) {
    var Pledge = app.models.Pledge;

    // Mock Pledge#find
    Pledge.find = sinon.spy(function (id, callback) {
      callback(null, new Pledge);
    });

    request(app)
      .get('/pledges/42')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        Pledge.find.calledWith('42').should.be.true;
        app.didRender(/pledges\/show\.jade$/i).should.be.true;

        done();
      });
  });

  /*
   * POST /pledges
   * Should access Pledge#create when Pledge is valid
   */
  it('should access Pledge#create on POST /pledges with a valid Pledge', function (done) {
    var Pledge = app.models.Pledge
      , pledge = new PledgeStub;

    // Mock Pledge#create
    Pledge.create = sinon.spy(function (data, callback) {
      callback(null, pledge);
    });

    request(app)
      .post('/pledges')
      .send({ "Pledge": pledge })
      .end(function (err, res) {
        res.statusCode.should.equal(302);
        Pledge.create.calledWith(pledge).should.be.true;

        done();
      });
  });

  /*
   * POST /pledges
   * Should fail when Pledge is invalid
   */
  it('should fail on POST /pledges when Pledge#create returns an error', function (done) {
    var Pledge = app.models.Pledge
      , pledge = new PledgeStub;

    // Mock Pledge#create
    Pledge.create = sinon.spy(function (data, callback) {
      callback(new Error, pledge);
    });

    request(app)
      .post('/pledges')
      .send({ "Pledge": pledge })
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        Pledge.create.calledWith(pledge).should.be.true;

        app.didFlash('error').should.be.true;

        done();
      });
  });

  /*
   * PUT /pledges/:id
   * Should redirect back to /pledges when Pledge is valid
   */
  it('should redirect on PUT /pledges/:id with a valid Pledge', function (done) {
    var Pledge = app.models.Pledge
      , pledge = new PledgeStub;

    Pledge.find = sinon.spy(function (id, callback) {
        callback(null, {
          id: 1,
          updateAttributes: function (data, cb) { cb(null) }
        });
    });

    request(app)
      .put('/pledges/1')
      .send({ "Pledge": pledge })
      .end(function (err, res) {
        res.statusCode.should.equal(302);
        res.header['location'].should.include('/pledges/1');

        app.didFlash('error').should.be.false;

        done();
      });
  });

  /*
   * PUT /pledges/:id
   * Should not redirect when Pledge is invalid
   */
  it('should fail / not redirect on PUT /pledges/:id with an invalid Pledge', function (done) {
    var Pledge = app.models.Pledge
      , pledge = new PledgeStub;

    Pledge.find = sinon.spy(function (id, callback) {
        callback(null, {
          id: 1,
          updateAttributes: function (data, cb) { cb(new Error) }
        });
    });

    request(app)
      .put('/pledges/1')
      .send({ "Pledge": pledge })
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        app.didFlash('error').should.be.true;

        done();
      });
  });

  /*
   * DELETE /pledges/:id
   * -- TODO: IMPLEMENT --
   */
  it('should delete a Pledge on DELETE /pledges/:id');

  /*
   * DELETE /pledges/:id
   * -- TODO: IMPLEMENT FAILURE --
   */
  it('should not delete a Pledge on DELETE /pledges/:id if it fails');
});
