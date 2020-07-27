import * as React from "react";
import IWeekDays from "../interfaces/IWeekDays";



export function handleChangeWeek(dataSymbol:string, weekStartWith:Date, weekID:number)
    :{beforeToday: boolean, afterTwoMonths:boolean, newStartDate:Date, weekID: number} {
    let todayDay = weekStartWith.getDate();
    let todayMonth = weekStartWith.getMonth();
    let todayYear = weekStartWith.getFullYear();


    if (dataSymbol === "minus") {
        let newDay = todayDay - 7;
        let newStartDate = new Date(todayYear, todayMonth, newDay);

        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let mondayFromToday = getMonday(today);
        if (mondayFromToday.getTime() > newStartDate.getTime()) {
            return {beforeToday: true, afterTwoMonths:false, newStartDate:newStartDate, weekID: weekID};
        } else {
            weekID = weekID - 1;
            return {beforeToday: false, afterTwoMonths:false, newStartDate:newStartDate, weekID: weekID}
        }

    }
    if (dataSymbol === "plus") {
        let newDay = todayDay + 7;
        let newStartDate = new Date(todayYear, todayMonth, newDay);

        let today = new Date();
        let month = today.getMonth() + 2;
        let maxDate = new Date(today.getFullYear(), month, today.getDate());
        let mondayFromMaxDate = getMonday(maxDate);

        if (mondayFromMaxDate.getTime() < newStartDate.getTime()) {
            return {beforeToday: false, afterTwoMonths:true, newStartDate:newStartDate, weekID: weekID};
        } else {
            weekID = weekID + 1;
            return {beforeToday: false, afterTwoMonths:false, newStartDate:newStartDate, weekID: weekID};
        }
    }
    return {beforeToday: false, afterTwoMonths:true, newStartDate:new Date(), weekID: weekID};

}


export function getWeekDates(date: Date, id:number): IWeekDays {
    let startFromMonday = getMonday(date);
    let weekDates = new Array(7);


    for (let i = 0; i <= 7; i++) {
        let day = startFromMonday.getDate() + i;
        let month = startFromMonday.getMonth();
        let year = startFromMonday.getFullYear();

        let saveDate = new Date(year, month, day);

        weekDates.fill(saveDate, i)
    }

    return {weekDays: weekDates, weekID: id };
}


export function getMonday(d: Date): Date {
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}


export function getChosenTimeByID(id: number) {
    let time = chooseTime.find(function (time, i) {
        if (i == id) {
            return time;
        }
    });
    return time;
}


export function getChosenDayByID(id: number) {
    let dayInWeek = weekdays.find(function (time, i) {
        if (time.dayID == id) {
            return time;
        }
    });
    return dayInWeek;
}


export function getUserByID(id: number) {
    let user = users.find(function (user, i) {
        if (user.userID == id) {
            return user;
        }
    });
    return user;
}


export const weekdays: Array<any> = [
    {day: "Monday", dayID: 1},
    {day: "Tuesday", dayID: 2},
    {day: "Wednesday", dayID: 3},
    {day: "Thursday", dayID: 4},
    {day: "Friday", dayID: 5},
    {day: "Saturday", dayID: 6},
    {day: "Sunday", dayID: 0}
];

export const users: Array<any> = [
    {userID: 0, userName: "User 0"},
    {userID: 1, userName: "User 1"},
    {userID: 2, userName: "User 2"},
    {userID: 3, userName: "User 3"},
    {userID: 4, userName: "User 4"}
];


export const chooseTime: Array<any> = [
    {time: "08:00 - 08:30", id: 0},
    {time: "08:30 - 09:00", id: 1},
    {time: "09:00 - 09:30", id: 2},
    {time: "09:30 - 10:00", id: 3},
    {time: "10:00 - 10:30", id: 4},
    {time: "10:30 - 11:00", id: 5},
    {time: "11:00 - 11:30", id: 6},
    {time: "11:30 - 12:00", id: 7},
    {time: "12:00 - 12:30", id: 8},
    {time: "12:30 - 13:00", id: 9},
    {time: "13:00 - 13:30", id: 10},
    {time: "13:30 - 14:00", id: 11},
    {time: "14:00 - 14:30", id: 12},
    {time: "14:30 - 15:00", id: 13},
    {time: "15:00 - 15:30", id: 14},
    {time: "15:30 - 16:00", id: 15},
    {time: "16:00 - 16:30", id: 16},
    {time: "16:30 - 17:00", id: 17},
    {time: "17:00 - 17:30", id: 18},
    {time: "17:30 - 18:00", id: 19},
    {time: "18:00 - 18:30", id: 20},
    {time: "18:30 - 19:00", id: 21}
];
export const lastIdMorning:number = 11;
export const firstIdAfternoon:number = 10;
export const breakIdMorning:number = 6;
export const breakIdAfternoon:number = 16;

export const sundayID:number = 0;
export const saturdayID:number = 6;
