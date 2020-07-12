import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  startedAt: PropTypes.string.isRequired,
});
