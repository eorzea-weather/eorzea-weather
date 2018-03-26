import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import { FormattedTime } from 'react-intl';

const calculateEorzeaDate = (date = new Date()) => {
  const eorzeaDate = new Date();
  const msec = Math.floor(date.getTime() * (1440 / 70));
  eorzeaDate.setTime(msec);
  return eorzeaDate;
};

export default class EorzeaClock extends Component {
  state = {
    date: null,
  };

  componentDidMount() {
    this.requestId = requestAnimationFrame(this.loop);
  }

  shouldComponentUpdate(nextProps, { date: nextDate }) {
    const { date: currentDate } = this.state;
    if (currentDate instanceof Date && nextDate instanceof Date) {
      return (
        currentDate.getUTCHours() !== nextDate.getUTCHours() ||
        currentDate.getUTCMinutes() !== nextDate.getUTCMinutes() ||
        currentDate.getUTCSeconds() !== nextDate.getUTCSeconds()
      );
    }
    return currentDate !== nextDate;
  }

  componentWillUnmount() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }

  loop = () => {
    this.setState({
      date: calculateEorzeaDate(),
    }, () => {
      this.requestId = requestAnimationFrame(this.loop);
    });
  }

  render() {
    const { date } = this.state;

    return (
      <Typography color="inherit" variant="body2">ET {date ? <FormattedTime hour="2-digit" hour12={false} minute="2-digit" second="2-digit" timeZone="UTC" value={date} /> : <span>--:--:--</span>}</Typography>
    );
  }
}
