import { defineStore } from 'pinia';
import {fetchWrapper} from '@/_helpers/fetch-wrapper'
import {router} from '@/router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

const baseUrl = `${process.env.VUE_APP_API_URL}/auth`;
const localUser = localStorage.getItem('user')

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
  //initialize state from local storage to enable user to stay logged in
   user: localUser ? JSON.parse(localUser) : null,
   returnUrl: ''
  }),
  actions: {
    async login(username: string, password: string){
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {username, password})
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      router.push(this.returnUrl || '/')

    },
    async loginGoogle(){
      try{
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = getAuth().currentUser;
        const idToken = await user?.getIdToken(true);
        
        const userProfile = await fetchWrapper.post(`${baseUrl}/login`, {idToken: idToken})
        if(idToken && userProfile){ 
          const user = {...credential, ...userProfile }
          this.user = user
          localStorage.setItem('user', JSON.stringify(user))
        }
        
      }catch(e){
        console.log('Error login', e)
      }
    },
    logout(){
      auth.signOut()
      this.user = null;
      localStorage.removeItem('user')
      router.push('login')
    }
  }
});