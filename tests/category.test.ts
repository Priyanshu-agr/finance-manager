import supertest from 'supertest';
import app from '../src/app';

describe('Category', () => {
    describe('get categories route', () => {
        describe('GET /api/categories/user/:userId', () => {
            it('should return 200', async () => {
                const response = await supertest(app).get('/api/categories/user/1');
                expect(response.status).toBe(200);
            });
            it('should return 404', async () => {
                const response = await supertest(app).get('/api/categories/user/100');
                expect(response.status).toBe(404);
            });

        });
    });
});
