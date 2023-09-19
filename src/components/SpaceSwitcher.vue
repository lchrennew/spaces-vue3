<template>
    <spaces-provider #="{defaultSpace, changeable, specifiedSpace, inSpace}" :consumer="consumer" :get-mine="getMine">
        <spaces-picker
            v-if="changeable && specifiedSpace"
            :allow-clear="false"
            :get-popup-container="getPopupContainer"
            :spaces="spaces"
            :suffix-icon="null"
            :value="navValue"
            class="space-switch"
            size="large"
            @change="onChange"
        />
        <last-visited-space-recorder :module="navModule" :solution="navSolution"/>
    </spaces-provider>
</template>
<script setup>
import LastVisitedSpaceRecorder from './LastVisitedSpaceRecorder.vue';
import SpacesProvider from './SpacesProvider.vue';
import SpacesPicker from "./SpacesPicker.vue";
import { spaces } from '../states/spaces.js';
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
    container: { type: String, required: true },
    getMine: { type: Function, required: true },
    consumer: { type: String, required: true },
})
const route = useRoute()
const navValue = computed(() => {
    const { solution, module } = route.params
    return [ solution, module ].filter(Boolean)
})

const navSolution = computed(() => navValue.value[0])
const navModule = computed(() => navValue.value[1])

const emit = defineEmits([ 'change' ])
const onChange = (value, [ { value: solution }, { value: module } ]) =>
    emit('change', { solution, module })
const getPopupContainer = () => document.getElementById(props.container)
</script>

<style lang="less" scoped>
.space-switch {
    width: auto;
    min-width: 250px;
}
</style>
