
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as userService from './userService';

describe('userService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch users', async () => {
    const usersData = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];

    mock.onGet(`${userService.API_BASE_URL}/user`).reply(200, usersData);

    const result = await userService.getUsers();
    expect(result).toEqual(usersData);
  });

  it('should delete a user', async () => {
    const userId = 1;

    mock.onDelete(`${userService.API_BASE_URL}/user/${userId}`).reply(204);

    await userService.deleteUser(userId);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toBe(`${userService.API_BASE_URL}/user/${userId}`);
  });

  it('should update a user', async () => {
    const userId = 1;
    const userData = { name: 'Updated User' };
    const responseData = { id: userId, ...userData };

    mock.onPut(`${userService.API_BASE_URL}/user/${userId}`).reply(200, responseData);

    const result = await userService.updateUser(userId, userData);
    expect(result).toEqual(responseData);
  });

  it('should fetch user by ID', async () => {
    const userId = 1;
    const userData = { id: userId, name: 'User 1' };

    mock.onGet(`${userService.API_BASE_URL}/user/${userId}`).reply(200, userData);

    const result = await userService.getUserById(userId);
    expect(result).toEqual(userData);
  });
});
