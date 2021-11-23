<template>
  <h1 v-for="item in repositories">{{ item.name }}</h1>
</template>

<script setup lang="ts">
import { toRefs } from '@vue/reactivity';
import useUserRepositories from './useUserRepositories/useUserRepositories';

const props = defineProps<{ user: { value: string } }>()

const { user } = toRefs(props)

const [repositories, getUserRepositories] = useUserRepositories(user)

// const searchQuery = ref('')
// const repositoriesMatchingSearchQuery = computed(() => {
//   // return repositories.value.filter(
//   //   repository => repository.name.includes(searchQuery.value)
//   // )
// })

</script>



<style scoped></style>