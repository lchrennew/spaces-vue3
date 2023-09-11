<template>
    <slot v-if="correct"/>
</template>
<script setup>
// 职能：当用户不具备空间访问权限，进行自动纠正
import { computed, inject, onBeforeMount, onBeforeUpdate } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    solution: String,
    module: String,
    specifiedSpace: Object,
    defaultSpace: Object,
})

const correct = computed(() =>
    props.specifiedSpace
    && props.specifiedSpace.solution === props.solution
    && props.specifiedSpace.module === props.module)

const router = useRouter()
const defaultRoute = inject('defaultRoute', '流水线:我的流水线')
const tryToCorrect = () => {
    if (!correct.value) {
        if (props.defaultSpace) return router.replace({
            name: defaultRoute.value,
            params: { solution: props.defaultSpace.solution, module: props.defaultSpace.module }
        })
        throw '无法纠正空间'
    }
}

onBeforeMount(tryToCorrect)
onBeforeUpdate(tryToCorrect)
</script>
