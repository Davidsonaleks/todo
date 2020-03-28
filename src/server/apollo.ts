import { onError } from "apollo-link-error"

export const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(`
        [GraphQL error]: Message: ${message},
        Location: ${JSON.stringify(locations)},
        Path: ${path},
        Extensions: ${JSON.stringify(extensions)}`)
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})
