import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(
  (theme) => createStyles({
    para: {
      marginTop: theme.spacing(1),
    },
    root: {
      minHeight: '80vh',
    },
    title: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Privacy = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.title} variant="h4">プライバシーポリシー</Typography>

      <Typography className={classes.para}>
        Eorzea Weather (以下 当サービス) における個人情報の取り扱いについて以下の通り定めています。
      </Typography>

      <Typography className={classes.title} variant="h5">取得する情報</Typography>

      <Typography className={classes.para}>
        当サービスでは
        <Link href="https://developers.google.com/analytics/?hl=ja" rel="noopener noreferrer" target="_blank">Google アナリティクス</Link>
        を利用してトラフィックデータの収集を行っています。収集されたトラフィックデータは匿名化され、あなたの個人が特定されることはありません。
      </Typography>
      <Typography className={classes.para}>
        Google アナリティクスの詳細は
        <Link href="https://marketingplatform.google.com/about/analytics/terms/jp/" rel="noopener noreferrer" target="_blank">Google アナリティクス利用規約</Link>
        を参照してください。
      </Typography>
      <Typography className={classes.para}>
        また当サービスでは
        <Link href="https://www.google.com/adsense/start/" rel="noopener noreferrer" target="_blank">Google AdSense</Link>
        を利用して広告の配信を行っています。Google AdSenseの運営者であるGoogleなどの広告配信事業者はあなたの行動に基いた広告配信のためにCookieを利用します。
      </Typography>
      <Typography className={classes.para}>
        CookieやJavaScriptを無効にすることによってこれらの情報の取得を拒否できます。
      </Typography>

      <Typography className={classes.title} variant="h5">問い合わせ先</Typography>

      <Typography className={classes.para}>
        メールアドレス:
        {' '}
        <Link href="mailto:flowercartelet@gmail.com">flowercartelet@gmail.com</Link>
      </Typography>
    </Container>
  );
};

export default Privacy;
