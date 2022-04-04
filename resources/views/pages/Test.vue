<template>
  <dashboard-layout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>

    <q-page
      padding
      class
    >
      <q-btn
        label="Alert"
        color="primary"
        @click="alert = true"
      />
      <q-btn
        label="Confirm"
        color="primary"
        @click="confirm = true"
      />
      <q-btn
        label="Prompt"
        color="primary"
        @click="prompt = true"
      />

      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Alert
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              label="OK"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="confirm"
        persistent
      >
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="signal_wifi_off"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm">You are currently not connected to any network.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              label="Cancel"
              color="primary"
            />
            <q-btn
              v-close-popup
              flat
              label="Turn on Wifi"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="prompt"
        persistent
      >
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              Your address
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              v-model="address"
              dense
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-actions
            align="right"
            class="text-primary"
          >
            <q-btn
              v-close-popup
              flat
              label="Cancel"
            />
            <q-btn
              v-close-popup
              flat
              label="Add address"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </dashboard-layout>
</template>

<script lang="ts" setup>
import DashboardLayout from '@/views/layouts/DashboardLayout.vue'
import { ref } from 'vue'

const alert = ref(false)
const confirm = ref(false)
const prompt = ref(false)

const address = ref('')

</script>
