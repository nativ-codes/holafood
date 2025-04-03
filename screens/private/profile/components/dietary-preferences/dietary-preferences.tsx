import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem } from '@rneui/base';
import { useTranslation } from 'react-i18next';
import { DietaryPreferencesPropsType } from './dietary-preferences.type';
import { styles } from './dietary-preferences.style';
import { commonStyles } from '@/constants/common.styles';
export const DietaryPreferences = ({
  preferences,
  onUpdateDiet,
  onUpdateAllergies,
  onUpdateFavoriteIngredients,
}: DietaryPreferencesPropsType) => {
  const { t } = useTranslation();
  const tPath = 'screens.profile.dietaryPreferences';

  return (
    <View style={StyleSheet.compose(styles.container, commonStyles.shadow)}>
      <Text h4 style={styles.title}>{t(`${tPath}.title`)}</Text>
      
      <ListItem onPress={onUpdateDiet} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{t(`${tPath}.diet.title`)}</ListItem.Title>
          <ListItem.Subtitle>
            {preferences.diet || t(`${tPath}.diet.noSpecificDiet`)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem onPress={onUpdateAllergies} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{t(`${tPath}.allergies.title`)}</ListItem.Title>
          <ListItem.Subtitle>
            {preferences.allergies.length > 0 
              ? preferences.allergies.join(', ') 
              : t(`${tPath}.allergies.noAllergies`)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem onPress={onUpdateFavoriteIngredients}>
        <ListItem.Content>
          <ListItem.Title>{t(`${tPath}.favoriteIngredients.title`)}</ListItem.Title>
          <ListItem.Subtitle>
            {preferences.favoriteIngredients.length > 0 
              ? preferences.favoriteIngredients.join(', ') 
              : t(`${tPath}.favoriteIngredients.noIngredients`)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
}; 