<template>
  <v-container>
    <v-row>
      <v-col>
        <div v-if="pageContext.is404">
          <h1>404 Page Not Found</h1>
          <p>
            {{ pageContext.errorInfo || 'This page could not be found.' }}
          </p>
        </div>
        <div v-else>
          <h1>500 Internal Server Error</h1>
          <p>Something went wrong.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePageContext } from '#root/renderer/usePageContext'
const pageContext = usePageContext()
</script>
