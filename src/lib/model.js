export function getOperations() {
  const data = [
    {
      name: 'GetSiteObject',
      description: `Given a site number, this method returns the site's metadata.
      Send the site code in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetSiteInfo xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <site>string</site>
      <authToken></authToken>
    </GetSiteInfo>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetSiteInfoMultpleObject',
      description: `Given a site number, this method returns the site's metadata.
      Send the site code in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetSiteInfoMultpleObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <site>
        <string>string</string>
        <string>string</string>
      </site>
      <authToken></authToken>
    </GetSiteInfoMultpleObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetSiteInfoObject',
      description: `Given a site number, this method returns the site's metadata.
      Send the site code in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetSiteInfoObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <site>string</site>
      <authToken></authToken>
    </GetSiteInfoObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetSites',
      description: `Given an array of site numbers, this method returns the site metadata for each one.
      Send the array of site codes in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetSites xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <site>
        <string>string</string>
        <string>string</string>
      </site>
      <authToken></authToken>
    </GetSites>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetSitesByBoxObject',
      description: `Given a site number, this method returns the site's metadata.
      Send the site code in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetSitesByBoxObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <west>float</west>
      <south>float</south>
      <east>float</east>
      <north>float</north>
      <IncludeSeries>boolean</IncludeSeries>
      <authToken></authToken>
    </GetSitesByBoxObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetSitesObject',
      description: `Given an array of site numbers, this method returns the site metadata for each one.
      Send the array of site codes in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetSitesObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <site>
        <string>string</string>
        <string>string</string>
      </site>
      <authToken></authToken>
    </GetSitesObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetValues',
      description: `Given a site number, a variable, a start date, and an end date, this method returns a time series.
      Pass in the sitecode and variable in this format: 'NetworkName:SiteCode' and 'NetworkName:Variable'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetValues xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <location>string</location>
      <variable>string</variable>
      <startDate>string</startDate>
      <endDate>string</endDate>
      <authToken></authToken>
    </GetValues>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetValuesForASiteObject',
      description: `Given a site number, this method returns the site's metadata.
      Send the site code in this format: 'NetworkName:SiteCode'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetValuesForASiteObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <site>string</site>
      <startDate>string</startDate>
      <endDate>string</endDate>
      <authToken></authToken>
    </GetValuesForASiteObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetValuesObject',
      description: `Given a site number, a variable, a start date, and an end date, this method returns a time series.
      Pass in the sitecode and variable in this format: 'NetworkName:SiteCode' and 'NetworkName:Variable'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetValuesObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <location>string</location>
      <variable>string</variable>
      <startDate>string</startDate>
      <endDate>string</endDate>
      <authToken></authToken>
    </GetValuesObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetVariableInfo',
      description: `Given a variable code, this method returns the variable's name.
      Pass in the variable in this format: 'NetworkName:Variable'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetVariableInfo xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <variable>string</variable>
      <authToken></authToken>
    </GetVariableInfo>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetVariableInfoObject',
      description: `Given a variable code, this method returns the variable's siteName.
      Pass in the variable in this format: 'NetworkName:Variable'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetVariableInfoObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <variable>string</variable>
      <authToken></authToken>
    </GetVariableInfoObject>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetVariables',
      description: `Given a variable code, this method returns the variable's name.
      Pass in the variable in this format: 'NetworkName:Variable'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetVariables xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <authToken></authToken>
    </GetVariables>
  </soap:Body>
</soap:Envelope>`
    },

    {
      name: 'GetVariablesObject',
      description: `Given a variable code, this method returns the variable's siteName.
      Pass in the variable in this format: 'NetworkName:Variable'.`,
      method: 'POST',
      template: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetVariablesObject xmlns="http://www.cuahsi.org/his/1.1/ws/">
      <authToken></authToken>
    </GetVariablesObject>
  </soap:Body>
</soap:Envelope>`
    }
  ]

  return data.map(item => ({
    body: `${item.template}`,
    bytes: null,
    cancelled: false,
    error: null,
    formatting: false,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `http://www.cuahsi.org/his/1.1/ws/${item.name}`
    },
    reader: null,
    response: null,
    running: false,
    started: null,
    time: null,
    ...item
  }))
}
