import Cookies from 'js-cookie';

/**
 * Get the access token from the cookie storage
 * 
 * @returns {string|null} The access token or null if not found
 * 
 */
export function getAccessTokenFromStorage() {
    const { accessToken } = Cookies.get();
    return accessToken || null;
}

/**
 * Set token and userId in cookies
 * 
 * @param {string} accessToken - The access token
 * @param {string} refreshToken - The refresh token
 * @param {string} userId - The user ID
 * @param {number} accessTokenExpiresIn - The access token expiration time in seconds
 * @param {number} refreshTokenExpiresIn - The refresh token expiration time in seconds
 * 
 */
export function setTokensAndUserId(accessToken, refreshToken, userId, accessTokenExpiresIn, refreshTokenExpiresIn) {
    const accessTokenExpiresAt = new Date(new Date().getTime() + accessTokenExpiresIn * 1000);
    const refreshTokenExpiresAt = new Date(new Date().getTime() + refreshTokenExpiresIn * 1000);

    Cookies.set('accessToken', accessToken, { expires: accessTokenExpiresAt, path: '/', sameSite: 'strict' });
    Cookies.set('refreshToken', refreshToken, { expires: refreshTokenExpiresAt, path: '/', sameSite: 'strict' });
    Cookies.set('userId', userId, { expires: accessTokenExpiresAt, path: '/', sameSite: 'strict' });
    Cookies.set('accessTokenExpiresAt', accessTokenExpiresAt.toISOString(), { expires: accessTokenExpiresAt, path: '/', sameSite: 'strict' });
    Cookies.set('refreshTokenExpiresAt', refreshTokenExpiresAt.toISOString(), { expires: refreshTokenExpiresAt, path: '/', sameSite: 'strict' });
}

/**
 * Remove tokens and userId from cookies
 * 
 */
export function removeTokensAndUserId() {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    Cookies.remove('userId', { path: '/' });
    Cookies.remove('accessTokenExpiresAt', { path: '/' });
    Cookies.remove('refreshTokenExpiresAt', { path: '/' });
}

/**
 * Set token and userId in cookie 
 * 
 * @returns {Object} An object with the token and userId
 * 
 */
export function getTokenAndUserId() {

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const userId = Cookies.get('userId');
    const accessTokenExpiresAt = new Date(Cookies.get('accessTokenExpiresAt'));
    const refreshTokenExpiresAt = new Date(Cookies.get('refreshTokenExpiresAt'));

    return {
        accessToken,
        accessTokenExpiresAt,
        refreshToken, 
        refreshTokenExpiresAt,
        userId
    };
  }