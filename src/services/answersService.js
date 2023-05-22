
import { Post, Get, Del, Patch } from "../utils/request"
import {getCookie} from "../helpers/cookie"
export const createAnswer = async (options)=>{
  const result = await Post(`answers`,options);
  return result;
}

export const getAnswerByUserId = async ()=>{
  const userId = getCookie("id")
  const result = await Get(`answers?userId=${userId}`);
  return result;
}