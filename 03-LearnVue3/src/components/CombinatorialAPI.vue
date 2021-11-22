<template>
  <h1 v-for="item in repositories">{{ item.name }}</h1>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'
const props = defineProps<{ user: string }>()
type repositories = {
  id: number;
  name: string;
}
const fetchUserRepositories = (username: string) => {
  if (username === 'beanBag') {
    return [
      {
        id: 1,
        name: 'vue'
      },
      {
        id: 2,
        name: 'React'
      }
    ]
  } else {
    return [
      {
        id: 1,
        name: 'typescript'
      },
      {
        id: 2,
        name: 'flutter'
      }
    ]
  }
}

const repositories = ref<repositories[]>([])
const user = toRefs(props)

const getUserRepositories = async () => {
  repositories.value = await fetchUserRepositories(props.user);
  console.log(repositories.value)
}

onMounted(getUserRepositories)
watch(user, getUserRepositories)

</script>



<style scoped></style>