import { getDenAPI } from '#root/lib/den-api'

export const doNotPrerender = true

export { onBeforeRender }

// Dynamic document props
export function getDocumentProps() {
  return {
    title: 'Data Services'
  }
}

async function onBeforeRender(pageContext) {
  // Fetch organizations
  const denAPI = getDenAPI(pageContext)
  const organizations = await denAPI.findMany('organizations', {
    is_enabled: true,
    is_hidden: false,
    $limit: 2000,
    $sort: { name: 1 }
  })

  const pageProps = {
    organizations
  }
  return {
    pageContext: {
      pageProps
    }
  }
}
