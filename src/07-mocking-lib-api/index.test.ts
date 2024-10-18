import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockBaseURL = 'https://www.test.com';
const mockData = { data: 'fetched data' };
const relativePath = '/test-path';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      defaults: {
        baseURL: mockBaseURL,
      },
      get: () => ({ data: mockData }),
    });

    const axiosClient = axios.create();

    expect(axiosClient.defaults.baseURL).toBe(mockBaseURL);
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      defaults: {
        baseURL: mockBaseURL,
      },
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    const data = await throttledGetDataFromApi(relativePath);

    // Assertions
    expect(axios.create).toHaveBeenCalled();
    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
    expect(data).toEqual(mockData);
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      defaults: {
        baseURL: mockBaseURL,
      },
      get: async (path: string) => Promise.resolve({ ...mockData, path }),
    });

    const { data } = await throttledGetDataFromApi(relativePath);

    expect(data).toBe('fetched data');
  });
});
