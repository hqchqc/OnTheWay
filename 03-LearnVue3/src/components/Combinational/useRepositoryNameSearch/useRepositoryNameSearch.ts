import { computed, ref } from "vue";

type repositories = {
  id: number;
  name: string;
}[];

export default function useRepositoryNameSearch(repositories: repositories) {
  const searchQuery = ref("");
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.filter((repository) =>
      repository.name.includes(searchQuery.value)
    );
  });

  return {
    searchQuery,
    repositoriesMatchingSearchQuery,
  };
}
