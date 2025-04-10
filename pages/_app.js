import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content="PayRadar – Smart Finance Calculators" />
        <link rel="icon" href="/favicon.ico" />
        <title>PayRadar | Finance Tools</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
