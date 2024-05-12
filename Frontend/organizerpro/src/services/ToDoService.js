
import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/organizer";

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
   console.log("Added to header")
  config.headers['Authorization'] = getToken();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});






  export const addToDo = (todo)=>axios.post(REST_API_BASE_URL,todo);

  export const getAllTodos=(id)=>axios.get(REST_API_BASE_URL+'/todos/'+id);

  export const deleteTodo=(id)=>axios.delete(REST_API_BASE_URL+'/'+id);

  export const updateTodo=(id,todo)=>axios.put(REST_API_BASE_URL+'/'+id,todo);

  export const getTodoById=(id)=>axios.get(REST_API_BASE_URL+'/'+id);

  export const toggleCompleted=(id)=>axios.patch(REST_API_BASE_URL+'/'+id);

  export const createCategory=(category)=>axios.post(REST_API_BASE_URL+'/createCategory',category);

  export const deleteCategory=(id)=>axios.delete(REST_API_BASE_URL+'/category/'+id);

  