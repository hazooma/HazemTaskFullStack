import React from "react";

import PickyDateTime from "react-picky-date-time";
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPickyDateTime: true,
      date: 10,
      month: 6,
      year: 2019,
      hour: 2,
      minute: 25,
      second: 40,
      meridiem: "PM"
    };
    this.onMeridiemChange = this.onMeridiemChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeHour = this.onChangeHour.bind(this);
    this.onChangeMinute = this.onChangeMinute.bind(this);
    this.onChangeSecond = this.onChangeSecond.bind(this);
  }
  onMeridiemChange() {
    let newstate = this.state.meridiem === "PM" ? "AM" : "PM";
    this.setState({ meridiem: newstate });
  }
  onChangeHour(event) {
    this.setState({
      hour:
        this.state.meridiem === "PM"
          ? parseInt(event.value)
          : parseInt(event.value)
    });
    this.onChange(event);
  }
  onChangeMinute(event) {
    this.setState({ minute: parseInt(event.value) });
    this.onChange(event);
  }
  onChangeSecond(event) {
    this.setState({ second: parseInt(event.value) });
    this.onChange(event);
  }

  onChange(event) {
    const { date, year, month } = event;
    if (date) {
      this.setState({ date, year, month });
    }
    this.props.handle({
      day: date || this.state.date,
      month: month || this.state.month,
      year: year || this.state.year,
      minute: this.state.minute,
      hour:
        this.state.meridiem === "PM" ? this.state.hour + 12 : this.state.hour,
      second: this.state.second
    });
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
        defaultDate={`${month}/${date}/${year}`} // OPTIONAL. format: "MM/DD/YYYY"
        // onYearPicked={res => this.onYearPicked(res)}
        // onMonthPicked={res => this.onMonthPicked(res)}
        onDatePicked={res => this.onChange(res)}
        // onResetDate={res => this.onResetDate(res)}
        // onResetDefaultDate={res => this.onResetDefaultDate(res)}
        onSecondChange={res => this.onChangeSecond(res)}
        onMinuteChange={res => this.onChangeMinute(res)}
        onHourChange={res => this.onChangeHour(res)}
      />
    );
  }
}
