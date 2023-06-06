import Cookies from 'js-cookie';
import { register, login, getTokenAndUserId, logout, deleteUser } from "./authService";

describe('authService', () => {
  const mockUser = {
    username: 'testuser',
    password: 'Testpassword123'
  };
  
  describe('register', () => {
    it('registers a new user', async () => {
      const response = await register(mockUser);
      expect(response.status).toBe(201);
    });

    it('throws an error if registration fails', async () => {
      await expect(register({})).rejects.toThrow('Failed to register user');
    });
  });

  describe('login', () => {
    it('logs in a user', async () => {
      const response = await login(mockUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('userId');
      Cookies.set('accessToken', response.body.accessToken); // Set token as a cookie
    });

    it('throws an error if login fails', async () => {
      await expect(login({})).rejects.toThrow('Failed to login user');
    });
  });

  describe('getTokenAndUserId', () => {
    it('gets the accessToken and userId from cookies', async () => {
      Cookies.set('accessToken', 'testtoken');
      Cookies.set('userId', 'testuserid');
      const { accessToken, userId } = await getTokenAndUserId();
      expect(accessToken).toBe('testtoken');
      expect(userId).toBe('testuserid');
    });
  });

  describe('logout', () => {
    it('clears cookies and local storage', async () => {
      Cookies.set('accessToken', 'testtoken');
      Cookies.set('userId', 'testuserid');
      localStorage.setItem('jobs', 'testjobs');
      await logout();
      expect(Cookies.get('accessToken')).toBeUndefined();
      expect(Cookies.get('userId')).toBeUndefined();
      expect(localStorage.getItem('jobs')).toBeNull();
    });
  });

  describe('deleteUser', () => {
    beforeAll(async () => {
      const response = await login(mockUser);
      Cookies.set('accessToken', response.body.accessToken); // Set token as a cookie
    });

    it('deletes a user', async () => {
      const accessToken = Cookies.get('accessToken');
      const response = await deleteUser(mockUser, accessToken);
      expect(response.status).toBe(200);
    });

    it('throws an error if deletion fails', async () => {
      await expect(deleteUser(mockUser, Cookies.get('accessToken'))).rejects.toThrow('Failed to delete user');
    });
  });
});
