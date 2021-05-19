const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endpointUrl = '/todos/';
let firstTodo;

describe(endpointUrl, () => {
    test('GET' + endpointUrl, async () => {     // test = it, it's purely cosmetic
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();

        firstTodo = response.body[0];
    });

    test('GET by id' + endpointUrl + ':todoId', async () => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });

    test('GET todo by id doenst exist' + endpointUrl + ':todoId', async () => {
        const response = await request(app).get(endpointUrl + '70a53519c0bc3f3519ff5f0b');
        
        expect(response.statusCode).toBe(404);
    });

    it('POST' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    it('should return error 500 on malformed data with POST' + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send({ title: 'Missing done property' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({ message: 'Todo validation failed: done: Path `done` is required.' });
    });
});