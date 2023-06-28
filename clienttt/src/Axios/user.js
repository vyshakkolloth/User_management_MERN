import axios from "axios";
import {baseurl} from '../url'
const instance = axios.create({
    baseURL:baseurl, 
  });
export default instance