import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = () => {};
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1500);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1500);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(900);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1500);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1500);

    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const pathToFile = '/textFolder/testFile.txt';
    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/textFolder/testFile.txt';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const readFile = await readFileAsynchronously(pathToFile);
    expect(readFile).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = '/textFolder/testFile.txt';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs.promises, 'readFile').mockReturnValue(
      new Promise((resolve) => {
        resolve(Buffer.from('OK'));
      }),
    );

    const readFile = await readFileAsynchronously(pathToFile);
    expect(readFile).toEqual('OK');
  });
});
