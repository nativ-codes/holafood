export type UserProfileType = {
  name: string;
  email: string;
  avatar?: string;
};

export type DietaryPreferenceType = {
  diet: string;
  allergies: string[];
  favoriteIngredients: string[];
};

export type ProfileScreenPropsType = {
  user: UserProfileType;
  dietaryPreferences: DietaryPreferenceType;
  onEditProfile: () => void;
  onLogout: () => void;
  onUpdateDiet: () => void;
  onUpdateAllergies: () => void;
  onUpdateFavoriteIngredients: () => void;
}; 