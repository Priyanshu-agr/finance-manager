import supertest from "supertest";
import app from "../src/app";
import * as authService from "../src/services/auth.service";

const userRegisterInput = {
    email: 'test1@email.com',
    userName: 'test1',
    password: 'password'
};

const userLoginInput = {
    userName: 'test1',
    password: 'password'
};

describe('Auth', () => {
    describe('User registration', () => {
        describe('Given a user with a unique email and username', () => {
            it('should register the user successfully', async () => {
                const createUserServiceMock = jest.spyOn(authService, 'registerUser').mockReturnValue(Promise.resolve('User registered successfully'));
                const { statusCode, body } = await supertest(app).post('/api/auth/register').send(userRegisterInput);
                expect(statusCode).toBe(200);
                expect(body).toStrictEqual({ success: true, message: "User registered successfully" });


            });
        });
        // describe('Given a user with an existing email', () => {
        //     it('should throw an error', async () => {

        //     });
        // });

        // describe('Given a user with an existing username', () => {
        //     it('should throw an error', async () => {

        //     });
        // });
    });
    // describe('User login', () => {
    //     describe('Given a valid username and password', () => {
    //         it('should login the user successfully', async () => {

    //         });
    //     });
    //     describe('Given an invalid username', () => {
    //         it('should throw an error', async () => {

    //         });
    //     });
    //     describe('Given an invalid password', () => {
    //         it('should throw an error', async () => {

    //         });
    //     });
    // });
});
