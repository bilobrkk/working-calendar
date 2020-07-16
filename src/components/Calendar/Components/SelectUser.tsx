import * as React from "react";
import {users} from "../../../helpers/calendarHelper";

class SelectUser extends React.Component<any, any> {
    render() {
        const {selectChange, userID} = this.props;
        return (
            <form className="form-select-user">
                <label htmlFor="user">Select user:</label>
                <select id="user" className="info-select" onChange={selectChange} value={userID}>
                    {
                        users.map((user, index: number) =>
                            <option key={index}
                                    value={user.userID}>{user.userName}</option>)
                    }
                </select>
            </form>
        )
    }

}

export default SelectUser;