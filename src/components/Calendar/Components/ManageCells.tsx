import * as React from "react";
import { getWeekDates} from "../../../helpers/calendarHelper";
import {makePointer} from "../calendar";
import {checkAvailability} from "../../../helpers/scheduleHelper";
import IAvailability from "../../../interfaces/IAvailability";

class ManageCells extends React.Component<any, any> {

    render() {
        const {chooseTime, weekStartWith, weekID, handleAppointments} = this.props;

        return (
            chooseTime.map((time: {time: string, id: number}) => {
                return (
                    <tr key={time.id}>
                        <td className="time-style" style={makePointer(false)}>{time.time}</td>
                        {
                            getWeekDates(weekStartWith, weekID).weekDays.map((date: string, idCell: number) => {
                                    let availability: IAvailability = checkAvailability(date, time);
                                    return (
                                        <td data-date-cell={date} data-time-row={time.id} key={idCell}
                                            onClick={availability.isAvailable === true ? handleAppointments:null}
                                            className={availability.className + " pointer text-align"}
                                            style={makePointer(availability.isAvailable)}>
                                            {availability.availabilityDescription}
                                        </td>
                                    )
                                }
                            )
                        }
                    </tr>
                )
            })
        );
    }

}

export default ManageCells;