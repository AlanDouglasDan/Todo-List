import React, { FC, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavParams } from '../../navigation/AppStackNav';
import { SubList } from 'components/SubList';
import { palette, spacing, layout } from '../../core/styles';
import styles from './Task.styles';

const Task: FC<NativeStackScreenProps<AppStackNavParams, 'Task'>> = ({
  navigation,
}) => {
  const [title, setTitle] = useState<string>('');
  //   const [subTasks, setSubTasks] = useState<any[]>([]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={layout.flex1}>
            <View style={layout.alignEnd}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <Path
                    d="M28.0607 10.0607C28.6464 9.47487 28.6464 8.52513 28.0607 7.93934C27.4749 7.35355 26.5251 7.35355 25.9393 7.93934L18 15.8787L10.0607 7.93934C9.47487 7.35355 8.52513 7.35355 7.93934 7.93934C7.35355 8.52513 7.35355 9.47487 7.93934 10.0607L15.8787 18L7.93934 25.9393C7.35355 26.5251 7.35355 27.4749 7.93934 28.0607C8.52513 28.6464 9.47487 28.6464 10.0607 28.0607L18 20.1213L25.9393 28.0607C26.5251 28.6464 27.4749 28.6464 28.0607 28.0607C28.6464 27.4749 28.6464 26.5251 28.0607 25.9393L20.1213 18L28.0607 10.0607Z"
                    fill="black"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={spacing.marginTop60}>
              <TextInput
                style={styles.header36}
                placeholder="Enter task..."
                placeholderTextColor={palette.GREY}
                multiline
                value={title}
                onChangeText={setTitle}
              />

              <View style={[spacing.marginTop32, styles.subListContainer]}>
                <SubList disabled={false} />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.semiheader18}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Task;
