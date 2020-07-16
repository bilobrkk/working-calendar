import {getWeekDates, weekdays} from "../../../helpers/calendarHelper";
import * as React from "react";
import {makePointer} from "../calendar";

export function WeekDaysByName() {
    return (
        <tr style={makePointer(false)}>
            <th rowSpan={2} className="dates-hours-cell"> HOURS / DATES </th>
            {
                weekdays.map((day: {day: string, dayID: number}, index: number) => {
                    return (
                        <th className="days-style" key={index}>{day.day}</th>
                    )
                })
            }
        </tr>
    )
}