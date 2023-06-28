import axios from "axios";
import {adminurl} from '../url'
const instance = axios.create({
    baseURL:adminurl, 
  });
export default instance