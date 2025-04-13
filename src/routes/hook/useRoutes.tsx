export type Stacks = 'Loading' | 'Auth' | 'App';

export function useRoutes(): Stacks {
  const isLoading = false;


  if (isLoading) {
    return 'Loading';
  }

    return 'App';

}
