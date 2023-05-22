
import { Post, Get, Del, Patch } from "../utils/request"

export const getUser = async (email="",password="")=>{
  const result = await Get(`users?email=${email}&password=${password}`);
  return result;
}
export const checkEmail = async (email="")=>{
  const result = await Get(`users?email=${email}`);
  return result;
}