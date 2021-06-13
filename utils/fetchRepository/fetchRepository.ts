import fetchAllLanguages from '../fetchAllLanguages'

export interface RepositoryDetails {
  id?: number
  name?: string
  description?: string
  languages?: string[]
  open_issues_count?: number
  html_url?: string
  homepage?: string
  avatar_url?: string
}

function getRepoString(repositoryNameParam: string | string[]): string {
  if (typeof repositoryNameParam === 'string') return repositoryNameParam
  if (repositoryNameParam.length > 0) return repositoryNameParam[0]
  return ''
}

async function fetchRepository(
  repositoryName: string | string[]
): Promise<RepositoryDetails> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/github/${getRepoString(repositoryName)}`
    )

    if (response.ok) {
      const data = await response.json()
      const languages = await fetchAllLanguages(data.languages_url)

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        languages,
        open_issues_count: data.open_issues_count,
        html_url: data.html_url,
        homepage: data.homepage,
        avatar_url: data.owner.avatar_url,
      }
    }
  } catch (e) {
    // Log to Sentry or similar
  }

  return {}
}

export default fetchRepository
