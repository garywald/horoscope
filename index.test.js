const request = require('supertest');
const app = require('./index.js');

describe('GET /signHoroscope', () => {
    it('should return 400 for invalid date format', async () => {
        const res = await request(app)
            .get('/signHoroscope')
            .query({ date: 'invalid-date' });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid date format.');
    });

    it('should return horoscope sign for valid date', async () => {
        const res = await request(app)
            .get('/signHoroscope')
            .query({ date: '2000-01-01' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('sign');
        expect(res.body.sign).toEqual('Capricorn');
    });
});