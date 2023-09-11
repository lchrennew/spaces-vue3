<script setup>
import { visit } from '../states/spaces.js';
import { watchEffect } from "vue";

const props = defineProps({ solution: String, module: String })
watchEffect(() => visit(props.solution, props.module))
</script>
