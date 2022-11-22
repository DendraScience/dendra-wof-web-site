<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h2 mb-6">Data Services</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          :prepend-inner-icon="mdiMagnify"
          clearable
          hide-details
          label="Search"
          single-line
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col> Services: {{ foundOrganizations.length }} </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-list>
          <v-list-item
            v-for="organization in foundOrganizations"
            :key="organization._id"
            :href="'/' + getOrg(organization)"
            :title="organization.name"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { mdiMagnify } from '@mdi/js'

const search = ref('')

const props = defineProps({
  organizations: {
    type: Array,
    default: () => []
  }
})

const foundOrganizations = computed(() =>
  props.organizations.filter(
    ({ name }) =>
      !search.value || name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function getOrg(organization) {
  const wsdl = organization.general_config && organization.general_config.wsdl
  if (wsdl) {
    const url = new URL(wsdl)
    if (url.pathname) return url.pathname.split('/')[1]
  }
}
</script>
