import React from 'react'
import RepositoryList from '../RepositoryList'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

describe('RepositoryList', () => {
  it(`returns a repository list element`, () => {
    const { getByTestId } = render(<RepositoryList repos={[]} />)

    expect(getByTestId(`repository-list`)).toBeInTheDocument()
  })

  it(`doesn't return a repository listing if the repos array is empty`, () => {
    const { queryByTestId } = render(<RepositoryList repos={[]} />)

    expect(queryByTestId(`repository-listing`)).not.toBeInTheDocument()
  })

  it(`returns a repository listing if the repos array is empty`, () => {
    const { queryAllByTestId } = render(
      <RepositoryList
        repos={[
          {
            id: 3222,
            name: 'media',
            description:
              'Media files for use in your GitHub integration projects',
            language: null,
            languages_url:
              'https://api.github.com/repos/github/media/languages',
            open_issues_count: 0,
          },
          {
            id: 15929,
            name: 'albino',
            description: 'Ruby wrapper for the Pygments syntax highlighter.',
            language: 'Ruby',
            languages_url:
              'https://api.github.com/repos/github/albino/languages',
            open_issues_count: 0,
          },
        ]}
      />
    )

    expect(queryAllByTestId(`repository-listing`)).toHaveLength(2)
  })
})
