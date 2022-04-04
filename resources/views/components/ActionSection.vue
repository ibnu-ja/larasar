<script lang="ts" setup>
import { computed, useSlots } from 'vue'

const slots = useSlots()

const hasActions = computed(() => !!slots.actions)

</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-4">
      <h5>
        <slot name="title" />
      </h5>

      <p><slot name="description" /></p>
    </div>
    <div class="col-12 col-md-8">
      <div>
        <q-card class="q-pt-md">
          <!-- <q-card-section class="q-gutter-md q-pt-none">
            <h6 v-if="hasStatus">
              <slot name="status" />
            </h6> -->

          <slot name="content" />
          <!-- </q-card-section> -->

          <q-separator />

          <q-card-actions
            v-if="hasActions"
          >
            <slot name="actions" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
