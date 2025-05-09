import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((callback) => callback),
  };
});

jest.mock('axios', () => {
  return {
    get: jest.fn(),
    create() {
      return {
        get: this.get.mockResolvedValue({ data: 'OK' }),
      };
    },
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('users');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.spyOn(axios.create(), 'get');
    await throttledGetDataFromApi('users');
    expect(spy).toHaveBeenCalledWith('users');
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('users');
    expect(response).toEqual('OK');
  });
});
