import fetchRepository from '../fetchRepository'
import nock from 'nock'
import successfulResponse from './successfulResponse.json'
import languageResponse from './languagesResponse.json'

describe(`fetchRepository`, () => {
  const host = 'https://api.github.com'
  const repo = 'learn.github.com'

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
    const scope = nock(host).get(`/repos/github/${repo}`).reply(404)

    const result = await fetchRepository(repo)

    expect(result).toEqual({})

    scope.done()
  })

  it(`returns an object with data but no languages`, async () => {
    const scope = nock(host)
      .get(`/repos/github/${repo}`)
      .reply(200, successfulResponse)
      .get(`/repos/github/${repo}/languages`)
      .reply(200, {})

    const result = await fetchRepository(repo)

    expect(result).toEqual({
      id: successfulResponse.id,
      name: successfulResponse.name,
      description: successfulResponse.description,
      languages: [],
      open_issues_count: successfulResponse.open_issues_count,
      html_url: successfulResponse.html_url,
      homepage: successfulResponse.homepage,
      avatar_url: successfulResponse.owner.avatar_url,
    })

    scope.done()
  })

  it(`returns an object with data but no languages`, async () => {
    const scope = nock(host)
      .get(`/repos/github/${repo}`)
      .reply(200, successfulResponse)
      .get(`/repos/github/${repo}/languages`)
      .reply(200, {})

    const result = await fetchRepository(repo)

    expect(result).toEqual({
      id: successfulResponse.id,
      name: successfulResponse.name,
      description: successfulResponse.description,
      languages: [],
      open_issues_count: successfulResponse.open_issues_count,
      html_url: successfulResponse.html_url,
      homepage: successfulResponse.homepage,
      avatar_url: successfulResponse.owner.avatar_url,
    })

    scope.done()
  })

  it(`returns an object with data and languages`, async () => {
    const scope = nock(host)
      .get(`/repos/github/${repo}`)
      .reply(200, successfulResponse)
      .get(`/repos/github/${repo}/languages`)
      .reply(200, languageResponse)

    const result = await fetchRepository(repo)

    expect(result).toEqual({
      id: successfulResponse.id,
      name: successfulResponse.name,
      description: successfulResponse.description,
      languages: ['CSS', 'HTML', 'JavaScript', 'Ruby', 'Shell'],
      open_issues_count: successfulResponse.open_issues_count,
      html_url: successfulResponse.html_url,
      homepage: successfulResponse.homepage,
      avatar_url: successfulResponse.owner.avatar_url,
    })

    scope.done()
  })
})
