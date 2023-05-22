
import { Post, Get, Del, Patch } from "../utils/request"

export const getListTopic = async ()=>{
  const result = await Get(`topics`);
  return result;
}

export const getTopic = async (id)=>{
  const result = await Get(`topics/${id}`);
  return result;
}

