export interface Repository {
  id: number
  name: string
  description: string
  languages_url: string
  language: string
  open_issues_count: number
}

export interface FetchRepositories {
  repos: Repository[]
}

async function fetchRepositories(): Promise<FetchRepositories> {
  try {
    const a = await fetch('https://api.github.com/orgs/github/repos')
    const result = await a.json()
    const data: Repository[] = result.map((entry) => ({
      id: entry.id,
      name: entry.name,
      description: entry.description,
      language: entry.language,
      languages_url: entry.languages_url,
      open_issues_count: entry.open_issues_count,
    }))

    return {
      repos: data,
    }
  } catch (e) {
    // Log to Sentry or similar
    return {
      repos: [],
    }
  }
}

export default fetchRepositories
