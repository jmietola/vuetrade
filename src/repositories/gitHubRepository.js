import axios from 'axios'

const baseDomain = 'https://api.github.com'
const baseURL = `${baseDomain}/graphql`

const Repository = axios.create({
  baseURL,
  headers: { Authorization: `Bearer yourSuppaToken` }
})

export default {
  // Just FYI...
  getRepo (owner = 'octocat', name = 'Hello-World') {
    const query = `
      repository(owner:"${owner}", name:"${name}) {
        issues(last:20, states:CLOSED) {
          edges {
            node {
              title
              url
              labels(first:5) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `
    return Repository.post('', { query })
  }
  // ...
}
