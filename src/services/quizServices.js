
import { Post, Get, Del, Patch } from "../utils/request"

export const getListQuestions = async (id)=>{
  const result = await Get(`questions?topicId=${id}`);
  return result;
}
