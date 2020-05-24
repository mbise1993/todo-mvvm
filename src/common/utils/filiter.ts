export type Filter = 'all' | 'active' | 'completed';

export const getFilter = (path: string): Filter => {
  switch (path) {
    case '/active':
      return 'active';
    case '/completed':
      return 'completed';
    default:
      return 'all';
  }
};
