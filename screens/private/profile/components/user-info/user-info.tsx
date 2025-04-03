import React from 'react';
import { View } from 'react-native';
import { Avatar, Text, Button } from '@rneui/base';
import { useTranslation } from 'react-i18next';
import { UserInfoPropsType } from './user-info.type';
import { styles } from './user-info.style';

export const UserInfo = ({ user, onEditProfile }: UserInfoPropsType) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Avatar
        size={100}
        rounded
        title={user.name[0].toUpperCase()}
        containerStyle={styles.avatar}
        source={user.avatar ? { uri: user.avatar } : undefined}
      />
      <Text h4 style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button
        type="outline"
        title={t('screens.profile.editProfile')}
        onPress={onEditProfile}
        icon={{ name: 'edit', type: 'feather', size: 20 }}
        buttonStyle={styles.editButton}
      />
    </View>
  );
}; 