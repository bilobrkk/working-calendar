import * as React from "react";

class ChangeWeek extends React.Component<any, any> {
    render() {
        const {weekStartWith, weekID, changeWeek} = this.props;
        return (
                <div className="change-week-topbar">
                    <button className="btn-last-week" data-symbol="minus"
                            data-state-date={weekStartWith} onClick={changeWeek}>
                        Week before
                    </button>
                    <span className="week-number">Week: {weekID}</span>
                    <button className="btn-next-week" data-symbol="plus"
                            data-state-date={weekStartWith} onClick={changeWeek}>
                        Next week
                    </button>
                </div>
        )
    }

}

export default ChangeWeek;