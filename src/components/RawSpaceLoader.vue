<script setup>
import DataLoader from "data-loader-vue3/src/DataLoader.vue";
import RawSpaceProvider from "./RawSpaceProvider.vue";

defineProps({
    path: { required: true, type: String },
    getRawSpace: { required: true, type: Function },
})
</script>

<template>
    <data-loader
        :load-data="getRawSpace"
        :load-data-args="path"
        :hash="path"
        #="{loaded, data}"
    >
        <raw-space-provider v-if="loaded" :path="data" #="slotData">
            <slot v-bind="slotData"/>
        </raw-space-provider>
        <a-spin v-else tip="正在加载源空间名称..."/>
    </data-loader>
</template>

<style scoped>

</style>