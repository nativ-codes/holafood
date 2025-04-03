import { DietaryPreferenceType } from '../../profile.type';

export type DietaryPreferencesPropsType = {
  preferences: DietaryPreferenceType;
  onUpdateDiet: () => void;
  onUpdateAllergies: () => void;
  onUpdateFavoriteIngredients: () => void;
}; 