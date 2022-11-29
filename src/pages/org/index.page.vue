<template>
  <div>
    <v-sheet color="cyan-lighten-4">
      <v-container>
        <v-row>
          <v-col>
            <h1 class="text-h4">
              {{ organization.name }}
              <v-btn
                :href="uiURL.toString()"
                :icon="mdiOpenInNew"
                size="small"
                variant="text"
                target="_blank"
              ></v-btn>
            </h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <span class="mr-2">Base URL:</span>
            <v-code tag="code">
              {{ baseURL.toString() }}
            </v-code>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-body-1">
            The following operations are supported. For a formal definition,
            please review the
            <a :href="baseURL.toString() + '?WSDL'" target="_blank"
              >Service Description</a
            >.
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-divider />

    <v-container>
      <v-row>
        <v-col>
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="op in operations" :key="op.name">
              <v-expansion-panel-title>
                <v-chip class="text-uppercase mr-2" color="teal" label>{{
                  op.method
                }}</v-chip>

                <v-badge
                  :model-value="op.started !== null"
                  color="blue"
                  dot
                  inline
                >
                  <span class="text-h6 mr-2">{{ op.name }}</span>
                </v-badge>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-row>
                  <v-col class="text-body-1"
                    ><span class="font-weight-bold">Description:</span>
                    {{ op.description }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-card variant="outlined">
                      <v-card-title> SOAP Request </v-card-title>
                      <v-container fluid>
                        <v-row>
                          <v-col>
                            <code>
                              <v-textarea
                                v-model="op.body"
                                auto-grow
                                bg-color="grey-darken-4"
                                color="white"
                                hide-details
                                variant="outlined"
                              ></v-textarea> </code
                          ></v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          :loading="op.running"
                          color="primary"
                          variant="tonal"
                          @click="submit(op)"
                          >Submit</v-btn
                        >
                        <v-btn :disabled="!op.running" @click="cancel(op)"
                          >Cancel</v-btn
                        >
                        <v-btn :disabled="op.running" @click="pasteTemplate(op)"
                          >Paste Template</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row v-if="op.started">
                  <v-col>
                    <v-card variant="outlined">
                      <v-card-title> SOAP Response </v-card-title>
                      <v-card-subtitle> </v-card-subtitle>
                      <v-container fluid>
                        <v-row>
                          <v-col>
                            <v-alert
                              :type="
                                op.running
                                  ? undefined
                                  : op.cancelled
                                  ? 'warning'
                                  : op.error
                                  ? 'error'
                                  : 'success'
                              "
                              dense
                            >
                              {{
                                op.running
                                  ? 'Running'
                                  : op.cancelled
                                  ? 'Cancelled'
                                  : op.error
                                  ? `Error: ${op.error.message}`
                                  : 'Finished'
                              }}{{
                                !op.error && op.started && op.time
                                  ? `, ${Number(
                                      (op.time - op.started) / 1000,
                                      2
                                    ).toFixed(2)} s`
                                  : ''
                              }}{{
                                !op.error && op.bytes
                                  ? `, ${op.bytes} bytes`
                                  : ''
                              }}
                            </v-alert>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <code>
                              <v-textarea
                                :model-value="op.response"
                                bg-color="grey-darken-4"
                                color="white"
                                hide-details
                                readonly
                                rows="30"
                                variant="outlined"
                              ></v-textarea> </code
                          ></v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          :disabled="op.formatting || op.running"
                          :loading="op.formatting"
                          @click="prettify(op)"
                          >Make Pretty</v-btn
                        >
                        <v-btn
                          :disabled="op.formatting || op.running"
                          @click="copy(op)"
                          >Copy</v-btn
                        >
                        <v-spacer />
                        <v-btn
                          :disabled="op.formatting || op.running"
                          @click="close(op)"
                          >Close</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { usePageContext } from '#root/renderer/usePageContext'
import { getOperations } from '#root/lib/model'
import { mdiOpenInNew } from '@mdi/js'
import XmlBeautify from 'xml-beautify'

const pageContext = usePageContext()

const operations = reactive(getOperations())

const props = defineProps({
  org: {
    type: String,
    required: true
  },
  organization: {
    type: Object,
    default: () => {}
  }
})

const baseURL = computed(
  () =>
    new URL(
      props.org + '/' + import.meta.env.VITE_WOF_SERVICE,
      (pageContext.clientEnv && pageContext.clientEnv.WOF_BASE_URL) ||
        import.meta.env.VITE_WOF_BASE_URL
    )
)

const uiURL = computed(
  () =>
    new URL(
      props.organization.slug ? 'orgs/' + props.organization.slug : '',
      (pageContext.clientEnv && pageContext.clientEnv.WEB_UI_URL) ||
        import.meta.env.VITE_WEB_UI_URL
    )
)

async function cancel(op) {
  op.cancelled = true
  return op.reader.cancel()
}

function close(op) {
  op.response = null
  op.started = null
}

function copy(op) {
  if (navigator && navigator.clipboard)
    navigator.clipboard.writeText(op.response)
}

function pasteTemplate(op) {
  op.body = `${op.template}`
}

function prettify(op) {
  op.formatting = true

  setTimeout(() => {
    try {
      op.response = new XmlBeautify().beautify(op.response)
    } finally {
      op.formatting = false
    }
  }, 500)
}

async function submit(op) {
  const decoder = new TextDecoder()
  const resource = baseURL.value.toString()
  const { body, headers, method } = op

  op.bytes = 0
  op.cancelled = false
  op.error = null
  op.response = ''
  op.running = true
  op.started = new Date()
  op.time = new Date()

  try {
    const response = await fetch(resource, { body, headers, method })
    const reader = (op.reader = response.body.getReader())

    let done
    let value

    while (({ done, value } = await reader.read()) && !done) {
      op.bytes += value.byteLength
      op.response = op.response + decoder.decode(value, { stream: true })
      op.time = new Date()
    }
  } catch (err) {
    op.error = err
  } finally {
    op.reader = null
    op.running = false
    op.time = new Date()
  }
}
</script>
