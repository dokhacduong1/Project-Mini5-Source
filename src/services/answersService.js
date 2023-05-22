
import { Post, Get, Del, Patch } from "../utils/request"
import {getCookie} from "../helpers/cookie"
export const createAnswer = async (options)=>{
  let result = "ok";
  try{
    result = await Post(`answers`,options);
  }catch{
    result ="ok"
  }
  
  return result;
}

export const getAnswerByUserId = async ()=>{
  const userId = getCookie("id")
  const result = await Get(`answers?userId=${userId}`);
  return result;
}