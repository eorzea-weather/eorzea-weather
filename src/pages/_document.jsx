import { ServerStyleSheets } from '@material-ui/core/styles';
import CleanCSS from 'clean-css';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import Helmet from 'react-helmet';

const cleanCSS = new CleanCSS();

const createTrackingCode = () => [
  'window.dataLayer = window.dataLayer || [];',
  'function gtag(){dataLayer.push(arguments);}',
  "gtag('js',new Date());",
].join('\n');

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const initialProps = await super.getInitialProps({
      ...ctx,
      renderPage: () => ctx.renderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      }),
    });
    const css = sheets.toString();

    return {
      ...initialProps,
      styles: [
        React.Children.toArray(initialProps.styles),
        <style
          id="jss-server-side"
          key="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: cleanCSS.minify(css).styles,
          }}
        />,
      ],
    };
  }

  render() {
    const helmet = Helmet.renderStatic();

    return (
      <Html lang="en" {...helmet.htmlAttributes.toComponent()}>
        <Head>
          <meta charSet="UTF-8" />
          <meta content="initial-scale=1,width=device-width" name="viewport" />
          {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID && (
            <script
              async
              data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID}
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
          )}
          {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
              {/* eslint-disable-next-line react/no-danger */}
              <script dangerouslySetInnerHTML={{ __html: createTrackingCode() }} />
            </>
          )}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
        </Head>
        <body {...helmet.bodyAttributes.toComponent()}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
