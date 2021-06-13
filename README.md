# Setup Instructions

* Clone the repository to your local machine
* Run `yarn install`
* Run `yarn dev` to start the development instance
* Go to http://localhost:3000 to view the development instance
* Run `yarn test` to run tests

# Requirements

* Display 30 public repositories
* Show name, description, languages, and issues
* Click the repository to see more information (avatar_url, url, homepage url)

# Nice to Have / Future

* I'd split the repository details page into more components so they're more easily testable, this was due to time
* Add Storybook to allow easier development of individual components
* Add more testing

# Future features

* Search for a repository with debounced queries
* Pagination
* Sort repostories

# Notes

* I'd get more information from product to outline exactly what they wanted
* I chose Semantic UI to put together the page in the interests of effiency given the timeframe
* I used fetch rather than octokit - the suggested implementation for Github - for the sake of speed within the timeframe
* I've chosen a long revalidation period - once an hour - as the data doesn't change often