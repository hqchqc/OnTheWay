<template>
  <h1 v-for="item in repositories">{{ item.name }}</h1>
</template>

<script setup lang="ts">
import { toRefs } from '@vue/reactivity';
import useRepositoryNameSearch from './useRepositoryNameSearch/useRepositoryNameSearch';
import useUserRepositories from './useUserRepositories/useUserRepositories';

const props = defineProps<{ user: string }>()

const { user } = toRefs(props)
const { repositories } = useUserRepositories(user)
const { searchQuery, repositoriesMatchingSearchQuery } = useRepositoryNameSearch(repositories.value)

console.log(searchQuery.value, repositoriesMatchingSearchQuery)
</script>



<style scoped></style>