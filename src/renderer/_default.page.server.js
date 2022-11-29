import { renderToNodeStream } from '@vue/server-renderer'
import { escapeInject } from 'vite-plugin-ssr'
import { createApp } from './app'
import { logger } from '#root/lib/log'
import appleTouchIcon57 from '#root/assets/icons/apple-touch-icon-57x57.png'
import appleTouchIcon114 from '#root/assets/icons/apple-touch-icon-114x114.png'
import appleTouchIcon72 from '#root/assets/icons/apple-touch-icon-72x72.png'
import appleTouchIcon144 from '#root/assets/icons/apple-touch-icon-144x144.png'
import appleTouchIcon60 from '#root/assets/icons/apple-touch-icon-60x60.png'
import appleTouchIcon120 from '#root/assets/icons/apple-touch-icon-120x120.png'
import appleTouchIcon76 from '#root/assets/icons/apple-touch-icon-76x76.png'
import appleTouchIcon152 from '#root/assets/icons/apple-touch-icon-152x152.png'
import favIcon196 from '#root/assets/icons/favicon-196x196.png'
import favIcon96 from '#root/assets/icons/favicon-96x96.png'
import favIcon32 from '#root/assets/icons/favicon-32x32.png'
import favIcon16 from '#root/assets/icons/favicon-16x16.png'
import favIcon128 from '#root/assets/icons/favicon-128.png'
import favIcon from '#root/assets/icons/favicon.ico'

export { render }

// SEE: https://vite-plugin-ssr.com/data-fetching
export const passToClient = [
  'clientEnv',
  'errorInfo',
  'pageProps',
  'title',
  'titleFull',
  'urlPathname'
]

async function render(pageContext) {
  const app = createApp(pageContext)
  const stream = renderToNodeStream(app)

  // Construct head elements using documentProps and getDocumentProps
  // SEE: https://vite-plugin-ssr.com/head
  const { documentProps, getDocumentProps } = pageContext.exports
  const { pageProps, urlPathname } = pageContext
  const documentPropsMerged = Object.assign(
    {
      title: import.meta.env.VITE_TITLE,
      titleTemplate: import.meta.env.VITE_TITLE_TEMPLATE
    },
    documentProps,
    typeof getDocumentProps === 'function'
      ? getDocumentProps(pageProps)
      : undefined
  )

  // Resolve title and description
  const title = documentPropsMerged.title || 'Hello'
  const titleFull = (documentPropsMerged.titleTemplate || '%s').replace(
    '%s',
    title
  )
  const descriptionTag = !documentPropsMerged.description
    ? ''
    : escapeInject`<meta name="description" content="${documentPropsMerged.description}" />`

  logger.info({ url: urlPathname }, 'Rendering document')

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
        <link rel="preload" as="style" onload="this.rel='stylesheet'" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap">
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="${appleTouchIcon57}" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="${appleTouchIcon114}" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="${appleTouchIcon72}" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="${appleTouchIcon144}" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="${appleTouchIcon60}" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="${appleTouchIcon120}" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="${appleTouchIcon76}" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="${appleTouchIcon152}" />
        <link rel="icon" type="image/png" href="${favIcon196}" sizes="196x196" />
        <link rel="icon" type="image/png" href="${favIcon96}" sizes="96x96" />
        <link rel="icon" type="image/png" href="${favIcon32}" sizes="32x32" />
        <link rel="icon" type="image/png" href="${favIcon16}" sizes="16x16" />
        <link rel="icon" type="image/png" href="${favIcon128}" sizes="128x128" />
        <link rel="icon" type="image/x-icon" href="${favIcon}" />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${titleFull}</title>
        ${descriptionTag}
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      title,
      titleFull
    }
  }
}
