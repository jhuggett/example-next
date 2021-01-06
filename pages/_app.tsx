import React from "react";
import { TinaProvider, TinaCMS } from "tinacms";
import { TinacmsForestryProvider } from "@forestryio/client";
import createClient from '../components/client'

function App({ Component, pageProps }) {

  return (<TinacmsForestryProvider
    onLogin={(token: string) => {
      const headers = new Headers()

      //TODO - the token should could as a param from onLogin
      headers.append('Authorization', 'Bearer ' + token)
      fetch('/api/preview', {
        method: 'POST',
        headers: headers,
      }).then(() => {
        window.location.href = '/'
      })
      return ''
    }}
    onLogout={() => {console.log('exit edit mode')}}
  ><Component {...pageProps} />
  </TinacmsForestryProvider>
  )
}


export default function _App(props: any) {

  const cms= new TinaCMS({
    apis: {
      forestry: createClient(true),
    },
    sidebar: props.pageProps.preview,
    enabled: props.pageProps.preview,
  })

  return <TinaProvider cms={cms}><App {...props}/></TinaProvider>
}