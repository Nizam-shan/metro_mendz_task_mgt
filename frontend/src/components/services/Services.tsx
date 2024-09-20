import axios from "axios";

export const addTask = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/add_task`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllTask = async () =>
  await axios.get(`${process.env.REACT_APP_API}/all_task`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllTaskById = async (id: any) =>
  await axios.get(`${process.env.REACT_APP_API}/task/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const editTask = async (data: any, id: any) =>
  await axios.put(`${process.env.REACT_APP_API}/update_task/${id}`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const deleteTask = async (id: any) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete_task/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const RegisterService = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/auth/register`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const LoginService = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/auth/login`, data);
