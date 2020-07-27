import React, {Component} from "react";
import {
    chooseTime,
    getChosenTimeByID, handleChangeWeek
} from "../../helpers/calendarHelper";
import "./calendar.scss";
import {appointments, checkAvailability, makeAppointment, sortedAppointments} from "../../helpers/scheduleHelper";
import WeekDaysByDate from "./Components/WeekDaysByDate";
import {WeekDaysByName} from "./Components/WeekDaysByName";
import Popup from "../Popup";
import ManageCells from "./Components/ManageCells";
import SelectUser from "./Components/SelectUser";
import ListOfAppointmentsByUser from "./Components/ListOfAppointmentsByUser";
import ChangeWeek from "./Components/ChangeWeek";
import ListOfAppointmentsAll from "./Components/ListOfAppointmentsAll";


export class Calendar extends Component<any, any> {

    selectedTimeID: number = 0;
    selectedDate: string = "";
    selectedTime: number = 0;

    constructor(props: any) {
        super(props);
        this.state = {
            weekStartWith: new Date(),
            appointments: appointments,
            weekID: 0,
            userID: 1,
            showPopup: false
        };
        this.changeWeek = this.changeWeek.bind(this);
        this.handleAppointments = this.handleAppointments.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.createAppointment = this.createAppointment.bind(this);
    }

    changeWeek(event: any) {
        let {weekID, weekStartWith} = this.state;
        let dataSymbol = event.target.getAttribute("data-symbol");

        let response = handleChangeWeek(dataSymbol, weekStartWith, weekID);

        if (response.beforeToday) {
            return alert("You cannot go in week before that we are today!");
        }
        if (response.afterTwoMonths) {
            return alert("You cannot go more than two months from today!");
        }

        this.setState(() => {
            return {
                weekStartWith: response.newStartDate,
                weekID: response.weekID
            }
        });

    };

    handleAppointments(event: any) {
        if (this.state.userID == 0) {
            alert("YOU CANNOT CREATE APPOINTMENT FOR THIS USER!");
            return;
        }
        this.selectedTimeID = event.target.getAttribute("data-time-row");
        this.selectedDate = event.target.getAttribute("data-date-cell");
        this.selectedTime = getChosenTimeByID(this.selectedTimeID);
        this.togglePopup();
    };

    selectChange(event: any) {
        let userID = event.target.value;
        this.setState((state: any) => {
            return {userID: userID}
        });
    };

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    createAppointment() {
        let {weekID, userID} = this.state;
        if (checkAvailability(this.selectedDate, this.selectedTimeID).isAvailable) {
            this.togglePopup();
            makeAppointment(this.selectedDate, this.selectedTime, weekID, userID);

            this.setState((state: any) => {
                return {appointments: appointments}
            });
        } else return;
    }

    render() {
        const {weekID, weekStartWith, showPopup, userID} = this.state;
        return (
            <div className="content">
                <div className="calendar">
                    <table>
                        <thead>
                        <WeekDaysByName/>
                        <WeekDaysByDate
                            weekStartWith={weekStartWith}
                            weekID={weekID}/>
                        </thead>
                        <tbody>

                        <ManageCells
                            chooseTime={chooseTime}
                            weekStartWith={weekStartWith}
                            weekID={weekID}
                            handleAppointments={this.handleAppointments}/>

                        </tbody>
                    </table>
                </div>
                <div className="info-div">
                    <ChangeWeek
                        changeWeek={this.changeWeek}
                        weekID={weekID}
                        weekStartWith={weekStartWith}/>
                    <SelectUser
                        selectChange={this.selectChange}
                        userID={userID}/>
                    <div className="list-appointment">
                        <ListOfAppointmentsByUser
                            sortedAppointments={sortedAppointments()}
                            userID={userID}/>
                        <ListOfAppointmentsAll
                            sortedAppointments={sortedAppointments()}
                            userID={userID}/>
                    </div>
                    {showPopup ?
                        <Popup date={this.selectedDate}
                               chosenTime={this.selectedTime}
                               createAppointment={this.createAppointment}
                               cancel={this.togglePopup}/>
                        : null
                    }
                </div>
            </div>
        )

    }

}

export function makePointer(availability: boolean | "break" | "nonworkingHours" | "reserved") {
    if (availability === true) {
        return {cursor: "pointer"};
    }
    if (availability === "reserved") {
        return {cursor: "no-drop"};
    }
    if (availability === "break") {
        return {cursor: "no-drop"};
    }
    return {cursor: "default"};
}

