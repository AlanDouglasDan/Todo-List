import React, { FC, useState, useEffect } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

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
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [text, setText] = useState<string>(list?.title || '');

  useEffect(() => {
    if (typeof parentChecked === 'boolean') {
      setToggleCheckBox(parentChecked);
    }
  }, [parentChecked]);

  return (
    <View style={styles.flexedRow}>
      <View style={styles.checkbox}>
        <CheckBox
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          tintColors={{ true: palette.BLUE }}
        />
      </View>

      <Pressable
        style={!disabled && layout.flex1}
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
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
