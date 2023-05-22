import { Post, Get, Del, Patch } from "../utils/request"
export const getAnswer = async (id)=>{
    const result = await Get(`answers?id=${id}`);
    return result;
}