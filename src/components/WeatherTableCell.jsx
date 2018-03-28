import classNames from 'classnames';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import { TableCell } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedTime, injectIntl, intlShape } from 'react-intl';
import weatherShape from '../types/weatherShape';

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

@injectIntl
@withStyles(styles)
export default class WeatherTableCell extends Component {
  static defaultProps = {
    highlight: false,
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    highlight: PropTypes.bool,
    intl: intlShape.isRequired,
    value: weatherShape.isRequired,
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
    const {
      classes,
      highlight,
      intl,
      value,
    } = this.props;
    const { now } = this.state;
    const { startedAt, name } = value;
    const time = startedAt.getTime();
    const className = classNames(classes.root, {
      [classes.highlight]: highlight,
      [classes.past]: this.isPast(),
    });
    const title = intl.formatDate(startedAt.toISOString(), {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      second: 'numeric',
      year: 'numeric',
    });

    return (
      <TableCell className={className} key={`cell-${time}`}>
        <Typography color="inherit">
          {name}
          {' '}
          (
          <time dateTime={startedAt.toISOString()} title={title}>
            <FormattedTime value={startedAt} />
          </time>
          )
        </Typography>
        {this.isNow() && (
          <LinearProgress className={classes.progress} value={((now - time) / EIGHT_HOURS) * 100} variant="determinate" />
        )}
      </TableCell>
    );
  }
}
