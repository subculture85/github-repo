import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import fetchRepositories, {
  FetchRepositories,
} from '../utils/fetchRepositories'
import RepositoryList from '../components/RepositoryList'
import { Container } from 'semantic-ui-react'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
): JSX.Element {
  return (
    <div>
      <Head>
        <title>Github Repositories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main">
        <RepositoryList repos={props.repos} />
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps<FetchRepositories> = async () => {
  const props = await fetchRepositories()

  return {
    props,
    revalidate: 3600,
  }
}
