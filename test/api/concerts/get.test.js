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
            genre: "Rock",
            price: 25,
            day: 1 
        });
        await testConOne.save();

        const testConTwo = new Concert({ 
            _id: '5d9f1159f81ce8d1ef2bee48',
            performer: "Amanda Goe",
            genre: "R&B",
            price: 15,
            day: 1 
        });
        await testConTwo.save();

        const testConThree = new Concert({ 
            _id: '5d9f1159f81ce8d1ef2bee41',
            performer: "Arnold Jay",
            genre: "Pop",
            price: 40,
            day: 2 
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
    });
          
    after(async () => {
        await Concert.deleteMany();
    });
});