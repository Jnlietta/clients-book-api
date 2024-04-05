const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ 
            _id: '5d9f1140f10a81216cfd4408',
            performer: "John Doe",
            genre: "Pop",
            price: 25,
            day: 1,
            image: 'image_1'
        });
        await testConOne.save();

        const testConTwo = new Concert({ 
            _id: '5d9f1159f81ce8d1ef2bee48',
            performer: "Amanda Goe",
            genre: "R&B",
            price: 15,
            day: 1,
            image: 'image_2'
        });
        await testConTwo.save();

        const testConThree = new Concert({ 
            _id: '5d9f1159f81ce8d1ef2bee41',
            performer: "Arnold Jay",
            genre: "Pop",
            price: 40,
            day: 1,
            image: 'image_3'
        });
        await testConThree.save();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    });
  
    it('/:id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;

        const resTwo = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee41');
        expect(resTwo.status).to.be.equal(200);
        expect(resTwo.body).to.be.an('object');
        expect(resTwo.body).to.not.be.null;
    });

    it('/performer/:performer should return all concerts by :performer ', async () => {
        const res = await request(server).get('/api/concerts/performer/John Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);

        const resTwo = await request(server).get('/api/concerts/performer/Arnold Jay');
        expect(resTwo.status).to.be.equal(200);
        expect(resTwo.body).to.be.an('array');
        expect(resTwo.body.length).to.be.equal(1);
    });

    it('/performer/:performer should return status 404 if concert with param :performer is not exist', async () => {
        const res = await request(server).get('/api/concerts/performer/Adam Lang');
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Not found'); 

        const resTwo = await request(server).get('/api/concerts/performer/50 Flow');
        expect(resTwo.status).to.be.equal(404);
        expect(resTwo.body).to.be.an('object');
        expect(resTwo.body.message).to.be.equal('Not found');     
    });

    it('/genre/:genre should return all concerts by :genre ', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);

        const resTwo = await request(server).get('/api/concerts/genre/R&B');
        expect(resTwo.status).to.be.equal(200);
        expect(resTwo.body).to.be.an('array');
        expect(resTwo.body.length).to.be.equal(1);
    });

    it('/genre/:genre should return status 404 if concert with param :genre is not exist', async () => {
        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Not found'); 

        const resTwo = await request(server).get('/api/concerts/genre/2');
        expect(resTwo.status).to.be.equal(404);
        expect(resTwo.body).to.be.an('object');
        expect(resTwo.body.message).to.be.equal('Not found');     
    });

    it('/price/:price_min/:price_max should return all concerts with price beetween prams :price_min and :price_max ', async () => {
        const res = await request(server).get('/api/concerts/price/10/25');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);

        const resTwo = await request(server).get('/api/concerts/price/10/45');
        expect(resTwo.status).to.be.equal(200);
        expect(resTwo.body).to.be.an('array');
        expect(resTwo.body.length).to.be.equal(3);
    });

    it('/price/:price_min/:price_max should return status 404 if concerts between params prices are not exist', async () => {
        const res = await request(server).get('/api/concerts/price/2/10');
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Not found'); 

        const resTwo = await request(server).get('/api/concerts/price/26/39');
        expect(resTwo.status).to.be.equal(404);
        expect(resTwo.body).to.be.an('object');
        expect(resTwo.body.message).to.be.equal('Not found');     
    });

    it('/day/:day should return all concerts by :day ', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);

        const resTwo = await request(server).get('/api/concerts/day/2');
        expect(resTwo.status).to.be.equal(404);
        expect(resTwo.body).to.be.an('object');
        expect(resTwo.body.message).to.be.equal('Not found');     
    });

    it('/day/:day should return status 404 if concert with param :day is not exist', async () => {
        const res = await request(server).get('/api/concerts/day/2');
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Not found'); 

        const resTwo = await request(server).get('/api/concerts/day/3');
        expect(resTwo.status).to.be.equal(404);
        expect(resTwo.body).to.be.an('object');
        expect(resTwo.body.message).to.be.equal('Not found');     
    });

          
    after(async () => {
        await Concert.deleteMany();
    });
});