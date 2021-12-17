import { IFilters } from './IFilters';

export interface ISortAndFilterParams {
  categorySlug: '' | 'algorithms' | 'database' | 'shell' | 'concurrency';
  skip: number;
  limit: number;
  filters: IFilters;
}
