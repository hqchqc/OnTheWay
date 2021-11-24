import { onMounted, ref, watch } from "vue";

type repositories = {
  id: number;
  name: string;
}[];

const fetchUserRepositories = (username: string) => {
  if (username === "beanBag") {
    return [
      {
        id: 1,
        name: "vue",
      },
      {
        id: 2,
        name: "React",
      },
    ];
  } else {
    return [
      {
        id: 1,
        name: "typescript",
      },
      {
        id: 2,
        name: "flutter",
      },
    ];
  }
};

export default function useUserRepositories(user: { value: string }) {
  const repositories = ref<repositories>([]);
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value);
  };
  onMounted(getUserRepositories);
  watch(user, getUserRepositories);

  return {
    repositories,
    getUserRepositories,
  };
}
