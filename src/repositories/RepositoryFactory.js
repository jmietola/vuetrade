import PostsRepository from './postsRepository'
import GitHubRepository from './gitHubRepository'
import AlpacaRepository from './alpacaRepository'

const repositories = {
  posts: PostsRepository,
  gitHub: GitHubRepository,
  alpaca: AlpacaRepository
  // other repositories ...
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
