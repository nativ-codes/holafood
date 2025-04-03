import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '@rneui/base';
import { useTranslation } from 'react-i18next';
import { UserInfo } from './components/user-info/user-info';
import { DietaryPreferences } from './components/dietary-preferences/dietary-preferences';
import { styles } from './profile.style';

// Mock data
const mockUser = {
  name: 'User',
  email: 'user@example.com',
};

const mockDietaryPreferences = {
  diet: '',
  allergies: [],
  favoriteIngredients: [],
};

export default function ProfileScreen() {
  const { t } = useTranslation();

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
  };

  const handleUpdateDiet = () => {
    // TODO: Implement update diet functionality
  };

  const handleUpdateAllergies = () => {
    // TODO: Implement update allergies functionality
  };

  const handleUpdateFavoriteIngredients = () => {
    // TODO: Implement update favorite ingredients functionality
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
  };

  return (
    <ScrollView style={styles.container}>
      <UserInfo
        user={mockUser}
        onEditProfile={handleEditProfile}
      />
      <DietaryPreferences
        preferences={mockDietaryPreferences}
        onUpdateDiet={handleUpdateDiet}
        onUpdateAllergies={handleUpdateAllergies}
        onUpdateFavoriteIngredients={handleUpdateFavoriteIngredients}
      />
      <View style={styles.logoutContainer}>
        <Button
          title={t('screens.profile.logout')}
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          titleStyle={styles.logoutButtonText}
          type="clear"
          color="error"
        />
      </View>
    </ScrollView>
  );
}; 