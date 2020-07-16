export default interface IAppointment {
    userID: number,
    weekID: number,
    appointment: {
        id: number
        timeId: number,
        date: Date
    },

}