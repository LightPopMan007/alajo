import axios from 'axios';
const connect = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
    timeout: 30000
})
const responseErrorHandler = (error) => {
  if (error.response) {
    if (error.response.status > 300) {
      if (typeof window === 'undefined'){
         throw new error
      } else {
        window.location.href = '/auth/logout';
      }
    }
  }

  return error;
}
connect.interceptors.response.use((response) => response, responseErrorHandler);

export const Server = connect;



export const imageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/dauntless-exchange/${src}.jpg?w=${width}&q=${quality || 75}`;
};

export const isBrowser = ()=> {
    return typeof window !== 'undefined'
  }
  
  export const nextLocalStorage = () => {
    if (isBrowser()) {
      return window.localStorage
    }
  }

export const CardLoader = (data, id) => data.filter(card => card.id === id);

