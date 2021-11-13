export const useSidenav = () => {
  const isOpen = useState('isOpen', () => useRoute().query?.sidenav === 'true');

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
