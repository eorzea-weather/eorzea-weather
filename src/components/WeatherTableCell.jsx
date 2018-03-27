import classNames from 'classnames';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import { TableCell } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedTime } from 'react-intl';

const EIGHT_HOURS = 8 * 175 * 1000;

export const styles = ({ palette }) => ({
  highlight: {
    backgroundColor: palette.grey[100],
  },
  past: {
    color: palette.text.disabled,
  },
  progress: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  root: {
    paddingBottom: '15px',
    paddingTop: '15px',
    position: 'relative',
  },
});

@withStyles(styles)
export default class WeatherTableCell extends Component {
  static defaultProps = {
    highlight: false,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    highlight: PropTypes.bool,
    value: PropTypes.shape({
      startedAt: PropTypes.instanceOf(Date).isRequired,
      weather: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    now: Date.now(),
  };

  componentDidMount() {
    this.requestId = requestAnimationFrame(this.loop);
  }

  shouldComponentUpdate({ highlight: nextHighlight, value: nextValue }) {
    const { highlight: currentHighlight } = this.props;
    if (currentHighlight !== nextHighlight) {
      return true;
    }
    const { value: currentValue } = this.props;
    if (currentValue.weather !== nextValue.weather) {
      return true;
    }
    const currentTime = currentValue.startedAt ? currentValue.startedAt.getTime() : 0;
    const nextTime = nextValue.startedAt ? nextValue.startedAt.getTime() : 0;
    if (currentTime !== nextTime) {
      return true;
    }
    return this.isNow();
  }

  componentWillUnmount() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }

  isNow() {
    const { startedAt } = this.props.value;
    const { now } = this.state;
    const time = startedAt.getTime();
    return time <= now && now < time + EIGHT_HOURS;
  }

  isPast() {
    const { startedAt } = this.props.value;
    const { now } = this.state;
    const time = startedAt.getTime();
    return time + EIGHT_HOURS < now;
  }

  loop = () => {
    if (!this.isPast()) {
      this.setState({
        now: Date.now(),
      }, () => {
        this.requestId = requestAnimationFrame(this.loop);
      });
    }
  }

  render() {
    const { classes, highlight, value } = this.props;
    const { now } = this.state;
    const { startedAt, weather } = value;
    const time = startedAt.getTime();
    const className = classNames(classes.root, {
      [classes.highlight]: highlight,
      [classes.past]: this.isPast(),
    });

    return (
      <TableCell className={className} key={`cell-${time}`}>
        <Typography color="inherit">{weather} (<FormattedTime value={startedAt} />)</Typography>
        {this.isNow() && (
          <LinearProgress className={classes.progress} value={((now - time) / EIGHT_HOURS) * 100} variant="determinate" />
        )}
      </TableCell>
    );
  }
}
