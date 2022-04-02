<script lang="ts" setup>
import { Jetstream, User } from '@/scripts/types/inertia-props'
import { Ref, computed, inject, ref } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import AppFormSection from '@/views/components/AppFormSection.vue'
import { Inertia } from '@inertiajs/inertia'
const route: any = inject('route')
const props = defineProps<{user: User}>()
const jetstream = computed(() => usePage().props.value.jetstream as Jetstream)
const form = useForm({
  _method: 'PUT',
  name: props.user?.name,
  email: props.user?.email,
  photo: null as File | null
})
const photoPreview: Ref = ref(null)
const photo: Ref<HTMLInputElement | null> = ref(null)
function updateProfileInformation () {
  if (photo.value) { form.photo = photo.value!.files![0] }
  form.post(route('user-profile-information.update'), {
    errorBag: 'updateProfileInformation',
    preserveScroll: true,
    onSuccess: () => (clearPhotoFileInput())
  })
}
function selectNewPhoto () {
  // console.log(e)
  photo.value!.click()
}
function updatePhotoPreview () {
  const file = photo.value!.files![0]
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target!.result
  }
  reader.readAsDataURL(file)
}
function deletePhoto () {
  Inertia.delete(route('current-user-photo.destroy'), {
    preserveScroll: true,
    onSuccess: () => (photoPreview.value = null)
  })
}
function clearPhotoFileInput () {
  photo.value = null
}
</script>

<template>
  <app-form-section @submitted="updateProfileInformation">
    <template #title>
      Profile Information
    </template>

    <template #description>
      Update your account's profile information and email address.
    </template>

    <template #form>
      <!-- Profile Photo -->
      <div
        v-if="jetstream.managesProfilePhotos"
        class="mb-4"
      >
        <!-- Profile Photo File Input -->
        <input
          ref="photo"
          type="file"
          class="d-none"
          @change="updatePhotoPreview"
        >
        <!-- New Profile Photo Preview -->
        <!-- TODO enable transition -->
        <v-avatar size="80">
          <v-img
            v-if="photoPreview"
            :transition="false"
            :src="photoPreview"
          />
          <v-img
            v-else
            :src="user.profile_photo_url"
            :alt="user.name"
          />
        </v-avatar>

        <v-btn
          class="ml-3 mt-2 mr-2"
          variant="outlined"
          color="info"
          @click.prevent="selectNewPhoto"
        >
          Select A New Photo
        </v-btn>
        <v-btn
          v-if="user.profile_photo_path"
          class="mt-2"
          variant="outlined"
          color="error"
          @click.prevent="deletePhoto"
        >
          Remove Photo
        </v-btn>
      </div>

      <!-- Name -->
      <q-input
        v-model="form.name"
        label="Name"
        type="text"
        outlined
        autocomplete="name"
        :error="!!form.errors.name"
        :error-message="form.errors.name"
      />

      <!-- Email -->
      <q-input
        v-model="form.email"
        label="Email"
        type="email"
        outlined
        :error="!!form.errors.email"
        :error-message="form.errors.email"
      />
    </template>

    <template #actions>
      <transition
        leave-active-class="transition ease-in duration-1000"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="form.recentlySuccessful"
          class="text-sm text-gray-600"
        >
          Saved.
        </div>
      </transition>
      <q-space />
      <q-btn
        flat
        :disabled="form.processing"
        @click="form.reset()"
      >
        Reset
      </q-btn>
      <q-btn
        flat
        :disabled="form.processing"
        type="submit"
        color="primary"
      >
        Save
      </q-btn>
    </template>
  </app-form-section>
</template>
