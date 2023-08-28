import Routes from '@/app/routes';

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.

export function App() {
  return <Routes />;
}
