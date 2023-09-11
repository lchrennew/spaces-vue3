<script setup>
import Pinyin from "pinyin-match";

defineProps({ spaces: Array })
const filter = (inputValue, path) => {
    const f =
        options =>
            options.some(({ label }) => Pinyin.match(label, inputValue))
            || (inputValue.includes('/') && options.map(option => option.value).join('/').startsWith(inputValue))
            || (inputValue.length && options.some(({ value }) => value.startsWith(inputValue)))
    return f(path)
}
</script>

<template>
    <a-cascader
        :options="spaces"
        :show-search="{filter, matchInputWidth:false}"
    />
</template>

<style scoped>

</style>