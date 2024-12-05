import './assets/main.css'

import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

// Middleware para adicionar o token dinamicamente
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken')
  const tokenType = localStorage.getItem('tokenType')
  return {
    headers: {
      ...headers,
      Authorization: token ? `${tokenType} ${token}` : '', // Adiciona o token ao header Authorization
    },
  }
})

const baseUrl = import.meta.env.VITE_API_URL
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `${baseUrl}/graphql`,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Combina o middleware com o link HTTP
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
