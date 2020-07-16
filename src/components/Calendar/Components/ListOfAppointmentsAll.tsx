import * as React from "react";
import {getChosenTimeByID} from "../../../helpers/calendarHelper";
import IAppointment from "../../../interfaces/IAppointment";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

class ListOfAppointmentsAll extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showAppointments: false
        };
        this.toggleAppointmentsHandler = this.toggleAppointmentsHandler.bind(this);

    }


    toggleAppointmentsHandler() {
        this.setState({
            showAppointments: !this.state.showAppointments
        });
    }

    render() {
        const {sortedAppointments} = this.props;
        const {showAppointments} = this.state;

        if (sortedAppointments.length === 0) {
            return (
                <span>THERE IS NO APPOINTMENT!!</span>
            )
        }

        return (
            <div className="list-app-all">
                <button className="btn-all-appointment" onClick={this.toggleAppointmentsHandler}>
                    <span>ALL APPOINTMENTS</span>
                    {showAppointments ?
                        <span><FaChevronUp/></span>
                        : <span><FaChevronDown/></span>

                    }</button>
                {showAppointments ?
                    <ul>
                        {
                            sortedAppointments.map((appointment: IAppointment, index: number) => {
                                let date = new Date(appointment.appointment.date);
                                let chosenTime = getChosenTimeByID(appointment.appointment.timeId);
                                let appointmentDate = date.getDate() + "." + (date.getMonth() + 1) + "." +
                                    date.getFullYear();
                                let appointmentTime = chosenTime.time;
                                if (appointment.userID === 0) {
                                    return (
                                        <li className="appointment-date-time" key={index}>
                                            <span className="index-span">{index + 1}.  </span>
                                            <span>{appointmentDate}</span>
                                            <span>{appointmentTime}</span>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="appointment-date-time" key={index}>
                                            <span className="index-span">{index + 1}.  </span>
                                            <span> WEEK {appointment.weekID}: </span>
                                            <span>{appointmentDate}</span>
                                            <span>{appointmentTime}</span>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    : null
                }

            </div>
        )
    }

}

export default ListOfAppointmentsAll;