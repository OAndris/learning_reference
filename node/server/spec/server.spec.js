const request = require('request');

describe('get messages', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done(); // the Jasmine way of specifying the end of the async function (else it might not finish before the test finishes)
        });
    });
    it('should return a non-empty list', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    });
});

describe('get messages from user', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:3000/messages/Lisa', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('name should be Lisa', (done) => {
        request.get('http://localhost:3000/messages/Lisa', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('Lisa');
            done();
        });
    });
});
