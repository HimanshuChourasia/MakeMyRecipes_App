process.env.NODE_ENV = 'test';
/* Install as deb-dependencies */

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

// use chaihttp
chai.use(chaiHttp);

/**
* TEST THE INDEX PAGE

 **/
describe('/GET INDEX',() => {
    it('should get the Index page of the application', (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) =>{
                res.should.have.status(200);
                res.should.have.header('content-type',/^text\/html.*$/);
                done();

            })

    });
});


