import fetchAllLanguages from '../fetchAllLanguages'
import nock from 'nock'
import languageResponse from './languagesResponse.json'

describe(`fetchAllLanguages`, () => {
  const host = 'https://api.github.com'

  beforeAll(() => {
    if (!nock.isActive()) {
      nock.activate()
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    nock.restore()
  })

  it(`returns an empty object if the call returns 404`, async () => {
    const url = `/repos/github/a/languages`
    const scope = nock(host).get(url).reply(404)

    const result = await fetchAllLanguages(`${host}${url}`)

    expect(result).toEqual([])

    scope.done()
  })

  it(`returns an object with an array of languages`, async () => {
    const url = `/repos/github/b/languages`
    const scope = nock(host).get(url).reply(200, languageResponse)

    const result = await fetchAllLanguages(`${host}${url}`)

    expect(result).toEqual(['CSS', 'HTML', 'JavaScript', 'Ruby', 'Shell'])

    scope.done()
  })
})
