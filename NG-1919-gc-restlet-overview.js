var details = {
  ticket: 'NG-1919',
  link: 'https://2ndswing.atlassian.net/browse/NG-1919',
  team: 'Connor Flaherty for questions with Gift Certificates',
  description: `
        Input one of:
            - ns internal id for customer
            - keycloak id/realm for customer (query the keycloak id field)

        Output JSON array of objects:
            - ns internal id
            - type (gc or sc)
            - name/code of the thing (SC code, or GC number)
            - current balance
            - if easy: last transaction date
    `,
  testingCriteria: `
    - restlet will return a json object
    - restlet will return an array of json objects
    - restlet will return json objects with data from NS
  `,
  notes: `
        there are gift certificates (24k) and gift certificat items (3)
    `,
  giftCertificateTypes: {
    '3 types': [
      '2nd Swing Gift Certificate',
      'Store Credit Gift Certificate',
      'Store Credit Tax-Adj Gift Certificate'
    ],
      search: 'TJ: NG1919 Gift Certificate Item: Results',
    },
    searchProcedure: `
        1. search for invoices with customer id + gift card (do we want to get purchaser or receiver?)
        2. from the invoices, get the last transaction: order the gift cards invoices by date
        3. get gift cert number to determine the details
  `,
    improvements: `
        1. add fields to gift card (purchaser, assignee, transactions (already on it), last transaction )
        2. use UE script to invoices to fill fields
        3. as search is being performed for gift certificates, add missing data to gift certs
    `,
    process: `
    goal: restles will take in a customer id and return gift certificate info
    how to get gift card info.
    -- current --
    1) do a search on invoices 
        - filters: ['customer', IS, customerId] and [ 'giftCertificateField being used']
        - columns: [invoice.customer, giftCertificate.id, giftCerticate.type, giftCerticate.balance]
    `,
    assistance: `
    1) clarification on gift certificates
        - record type is gift certicates
        - they aren't assigned to anyone
        - become active once they are on an invoice
        - could in theory be used (legally) by multiple people
    2) how to add fields to gift certificates
    `
}
