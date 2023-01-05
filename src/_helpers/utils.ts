

const AppDictionary: any = {
  raffle: {
    id: 'ID',
    raffleType: 'Tipo de sorteo',
    title: 'Titulo',
    description: 'Descripcion',
    celebrationDate: 'Fecha de celebracion',
    salesEndDate: 'Fecha de cierre de venta',
    privacyType: 'Privacidad',
    ticketsQty: 'Tickets',
    ticketPrice: 'Precio',
    saleType: 'Tipo de venta',
    organizerContact: 'Contacto del organizador',
    organizer: 'Organizador',
    awardAddress: 'Dir. Premiacion',
    prizeAddress: 'Dir. del premio',
    status: 'Estado',
    isDeleted: 'Esta eliminado?',
    createdAt: 'Fecha de creación',
    idUserCreator: 'ID del creador',
    userCreator: 'Creador'
  }
}

const raffleStatuses: string[] = [
  'Borrador', 
  'Publicado', 
  'Celebrado', 
  'Suspendido'
]

const globalDict = (obj: string, key: string): string => {
  console.log(obj, key)
  if(obj === '' || key === '')
    return '!'
  return AppDictionary[obj][key]
}

export {
  globalDict,
  raffleStatuses
}