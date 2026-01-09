import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
             {/* 🔽 logo */}
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="shortcut icon" href="/favicon.ico" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

            <link rel="manifest" href="/site.webmanifest" />

            <meta name="apple-mobile-web-app-title" content="Daas Creation Kurtis" />
            <meta name="application-name" content="Daas Creation Kurtis" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
