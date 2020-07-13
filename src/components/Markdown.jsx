import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React from 'react';

const A = ({ children, ...props }) => (
  <Link
    rel="noopener noreferrer"
    target="_blank"
    {...props}
  >
    {children}
  </Link>
);

A.propTypes = {
  children: PropTypes.node.isRequired,
};

const H1 = ({ children }) => (
  <Typography
    component="h1"
    gutterBottom
    variant="h4"
  >
    {children}
  </Typography>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

const H2 = ({ children }) => (
  <Typography
    component="h2"
    gutterBottom
    variant="h5"
  >
    {children}
  </Typography>
);

H2.propTypes = {
  children: PropTypes.node.isRequired,
};

const P = ({ children }) => (
  <Typography paragraph>{children}</Typography>
);

P.propTypes = {
  children: PropTypes.node.isRequired,
};

const components = {
  a: A,
  h1: H1,
  h2: H2,
  p: P,
};

const useStyles = makeStyles(
  (theme) => createStyles({
    root: {
      paddingBottom: theme.spacing(10),
      paddingTop: theme.spacing(10),
    },
  }),
);

const Markdown = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </Container>
  );
};

Markdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markdown;
