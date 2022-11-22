import qs from 'qs'

export class DenAPIError extends Error {
  constructor(props, ...params) {
    super(...params)

    Object.assign(this, { name: 'DenAPIError' }, props)
  }
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json'
  }
}

export class DenAPI {
  constructor(config) {
    Object.assign(this, { url: import.meta.env.VITE_WEB_API_URL }, config)
  }

  async _fetch(resource, init) {
    const resp = await fetch(resource, init)

    return resp
  }

  async _get(input, options) {
    const init = Object.assign({}, options, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: defaultHeaders()
    })

    // Remove any custom settings
    delete init.searchParams

    let resource = this.url + input

    if (options && options.searchParams)
      resource = resource + '?' + qs.stringify(options.searchParams)

    const resp = await this._fetch(resource, init)
    if (!resp.ok)
      throw new DenAPIError(
        {
          statusCode: resp.status
        },
        'Cannot get resource.'
      )

    const respData = await resp.json()
    return respData
  }

  async findMany(entity, searchParams) {
    const respData = await this._get(`/${entity}`, { searchParams })
    return (respData && respData.data) || []
  }

  findOne(entity, id, searchParams) {
    return this._get(`/${entity}/${id}`, { searchParams })
  }
}

export const denAPI = new DenAPI()
