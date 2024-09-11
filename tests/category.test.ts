import supertest from 'supertest';
import app from '../src/app';

describe('Category', () => {
    describe('get categories for a user route', () => {
        describe('GET /api/categories/user/:userId', () => {
            describe('when the user exists', () => {
                it('should return 200 and the categories', async () => {
                    const response = await supertest(app).get('/api/categories/user/1');
                    expect(response.status).toBe(200);
                });
            });
            describe('when the user does not exist', () => {
                it('should return 404', async () => {
                    const response = await supertest(app).get('/api/categories/user/100');
                    expect(response.status).toBe(404);
                });
            });

        });
    });
});
