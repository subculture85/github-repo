import React, { FC } from 'react'
import { FetchRepositories } from '../../utils/fetchRepositories'
import RepositoryListing from '../RepositoryListing'
import { List } from 'semantic-ui-react'

const RepositoryList: FC<FetchRepositories> = ({ repos }) => {
  return (
    <List divided verticalAlign="middle" data-testid="repository-list">
      {repos.map((repo) => (
        <RepositoryListing {...repo} key={`list-${repo.name}`} />
      ))}
    </List>
  )
}

export default RepositoryList
