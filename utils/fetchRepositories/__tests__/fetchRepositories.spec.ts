import fetchRepositories from '../fetchRepositories'
import nock from 'nock'
import successfulResponse from './successfulResponse.json'

describe(`fetchRepositories`, () => {
  const host = 'https://api.github.com'
  const url = '/orgs/github/repos'

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
    const scope = nock(host).get(url).reply(404)

    const result = await fetchRepositories()

    expect(result).toEqual({
      repos: [],
    })

    scope.done()
  })

  it(`returns an object with data`, async () => {
    const scope = nock(host).get(url).reply(200, successfulResponse)

    const result = await fetchRepositories()

    expect(result).toEqual({
      repos: [
        {
          id: 3222,
          name: 'media',
          description:
            'Media files for use in your GitHub integration projects',
          language: null,
          languages_url: 'https://api.github.com/repos/github/media/languages',
          open_issues_count: 0,
        },
        {
          id: 15929,
          name: 'albino',
          description: 'Ruby wrapper for the Pygments syntax highlighter.',
          language: 'Ruby',
          languages_url: 'https://api.github.com/repos/github/albino/languages',
          open_issues_count: 0,
        },
      ],
    })

    scope.done()
  })
})
