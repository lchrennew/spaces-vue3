<script setup>

import { computed, provide } from "vue";

const props = defineProps({ path: String })

const rawPath = computed(() => props.path);
provide('path', rawPath)
provide('rawPath', rawPath)
const rawSolution = computed(() => props.path.split('/')[0]);
provide('solution', rawSolution)
provide('rawSolution', rawSolution)
const rawModule = computed(() => props.path.split('/')[1]);
provide('module', rawModule)
provide('rawModule', rawModule)
</script>

<template>
    <slot v-bind="{rawPath, rawSolution, rawModule}"/>
</template>

<style scoped>

</style>