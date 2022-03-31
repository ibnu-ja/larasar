<script lang="ts" setup>
import { Head, Link as InertiaLink, useForm, usePage } from '@inertiajs/inertia-vue3'
import { computed, inject, ref } from 'vue'
import { Jetstream } from '@/types/inertia-props'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { useWidth } from '@/composables/useWidth'
const route: any = inject('route')
const showP = ref(false)
const showCP = ref(false)
const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false
})
const jetstream = computed(() => usePage().props.value.jetstream as Jetstream)
function submit () {
  form.post(route('register'), {
    onFinish: () => form.reset('password', 'password_confirmation')
  })
}

const { width } = useWidth()
</script>

<template>
  <Head title="Register" />

  <web-layout>
    <q-page
      :padding="$q.screen.gt.sm"
      class="flex flex-center"
    >
      <q-card
        :bordered="$q.screen.lt.sm"
        :flat="$q.screen.lt.sm"
        :square="$q.screen.lt.sm"
        class="q-mt-xl"
        :style="'width: ' + width"
      >
        <q-form @submit.prevent="submit">
          <q-card-section>
            <inertia-link
              href="/"
              class="nostyle cursor-pointer"
            >
              <q-avatar
                size="100px"
                color="white"
                class="absolute-center shadow-10"
              >
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z"
                    fill="#6875F5"
                  />
                  <path
                    d="M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z"
                    fill="#6875F5"
                  />
                </svg>
              </q-avatar>
            </inertia-link>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Register
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-input
              v-model="form.email"
              :error="!!form.errors.email"
              :error-message="form.errors.email"
              outlined
              label="Email"
              lazy-rules
            />

            <q-input
              v-model="form.password"
              :error="!!form.errors.password"
              :error-message="form.errors.password"
              :type="showP? 'password' : 'text'"
              outlined
              label="Password"
              lazy-rules
            >
              <template #append>
                <q-icon
                  :name="showP ? 'mdi-eye' : 'mdi-eye-off'"
                  class="cursor-pointer"
                  @click="showP = !showP"
                />
              </template>
            </q-input>

            <q-input
              v-model="form.password_confirmation"
              :error="!!form.errors.password_confirmation"
              :error-message="form.errors.password_confirmation"
              :type="showCP? 'password' : 'text'"
              outlined
              label="Password confirmation"
              lazy-rules
            >
              <template #append>
                <q-icon
                  :name="showCP ? 'mdi-eye' : 'mdi-eye-off'"
                  class="cursor-pointer"
                  @click="showCP = !showCP"
                />
              </template>
            </q-input>

            <q-field
              v-if="jetstream.hasTermsAndPrivacyPolicyFeature"
              borderless
              :error="!!form.errors.terms"
              :error-message="form.errors.terms"
              dense
            >
              <template #control>
                <q-checkbox
                  v-model="form.terms"
                  :color="!!form.errors.terms ? 'negative' : 'primary'"
                >
                  <span :class="{'text-negative': !!form.errors.terms }">
                    I agree to the <a
                      href="/terms"
                      target="_blank"
                      @click.stop
                    >terms of service</a>
                  </span>
                </q-checkbox>
              </template>
            </q-field>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <inertia-link
              :href="route('login')"
              class="q-mx-md"
            >
              Already registered?
            </inertia-link>
            <q-btn
              color="primary"
              flat
              type="submit"
            >
              Login
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-page>
  </web-layout>
</template>
