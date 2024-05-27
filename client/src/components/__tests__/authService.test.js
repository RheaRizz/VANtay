// src/services/authService.test.js
import { logout } from '../services/authService';

describe('authService', () => {
  describe('logout', () => {
    it('should remove authToken from localStorage', () => {
      
      localStorage.setItem('authToken', 'some-token');

      
      logout();

      
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });
});
