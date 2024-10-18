import { existsSync } from 'fs';
import * as fs from 'fs/promises';
import path from 'path';
import { readFileAsynchronously } from '.';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('readFileAsynchronously', () => {
  const pathToFile = 'pathToFile';

  test('should call join with pathToFile', async () => {
    (path.join as jest.Mock).mockReturnValue(pathToFile);
    expect(path.join()).toBe('pathToFile');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const readResult = await readFileAsynchronously(pathToFile);

    expect(readResult).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileData = 'this is file data';

    (path.join as jest.Mock).mockReturnValue(pathToFile);
    (existsSync as jest.Mock).mockReturnValue(true);

    (fs.readFile as jest.Mock).mockResolvedValue(fileData);

    const readResult = await readFileAsynchronously(pathToFile);

    expect(readResult).toBe(fileData);
  });
});
