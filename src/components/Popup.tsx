import * as React from "react";
import './popup.scss';

class Popup extends React.Component<any, any> {
    render() {
        const {date, chosenTime, createAppointment, cancel} = this.props;
        let _date = new Date(date);
        let date_date = _date.getDate() + "." + (_date.getMonth() + 1) + "." + _date.getFullYear() + "  " + chosenTime.time;
        return (
            <div className='popup'>
                <div className='popup_inner popup_display'>
                    <h1 className='popup_h1'> CREATE YOUR APPOINTMENT FOR </h1>
                    <p className='popup_h2'>{date_date}</p>
                    <div className='popup_buttons'>
                        <button className='popup_create_buttons' onClick={createAppointment}>CREATE</button>
                        <button className='popup_cancel_buttons' onClick={cancel}>CANCEL</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;