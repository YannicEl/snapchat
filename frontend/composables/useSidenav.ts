export const useSidenav = () => {
  const route = useRoute();

  const isOpen = useState('isOpen', () => route.query?.sidenav === 'true');

  watch(
    () => route.query?.sidenav,
    async (data) => (isOpen.value = !!data)
  );

  const router = useRouter();

  const open = () => {
    router.push({ path: '', query: { sidenav: 'true' } });
    isOpen.value = true;
  };

  const close = () => {
    router.push({ path: '', query: {} });
    isOpen.value = false;
  };

  const toggle = () => (isOpen.value ? close() : open());

  return {
    open,
    close,
    toggle,
    isOpen,
  };
};
