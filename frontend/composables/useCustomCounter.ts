const count = ref(0);
const increment = (value: number = 1) => (count.value += value);

export const useCustomCounter = () => {
  return {
    count: readonly(count),
    increment,
  };
};
