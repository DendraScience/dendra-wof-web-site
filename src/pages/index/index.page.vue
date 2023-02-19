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
          hint="Enter a db name, instance, network name, organization name, slug or _id."
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

const foundOrganizations = computed(() => {
  const value = search.value && search.value.toLowerCase().trim()
  return props.organizations.filter(
    ({ _id, external_refs, general_config, name, slug }) => {
      return (
        !value ||
        _id === value ||
        name.toLowerCase().includes(value) ||
        slug.toLowerCase().startsWith(value) ||
        (general_config &&
          general_config.db_name &&
          general_config.db_name.toLowerCase().includes(value)) ||
        (general_config && general_config.db_instance === value) ||
        (external_refs &&
          external_refs.find(
            ref =>
              ref.type === 'his.odm.service.NetworkName' &&
              ref.identifier.toLowerCase().includes(value)
          ))
      )
    }
  )
})

function getOrg(organization) {
  const wsdl = organization.general_config && organization.general_config.wsdl
  if (wsdl) {
    const url = new URL(wsdl)
    if (url.pathname) return url.pathname.split('/')[1]
  }
}
</script>
