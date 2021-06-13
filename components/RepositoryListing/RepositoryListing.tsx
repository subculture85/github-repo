import React, { FC } from 'react'
import { Repository } from '../../utils/fetchRepositories'
import Link from 'next/link'
import { Statistic, List } from 'semantic-ui-react'

const RepositoryListing: FC<Repository> = (repository) => {
  return (
    <Link href={`/${repository.name}`} passHref>
      <List.Item data-testid="repository-listing">
        <List.Content floated="right">
          <Statistic
            color={repository.open_issues_count > 0 ? 'red' : 'green'}
            floated="right"
          >
            <Statistic.Value>{repository.open_issues_count}</Statistic.Value>
            <Statistic.Label>Open Issues</Statistic.Label>
          </Statistic>
        </List.Content>
        <List.Content>
          <List.Header>{repository.name}</List.Header>
          <List.Item>{repository.language}</List.Item>
          <List.Description> {repository.description} </List.Description>
        </List.Content>
      </List.Item>
    </Link>
  )
}

export default RepositoryListing
