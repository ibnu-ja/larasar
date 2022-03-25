<template>
    <app-layout title="Create Team">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Create Team
            </h2>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <create-team-form />
            </div>
        </div>
    </app-layout>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import AppLayout from '@/views/layouts/AppLayout.vue'
    import CreateTeamForm from '@/views/pages/Teams/Partials/CreateTeamForm.vue'

    export default defineComponent({
        components: {
            AppLayout,
            CreateTeamForm,
        },
    })
</script>
