import { defineStore } from 'pinia';
import {fetchWrapper} from '@/_helpers/fetch-wrapper'
const baseUrl = `${process.env.VUE_APP_API_URL}/tickets/`;

export const useTicketStore = defineStore({
  id: 'tickets',
  state: () => ({
    tickets: [] as any[],
    selectedTicket: null as any
  }),
  actions: {
    async getTickets(raffleId: any = null){
      try{
        const resTickets = await fetchWrapper.get(`${baseUrl}?raffleId=${raffleId}`, null)
        this.tickets = resTickets
      }catch(e){
        console.log('error getting tickets', e)
      }
    },
    async saveTicketPurchase(tickets: any[]){
      return await fetchWrapper.post(`${baseUrl}`, tickets)
    },
    async updateTicketPurchase(ticket: any){
      return await fetchWrapper.put(`${baseUrl}`, ticket)
    }
  }
});