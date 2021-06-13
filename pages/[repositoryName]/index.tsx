import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import fetchRepository, { RepositoryDetails } from '../../utils/fetchRepository'
import { Container, Header, Image, Grid, List, Button } from 'semantic-ui-react'
import Link from 'next/link'

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
        <Header as="h2" icon textAlign="center">
          <Image
            centered
            size="large"
            circular
            src={props.avatar_url ?? '/vercel.svg'}
          />
          <Header.Content>{props.name}</Header.Content>
        </Header>
        <Grid celled>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header sub>Description</Header>
              {props.description}
            </Grid.Column>
            <Grid.Column>
              <Header sub>Languages</Header>
              <List horizontal>
                {props.languages.map((language) => (
                  <List.Item key={`language-${language}`}>{language}</List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header sub>Homepage</Header>
              {props.homepage}
            </Grid.Column>
            <Grid.Column>
              <Header sub>Repository</Header>
              {props.html_url}
            </Grid.Column>
            <Grid.Column>
              <Header sub>Open Iusses</Header>
              {props.open_issues_count}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Link href="/" passHref>
          <Button>Back</Button>
        </Link>
      </Container>
    </div>
  )
}

export async function getStaticPaths(): Promise<{
  paths: any[]
  fallback: string
}> {
  // TODO for the future: Pre-fetch paths
  const paths = []

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<RepositoryDetails> = async ({
  params,
}) => {
  const { repositoryName } = params
  const props = await fetchRepository(repositoryName)

  return {
    props,
    revalidate: 3600,
  }
}
