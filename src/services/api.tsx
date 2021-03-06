
import axios from 'axios';
import { IDragon, IUser } from 'models';
import * as apiServices from 'services';

const api = axios.create({
  baseURL: 'https://5fbcdf9f3f8f90001638c61a.mockapi.io/'
});

export const addUser = async (user: IUser) => {
  return await api.post(apiServices.userPath, user);
}

export const validateUser = async (user: string,) => {
  return await api.get(apiServices.userPath, { params: { user } });
}

export const getLogin = async (user: string, password: string) => {
  return await api.get(apiServices.userPath, { params: { user, password } })
}

export const getDragons = async () => {
  return await api.get(apiServices.dragonPath);
}

export const addDragon = async (dragon: IDragon) => { 
  return await api.post(apiServices.dragonPath, dragon);
}

export const editDragon = async (id: string, dragon: IDragon) => {
  return await api.put(`${apiServices.dragonPath}/${id}`, dragon);
}

export const deleteDragon = async (id: string) => {
  return await api.delete(`${apiServices.dragonPath}/${id}`);
}

