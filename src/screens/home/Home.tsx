import React, { FC } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavParams } from 'navigation/AppStackNav';
import useHomeLogic from './useHomeLogic';
import { Accordion } from 'components/Accordion';
import { formatHeaderDate } from 'core/utils';
import { lists } from 'core/constants';
import { palette, spacing } from 'core/styles';
import styles from './Home.styles';

const Home: FC<NativeStackScreenProps<AppStackNavParams, 'Home'>> = ({
  navigation,
}) => {
  const { today, categories } = useHomeLogic();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.header36}>
          Today{' '}
          <Text style={{ color: palette.GREY }}>{formatHeaderDate(today)}</Text>
        </Text>

        <View style={styles.categoriesGrid}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: category.background },
              ]}
              onPress={() => navigation.navigate('Calendar', { category })}
            >
              {category.icon}

              <Text style={[styles.semiheader18, spacing.marginTop16]}>
                {category.count}{' '}
                <Text style={{ color: palette.GREY }}>{category.name}</Text>
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {lists.map((list, index) => (
          <Accordion
            key={list.id}
            list={list}
            initialExpanded={index === 1}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Task', { task: undefined })}
      >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <Path
            d="M17.3333 6.66683C17.3333 5.93045 16.7363 5.3335 15.9999 5.3335C15.2635 5.3335 14.6666 5.93045 14.6666 6.66683V14.6668H6.66659C5.93021 14.6668 5.33325 15.2638 5.33325 16.0002C5.33325 16.7365 5.93021 17.3335 6.66659 17.3335H14.6666V25.3335C14.6666 26.0699 15.2635 26.6668 15.9999 26.6668C16.7363 26.6668 17.3333 26.0699 17.3333 25.3335V17.3335H25.3333C26.0696 17.3335 26.6666 16.7365 26.6666 16.0002C26.6666 15.2638 26.0696 14.6668 25.3333 14.6668H17.3333V6.66683Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
