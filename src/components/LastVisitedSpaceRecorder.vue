<script>
import { visit } from '../states/spaces.js';

export default {
    name: 'LastVisitedSpaceRecorder',
    props: [ 'solution', 'module' ],
    computed: {
        space() {
            return { solution: this.solution, module: this.module }
        }
    },
    watch: {
        space: {
            handler({ solution, module }) {
                visit(solution, module)
            },
            immediate: true
        }
    },
    render() {
    }
}
</script>

<style scoped>

</style>
