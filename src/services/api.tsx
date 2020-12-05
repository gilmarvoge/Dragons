
import axios from 'axios';
import { IDragon, IUser } from 'models';
import * as apiServices from 'services';

const apiDragons = axios.create({
  baseURL: 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/'
});

const apiDragonsUsers = axios.create({
  baseURL: 'https://5fbcdf9f3f8f90001638c61a.mockapi.io/'
});

export const addUser = async (user: IUser) => {
  return await apiDragonsUsers.post(apiServices.userPath, user);
}

export const validateUser = async (user: string,) => {
  return await apiDragonsUsers.get(apiServices.userPath, { params: { user } });
}

export const getLogin = async (user: string, password: string) => {
  return await apiDragonsUsers.get(apiServices.userPath, { params: { user, password } })
}

export const getDragons = async () => {
  return await apiDragons.get(apiServices.dragonPath);
}

export const addDragon = async (dragon: IDragon) => { 
  return await apiDragons.post(apiServices.dragonPath, dragon);
}

export const editDragon = async (id: string, dragon: IDragon) => {
  return await apiDragons.put(`${apiServices.dragonPath}/${id}`, dragon);
}

export const deleteDragon = async (id: string) => {
  return await apiDragons.delete(`${apiServices.dragonPath}/${id}`);
}

