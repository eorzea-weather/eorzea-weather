import EorzeaTime from 'eorzea-time';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';

export default class EorzeaClock extends Component {
  state = {
    date: null,
  };

  componentDidMount() {
    this.requestId = requestAnimationFrame(this.loop);
  }

  shouldComponentUpdate(nextProps, { date: nextDate }) {
    const { date: currentDate } = this.state;
    if (currentDate instanceof EorzeaTime && nextDate instanceof EorzeaTime) {
      return (
        currentDate.getHours() !== nextDate.getHours()
        || currentDate.getMinutes() !== nextDate.getMinutes()
        || currentDate.getSeconds() !== nextDate.getSeconds()
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
      date: new EorzeaTime(),
    }, () => {
      this.requestId = requestAnimationFrame(this.loop);
    });
  }

  render() {
    const { date } = this.state;

    return (
      <Typography color="inherit" variant="body2">
ET
        {date ? date.toString() : '--:--:--'}
      </Typography>
    );
  }
}
