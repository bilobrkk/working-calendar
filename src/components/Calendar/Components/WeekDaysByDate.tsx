import {getWeekDates} from "../../../helpers/calendarHelper";
import * as React from "react";
import {makePointer} from "../calendar";

export default function WeekDaysByDate(props:any) {
    const {weekStartWith, weekID} = props;

    return (
        <tr style={makePointer(false)}>
            {
                getWeekDates(weekStartWith, weekID).weekDays.map((date: string, index: number) => {
                    let day = new Date(date);
                    return (
                        <th className="dates-style" key={index}>
                            {day.getDate()}.{day.getMonth() + 1}.
                        </th>
                    )
                })
            }
        </tr>
    )
}
