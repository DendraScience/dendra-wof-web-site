import { RenderErrorPage } from 'vite-plugin-ssr'
import { denAPI } from '#root/lib/den-api'
import { slugify } from '#root/lib/utils'

export const doNotPrerender = true

export { onBeforeRender }

// Dynamic document props
export function getDocumentProps({ organization }) {
  return {
    title: organization.name
  }
}

async function onBeforeRender(pageContext) {
  const { org } = pageContext.routeParams

  // Fetch organization
  const organizations = await denAPI.findMany('organizations', {
    slug: slugify(org),
    $limit: 1
  })
  if (!organizations.length)
    throw RenderErrorPage({
      pageContext: {
        is404: true,
        errorInfo: 'Organization service page not found.'
      }
    })

  let organization = organizations[0]

  const pageProps = {
    org,
    organization
  }
  return {
    pageContext: {
      pageProps
    }
  }
}
