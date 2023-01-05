import { useAuthStore } from '@/stores/auth.store'
import { getAuth } from 'firebase/auth';

const request = (method: any) => {
  return async (url: RequestInfo, body: any) => {
    const requestOptions: any = {
      method,
      headers: await authHeader(url)
    }
    if(body){
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  }
}

const authHeader = async (url: any) => {
  const token = await getIdToken();
  if(token === undefined) return {}

  const isApiUrl = url.startsWith(process.env.VUE_APP_API_URL);
  if(isApiUrl)
    return { Authorization: `Bearer ${token}`};
  
  return {}
  
}

const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if(!response.ok){
      const { user, logout } = useAuthStore();
      if([401, 403].includes(response.status) && user){
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error)
    }
    return data;
  })
}

const getIdToken = async () => {
  const user = getAuth().currentUser;
  return await user?.getIdToken(true);
}

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}