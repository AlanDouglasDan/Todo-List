import React, { FC } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import useSubListLogic from './useSubListLogic';
import { layout, palette } from 'core/styles';
import styles from './SubList.styles';

interface SubListProps {
  list?: any;
  disabled?: boolean;
  parentChecked?: boolean;
}

const SubList: FC<SubListProps> = ({
  list,
  disabled = true,
  parentChecked,
}) => {
  const {
    toggleCheckBox,
    onChangeCheckBox,
    onTogglePress,
    text,
    setText,
  } = useSubListLogic(list, parentChecked);

  return (
    <View style={styles.flexedRow}>
      <View style={styles.checkbox}>
        <CheckBox
          value={toggleCheckBox}
          onValueChange={onChangeCheckBox}
          tintColors={{ true: palette.BLUE }}
        />
      </View>

      <Pressable
        style={!disabled && layout.flex1}
        onPress={onTogglePress}
        disabled={!disabled}
      >
        <TextInput
          style={styles.text18}
          value={text}
          onChangeText={setText}
          placeholder="Add subtask"
          placeholderTextColor={palette.GREY}
          editable={!disabled}
          multiline
          pointerEvents="none"
        />
      </Pressable>
    </View>
  );
};

export default SubList;
