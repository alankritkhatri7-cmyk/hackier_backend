import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('hk_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('hk_token'));

  const fetchMe = useCallback(async (jwt) => {
    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.status === 403) {
        // Token valid but subscription inactive – decode minimal info from JWT payload
        const payload = JSON.parse(atob(jwt.split('.')[1]));
        setUser({ email: payload.sub, subscription_status: 'inactive' });
        return;
      }
      if (res.status === 401) {
        // Token invalid/expired
        setToken(null);
        setUser(null);
        localStorage.removeItem('hk_token');
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch {
      setToken(null);
      setUser(null);
      localStorage.removeItem('hk_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchMe(token);
    else setLoading(false);
  }, [token, fetchMe]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    const { access_token } = await res.json();
    localStorage.setItem('hk_token', access_token);
    setToken(access_token);
    await fetchMe(access_token);
  };

  const signup = async (company_name, email, password) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Signup failed');
    }
    const { access_token } = await res.json();
    localStorage.setItem('hk_token', access_token);
    setToken(access_token);
    // After signup subscription is inactive – fetch me but bypass active check
    try {
      const meRes = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      // /me requires active sub, so on 403 we just set minimal user info
      if (meRes.ok) {
        setUser(await meRes.json());
      } else {
        setUser({ company_name, email, subscription_status: 'inactive' });
      }
    } catch {
      setUser({ company_name, email, subscription_status: 'inactive' });
    }
  };

  const logout = () => {
    localStorage.removeItem('hk_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = () => token && fetchMe(token);

  const authFetch = useCallback(
    (url, options = {}) =>
      fetch(`${API}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      }),
    [token]
  );

  return (
    <AuthContext.Provider value={{ token, user, loading, login, signup, logout, refreshUser, authFetch, API }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
