import Container from '@material-ui/core/Container';
import Link, { LinkProps } from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MDXProvider } from '@mdx-js/react';
import React, { FC } from 'react';

const A: FC<LinkProps> = ({ children, ...props }) => (
  <Link rel="noopener noreferrer" target="_blank" {...props}>
    {children}
  </Link>
);

const H1: FC = ({ children }) => (
  <Typography component="h1" gutterBottom variant="h4">
    {children}
  </Typography>
);

const H2: FC = ({ children }) => (
  <Typography component="h2" gutterBottom variant="h5">
    {children}
  </Typography>
);

const P: FC = ({ children }) => <Typography paragraph>{children}</Typography>;

const components = {
  a: A,
  h1: H1,
  h2: H2,
  p: P,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(10),
      paddingTop: theme.spacing(10),
    },
  }),
);

const Markdown: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <MDXProvider components={components}>{children}</MDXProvider>
    </Container>
  );
};

export default Markdown;
