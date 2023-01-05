import { defineStore } from 'pinia';
import {fetchWrapper} from '@/_helpers/fetch-wrapper'
const baseUrl = `${process.env.VUE_APP_API_URL}/raffles/`;

export const useRaffleStore = defineStore({
  id: 'raffle',
  state: () => ({
    raffles: [] as any[],
    selectedRaffle: null as any
  }),
  actions: {
    async getRaffles(){
      try{
        const resRaffles = await fetchWrapper.get(`${baseUrl}`, null)
        this.raffles = resRaffles
      }catch(e){
        console.log('error getting raffles', e)
      }
    },
    async searchRaffle(raffleId: number | null){
      try{
        const resRaffles = await fetchWrapper.get(`${baseUrl}${raffleId}`, null)
        this.raffles = resRaffles
      }catch(e){
        console.log('error getting raffles', e)
      }
    },
    async fetchSelectedRaffle(raffleId: number){
      try{
        const resRaffle = await fetchWrapper.get(`${baseUrl}${raffleId}`, null)
        this.selectedRaffle = resRaffle
      }catch(e){
        console.log('error getting fetchedRaffle', e)
      }
    },
    // async updateRaffle(){
    //   return await fetchWrapper.put(`${baseUrl}`, this.selectedRaffle)
    // },
    async createRaffle(raffle: any){
      return await fetchWrapper.post(`${baseUrl}`, raffle)
    },
    async updateRaffle(raffle: any){
      return await fetchWrapper.put(`${baseUrl}${this.selectedRaffle.id}`, raffle)
    },
    async deleteRaffle(){
      return await fetchWrapper.delete(`${baseUrl}${this.selectedRaffle.id}`, null)
    },
    async saveTicketPurchase(tickets: any[]){
      return await fetchWrapper.post(`${baseUrl}tickets`, tickets)
    }
  }
});