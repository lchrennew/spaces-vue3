import { ref } from 'vue';

export const spaces = ref(null)

export const spacesConsumer = ref(null)

export const loading = ref(false)

export const resetSpaces = () => {
    spaces.value = null
    spacesConsumer.value = null
    loading.value = false
}

export const load = async (getMine, consumer) => {
    if (loading.value) return
    loading.value = true
    spaces.value = await getMine()
    loading.value = false
    spacesConsumer.value = consumer
}

export const lastVisitedSolution = ref(localStorage.getItem('space.last.solution'))
export const lastVisitedModule = ref(localStorage.getItem('space.last.module'))

export const visit = (solution, module) => {
    if (!spaces.value || !spaces.value.filter(space => space.value === solution)
        .flatMap(solutionInfo => solutionInfo.children)
        .find(moduleInfo => moduleInfo.value === module)) return
    lastVisitedSolution.value = solution
    lastVisitedModule.value = module
    localStorage.setItem('space.last.solution', solution)
    localStorage.setItem('space.last.module', module)
}

// 1. URL指定：取URL指定的空间，空间不存在/没有空间数据跳转404
// 2. URL未指定（比如在空间页面之外的页面）
// 2.1. 没有空间数据，不显示入口
// 2.2. 有上次访问记录
// 2.2.1. 空间不存在，使用顺序第一的空间
// 2.2.2. 空间存在，使用上次访问空间
