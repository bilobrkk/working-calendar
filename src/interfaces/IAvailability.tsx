export default interface IAvailability {
    className: string,
    availabilityDescription: string,
    isAvailable: boolean | "break" | "nonworkingHours" | "reserved"
}
