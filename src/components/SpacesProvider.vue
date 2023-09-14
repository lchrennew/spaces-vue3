<template>
    <slot v-if="spacesLoaded" v-bind="{changeable, defaultSpace, specifiedSpace}"/>
    <a-spin v-else tip="加载空间信息..."/>
</template>

<script setup>
import { computed, nextTick, provide } from 'vue'
import { lastVisitedModule, lastVisitedSolution, load, spaces, spacesConsumer } from '../states/spaces.js';
import { useRoute } from "vue-router";

const props = defineProps({
    consumer: { type: String, required: true, },
    getMine: { type: Function, required: true, },
})

const spacesLoaded = computed(() => {
    const loaded = !!spaces.value && spacesConsumer.value === props.consumer
    !loaded && nextTick(() => load(props.getMine, props.consumer))
    return loaded
})
const hasSpace = computed(() => !!spaces.value?.[0]?.children?.[0])
const changeable = computed(() => spaces.value?.[0]?.children?.[1] || spaces.value?.[1]?.children?.[0])
const route = useRoute()
const specifiedSpace = computed(() => {
    const { solution, module } = route.params
    if (spaces.value.filter(space => space.value === solution)
        .flatMap(solutionInfo => solutionInfo.children)
        .find(moduleInfo => moduleInfo.value === module))
        return { solution, module }
})
const lastVisitedSpace = computed(() => {
    const solution = lastVisitedSolution.value ?? localStorage.getItem('space.last.solution')
    const module = lastVisitedModule.value ?? localStorage.getItem('space.last.module')

    if (spaces.value.filter(space => space.value === solution)
        .flatMap(solutionInfo => solutionInfo.children)
        .find(moduleInfo => moduleInfo.value === module))
        return { solution, module }
})
const firstSpace = computed(() => ({
    solution: spaces.value?.[0]?.value,
    module: spaces.value?.[0]?.children?.[0]?.value
}))
const defaultSpace = computed(() => {
    if (hasSpace.value)
        return specifiedSpace.value || lastVisitedSpace.value || firstSpace.value
})
provide('defaultSpace', computed(() => defaultSpace.value))
</script>

<style scoped>

</style>
