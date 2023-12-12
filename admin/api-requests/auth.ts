import { _axios } from "@/lib/axios";
import { API_URL } from "@/lib/config";
import Cookies from "js-cookie";
export const login = async (body: { email: string, password: string }) => {
  console.log('API_URL',API_URL)
  const {data} = await _axios.post(`${API_URL}/login`, body);
  return data
}

export const logout = async () => {
  Cookies.remove('s_id')
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response
}


export const getLoggedInUser = async (config: any) => {
  const res = await fetch(`${API_URL}/me`, config)
  const data = await res.json()
  return data
}


export const register = async (body: any) => {
  const response = await fetch(`${API_URL}/register`, {
    headers: {
      method: 'POST',
      'Content-Type': "application/json",
    },
    body: JSON.stringify(body),
  })
  return response
}
