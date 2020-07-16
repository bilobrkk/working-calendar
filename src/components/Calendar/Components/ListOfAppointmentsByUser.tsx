import * as React from "react";
import {getChosenTimeByID} from "../../../helpers/calendarHelper";
import IAppointment from "../../../interfaces/IAppointment";
import {FaChevronDown, FaTwitter} from "react-icons/fa"
import {FaChevronUp} from "react-icons/fa"

class ListOfAppointmentsByUser extends React.Component<any, any> {
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
        const {sortedAppointments, userID} = this.props;
        const {showAppointments} = this.state;
        let filteredAppByUserID = sortedAppointments.filter((app: IAppointment) => app.userID == userID);
        if (filteredAppByUserID.length === 0) {
            return (
                <div className="no-appointment-for-user"> There is no appointment for selected user!!</div>
            )
        }

        return (
            <div className="list-app-by-user">
                <button className="btn-all-appointment" onClick={this.toggleAppointmentsHandler}><span>APPOINTMENT BY USER</span>
                    {showAppointments ?
                        <span><FaChevronUp/></span>
                        : <span><FaChevronDown/></span>
                    }
                </button>
                {showAppointments ?
                    <ul>
                        {filteredAppByUserID.map((filteredAppointment: IAppointment, index: number) => {
                            let date = new Date(filteredAppointment.appointment.date);
                            let chosenTime = getChosenTimeByID(filteredAppointment.appointment.timeId);
                            let appointmentDate = date.getDate() + "." + (date.getMonth() + 1) + "." +
                                date.getFullYear();
                            let appointmentTime = chosenTime.time;

                            if (filteredAppointment.userID === 0) {
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
                                        <span> WEEK {filteredAppointment.weekID}: </span>
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

export default ListOfAppointmentsByUser;