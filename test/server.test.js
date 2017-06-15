const chai = require('chai');
const chaiHttp = require('chai-http');

let server;

chai.use(chaiHttp);

const expect = chai.expect;

describe('WebServer', () => {
  beforeEach(() => {
    server = require('../app/server', { bustCache: true });
  });

  afterEach((done) => {
    server.close(done);
  });

  describe('route /', () => {
    it('responds with status code 200', () => {
      return chai.request(server)
        .get('/')
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });

    it('should return a html page', () => {
      return chai.request(server)
        .get('/')
        .then((res) => {
          expect(res).to.be.html;
        });
    });
  });
});
