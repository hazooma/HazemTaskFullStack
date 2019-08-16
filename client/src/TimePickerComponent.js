import React from "react";

import PickyDateTime from "react-picky-date-time";
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPickyDateTime: true,
      date: "15",
      month: "08",
      year: "2019",
      hour: "03",
      minute: "10",
      second: "40",
      meridiem: "PM"
    };
    this.onMeridiemChange = this.onMeridiemChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onMeridiemChange() {
    let newstate = this.state.meridiem === "PM" ? "AM" : "PM";
    this.setState({ meridiem: newstate });
  }

  onChange(event) {
    this.props.handle(event);
  }
  render() {
    const {
      showPickyDateTime,
      date,
      month,
      year,
      hour,
      minute,
      second,
      meridiem
    } = this.state;

    return (
      <PickyDateTime
        size="xs" // 'xs', 's', 'm', 'l'
        mode={1} //0: calendar only, 1: calendar and clock, 2: clock only; default is 0
        locale={`en-us`} // 'en-us' or 'zh-cn'; default is en-us
        show={showPickyDateTime} //default is false
        onClose={() => this.setState({ showPickyDateTime: true })}
        defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL. format: "HH:MM:SS AM"
        defaultDate={`${month}/${date}/${year}`} // OPTIONAL. format: "MM/DD/YYYY"
        // onYearPicked={res => this.onYearPicked(res)}
        // onMonthPicked={res => this.onMonthPicked(res)}
        onDatePicked={res => this.onChange(res)}
        // onResetDate={res => this.onResetDate(res)}
        // onResetDefaultDate={res => this.onResetDefaultDate(res)}
        onSecondChange={res => this.onChange(res)}
        onMinuteChange={res => this.onChange(res)}
        onHourChange={res => this.onChange(res)}
        onResetTime={res => this.onMeridiemChange(res)}
        onResetDefaultTime={res => this.onResetDefaultTime(res)}
        onClearTime={res => this.onMeridiemChange(res)}
      />
    );
  }
}
