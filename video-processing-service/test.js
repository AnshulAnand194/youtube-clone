const request = require('supertest');
const app = require('../app'); // Replace '../app' with your actual app file path

describe('POST /process-video', () => {
  test('should return 400 Bad Request if inputFilePath is missing', async () => {
    const response = await request(app)
      .post('/process-video')
      .send({ outputFilePath: 'output.mp4' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Bad Request: Missing File Path');
  });

  test('should return 400 Bad Request if outputFilePath is missing', async () => {
    const response = await request(app)
      .post('/process-video')
      .send({ inputFilePath: 'input.mp4' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Bad Request: Missing File Path');
  });
});