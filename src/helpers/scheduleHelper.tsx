import IAppointment from "../interfaces/IAppointment";
import IAvailability from "../interfaces/IAvailability";
import {
    breakIdAfternoon,
    breakIdMorning,
    firstIdAfternoon,
    getChosenDayByID,
    lastIdMorning, saturdayID, sundayID
} from "./calendarHelper";

export const appointments: Array<IAppointment> = [];

export function makeAppointment(date: string, time: any, weekID: number, userID: number) {

    let _date = new Date(date);
    _date.setHours(0, 0, 0, 0);

    let appointmentForWeek = 0;
    let appointmentForDay = 0;

    appointments.filter((appointment: IAppointment) => {
        if ((appointment.appointment.date).getTime() === _date.getTime() && appointment.userID === userID) {
            appointmentForDay++;
        } else if (appointment.weekID == weekID && appointment.userID === userID) {
            appointmentForWeek++;
        }
    });

    console.log(appointmentForDay, appointmentForWeek)

    if(appointmentForDay >= 1){
        alert("YOU CAN'T CREATE APPOINTMENT FOR THIS DAY ANYMORE");
    } else if (appointmentForWeek < 2) {
        appointments.push({
            userID: userID,
            weekID: weekID,
            appointment: {
                id: appointments.length,
                timeId: time.id,
                date: new Date(date),
            }
        });
    } else {
        alert("YOU CAN'T CREATE APPOINTMENT FOR THIS WEEK ANYMORE");
    }
}


export function sortedAppointments():Array<IAppointment> {
    let removedOldAppointments =  appointments.filter(app => {
            let appDate = app.appointment.date.getTime();
            let today = new Date().getTime();
            if(!(appDate<today)){
                return appDate;
            }
    });

    let appointmentByDate = removedOldAppointments.slice().sort((a: IAppointment, b: IAppointment) => {
        let _a = new Date(a.appointment.date).getTime();
        let _b = new Date(b.appointment.date).getTime();
        return _b - _a;
    });
    let appointmentByUser = appointmentByDate.slice().sort((a: IAppointment, b: IAppointment) => b.userID - a.userID);
    let appointmentByWeekID = appointmentByUser.sort((a: IAppointment, b: IAppointment) => a.weekID > b.weekID ? 1 : -1);

    return appointmentByWeekID;
}


export function checkAvailability(date: string, time: any): IAvailability {
    let today = new Date().getTime();
    let dDate = new Date(date).getTime();

    if (closeDaysBeforeTommorow(dDate, today)) {
        return {
            className: "days-before",
            availabilityDescription: "",
            isAvailable: false
        };
    } else if (checkWorkingHoursForDay(date, time)) {
        return {
            className: "nonworking-hours",
            availabilityDescription: "",
            isAvailable: "nonworkingHours"
        };
    } else if (checkSunday(date)) {
        return {
            className: "nonworking-hours",
            availabilityDescription: "",
            isAvailable: "nonworkingHours"
        };
    } else if (checkSaturdays(date)) {
        return {
            className: "nonworking-hours",
            availabilityDescription: "",
            isAvailable: "nonworkingHours"
        };
    } else if (checkBreak(time)) {
        return {
            className: "break",
            availabilityDescription: "BREAK",
            isAvailable: "break"
        };
    }

    for (let i = 0; i < appointments.length; i++) {
        let aDate = appointments[i].appointment.date.getTime();
        if (checkIfItsReserved(aDate, dDate, appointments[i].appointment.timeId, time.id)) {
            return {
                className: "reserved",
                availabilityDescription: "RESERVED",
                isAvailable: "reserved"
            };
        }
    }

    return {
        className: "free",
        availabilityDescription: "FREE",
        isAvailable: true
    };
}


function closeDaysBeforeTommorow(dDate: number, today: number): boolean {
    return dDate <= today;
}

function checkIfItsReserved(aDate: number, dDate: number, aTimeId: number, dTimeId: number): boolean {
    return aDate === dDate && aTimeId === dTimeId;
}

function checkWorkingHoursForDay(date: string, time: any): boolean {
    let _date = new Date(date);
    if (!(_date.getDate() % 2 === 0 && time.id > lastIdMorning)) {
        return !(_date.getDate() % 2 === 0) && time.id < firstIdAfternoon;
    } else {
        return true;
    }
}

function checkBreak(time: any): boolean {
    return time.id === breakIdMorning || time.id === breakIdAfternoon;
}

function checkSaturdays(date: string): boolean {
    let _date = new Date(date);
    return getChosenDayByID(_date.getDay()).dayID === saturdayID && !(_date.getDate() % 2 === 0);
}

function checkSunday(date: string): boolean {
    let _date = new Date(date);
    return getChosenDayByID(_date.getDay()).dayID === sundayID;
}


appointments.push(
    {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 0,
            timeId: 11,
            date: new Date("Fri Jul 17 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 1,
            timeId: 2,
            date: new Date("Sun Jul 18 2020 00:00:00"),
        }

    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 2,
            timeId: 12,
            date: new Date("Sat Jul 20 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 3,
            timeId: 4,
            date: new Date("Sat Jul 20 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 4,
            timeId: 11,
            date: new Date("Sat Jul 21 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 5,
            timeId: 15,
            date: new Date("Sat Jul 21 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 6,
            timeId: 5,
            date: new Date("Sat Jul 22 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 7,
            timeId: 17,
            date: new Date("Sat Jul 23 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 8,
            timeId: 1,
            date: new Date("Sat Jul 24 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 9,
            timeId: 20,
            date: new Date("Sat Jul 27 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 10,
            timeId: 5,
            date: new Date("Sat Jul 28 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 11,
            timeId: 19,
            date: new Date("Sat Jul 29 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 12,
            timeId: 17,
            date: new Date("Sat Jul 29 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 13,
            timeId: 8,
            date: new Date("Sat Jul 30 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 14,
            timeId: 7,
            date: new Date("Sat Jul 30 2020 00:00:00"),
        }
    }, {
        userID: 0,
        weekID: 0,
        appointment: {
            id: 15,
            timeId: 21,
            date: new Date("Sat Jul 31 2020 00:00:00"),
        }
    }
);
