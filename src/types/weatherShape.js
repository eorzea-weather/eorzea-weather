import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string,
  startedAt: PropTypes.string.isRequired,
});
