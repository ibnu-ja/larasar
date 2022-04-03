
<script lang="ts" setup>
import { inject, ref } from 'vue'
import AppFormSection from '@/views/components/AppFormSection.vue'
import { useForm } from '@inertiajs/inertia-vue3'

const route: any = inject('route')
const showCurrentPassword = ref(true)
const showPassword = ref(true)
const showPasswordConfirmation = ref(true)

const password = ref<HTMLInputElement>()
const currentPassword = ref<HTMLInputElement>()

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: ''
})

function updatePassword () {
  form.put(route('user-password.update'), {
    errorBag: 'updatePassword',
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation')
        password.value?.focus()
      }
      if (form.errors.current_password) {
        form.reset('current_password')
        currentPassword.value?.focus()
      }
    }
  })
}
// export default defineComponent({
//     components: {
//         JetActionMessage,
//         JetButton,
//         JetFormSection,
//         JetInput,
//         JetInputError,
//         JetLabel,
//     },

//     data() {
//         return {
//             form: this.$inertia.form({
//                 current_password: '',
//                 password: '',
//                 password_confirmation: '',
//             }),
//         }
//     },

//     methods: {
//         updatePassword() {
//             this.form.put(route('user-password.update'), {
//                 errorBag: 'updatePassword',
//                 preserveScroll: true,
//                 onSuccess: () => this.form.reset(),
//                 onError: () => {
//                     if (this.form.errors.password) {
//                         this.form.reset('password', 'password_confirmation')
//                         this.$refs.password.focus()
//                     }

//                     if (this.form.errors.current_password) {
//                         this.form.reset('current_password')
//                         this.$refs.current_password.focus()
//                     }
//                 }
//             })
//         },
//     },
// })
</script>

<template>
  <app-form-section @submitted="updatePassword">
    <template #title>
      Update Password
    </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <q-input
        ref="currentPassword"
        v-model="form.current_password"
        label="Current Password"
        outlined
        autocomplete="password"
        :error="!!form.errors.current_password"
        :error-message="form.errors.current_password"
        :type="showCurrentPassword? 'password' : 'text'"
      >
        <template #append>
          <q-icon
            :name="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="cursor-pointer"
            @click="showCurrentPassword = !showCurrentPassword"
          />
        </template>
      </q-input>

      <q-input
        ref="currentPassword"
        v-model="form.password"
        label="New Password"
        outlined
        autocomplete="new-password"
        :error="!!form.errors.password"
        :error-message="form.errors.password"
        :type="showPassword? 'password' : 'text'"
      >
        <template #append>
          <q-icon
            :name="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <q-input
        v-model="form.password_confirmation"
        label="Confirm Password"
        outlined
        autocomplete="new-password"
        :error="!!form.errors.password_confirmation"
        :error-message="form.errors.password_confirmation"
        :type="showPasswordConfirmation? 'password' : 'text'"
      >
        <template #append>
          <q-icon
            :name="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            class="cursor-pointer"
            @click="showPasswordConfirmation = !showPasswordConfirmation"
          />
        </template>
      </q-input>

      <!-- <div class="col-span-6 sm:col-span-4">
        <jet-label
          for="current_password"
          value="Current Password"
        />
        <jet-input
          id="current_password"
          ref="current_password"
          v-model="form.current_password"
          type="password"
          class="mt-1 block w-full"
          autocomplete="current-password"
        />
        <jet-input-error
          :message="form.errors.current_password"
          class="mt-2"
        />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label
          for="password"
          value="New Password"
        />
        <jet-input
          id="password"
          ref="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          autocomplete="new-password"
        />
        <jet-input-error
          :message="form.errors.password"
          class="mt-2"
        />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label
          for="password_confirmation"
          value="Confirm Password"
        />
        <jet-input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="mt-1 block w-full"
          autocomplete="new-password"
        />
        <jet-input-error
          :message="form.errors.password_confirmation"
          class="mt-2"
        />
      </div> -->
    </template>

    <template #actions>
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
      >
        <div
          v-show="form.recentlySuccessful"
        >
          Saved.
        </div>
      </transition>

      <q-space />

      <q-btn
        flat
        color="primary"
        :disabled="form.processing"
        type="submit"
      >
        Save
      </q-btn>
    </template>
  </app-form-section>
</template>
