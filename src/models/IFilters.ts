import { IDifficulty } from './IDifficulty';

export interface IFilters {
  listId?: string;
  difficulty?: IDifficulty;
  status?: string;
  premiumOnly?: boolean;
  tags?: string[];
  companies?: string[];
  searchKeyWords?: string;
  orderBy?: 'FRONTEND_ID' | 'AC_RATE' | 'DIFFICULTY' | 'FREQUENCY';
  sortOrder?: 'DESCENDING' | 'ASCENDING';
}
