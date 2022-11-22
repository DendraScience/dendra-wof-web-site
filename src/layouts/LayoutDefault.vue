<template>
  <v-app>
    <v-app-bar app color="grey-darken-4">
      <v-container>
        <v-row>
          <v-col>
            <v-app-bar-title> WaterOneFlow </v-app-bar-title>
          </v-col>
          <v-col cols="auto">
            <v-btn v-if="pageContext.urlPathname !== '/'" href="/" size="small"
              >Back to Services</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { usePageContext } from '#root/renderer/usePageContext'
const pageContext = usePageContext()
</script>
