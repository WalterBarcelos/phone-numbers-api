import request from 'supertest';
import sinon, { SinonStub } from 'sinon';
import jwt from 'jsonwebtoken';
import app from '../../src/app';
import PhoneNumber from '../../src/models/PhoneNumber';

describe('getAvailableNumbers', () => {
    let findStub: SinonStub;
    let consoleErrorStub: SinonStub;
    let token: string;

    beforeAll(() => {
        // Generate a JWT token
        const payload = { userId: 'testUser' };
        const secret = 'defaultjwtsecret';
        token = jwt.sign(payload, secret, { expiresIn: '1h' });
    });

    beforeEach(() => {
        findStub = sinon.stub(PhoneNumber, 'find');
        consoleErrorStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
        sinon.restore(); // Restore after each test
    });

    it('should return a list of available phone numbers', async () => {
        const mockNumbers = [
            { number: '1234567890', allocatedTo: null },
            { number: '0987654321', allocatedTo: null }
        ];
        findStub.resolves(mockNumbers);

        const response = await request(app)
            .get('/api/phone-numbers/available-numbers')
            .set('Authorization', `Bearer ${token}`); // Add JWT token to the request

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockNumbers);
        sinon.assert.calledOnce(findStub); // check if the stub was called once
        sinon.assert.calledWith(findStub, { allocatedTo: null }); // check the query is correct
    });

    it('should handle errors when retrieving phone numbers', async () => {
        const error = new Error('Database error');
        findStub.rejects(error); // simulate an error

        const response = await request(app)
            .get('/api/phone-numbers/available-numbers')
            .set('Authorization', `Bearer ${token}`); // Add JWT token to the request

        expect(response.status).toBe(500); // Expecting a 500 status code
        sinon.assert.calledOnce(consoleErrorStub); // check console.error was called once
        expect(consoleErrorStub.calledWithMatch('Error:', error.message)).toBe(true);
    });
});
