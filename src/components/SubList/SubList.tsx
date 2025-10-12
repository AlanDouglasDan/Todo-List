import React, { FC, useState } from 'react';
import { View, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { palette } from 'core/styles';
import styles from './SubList.styles';

interface SubListProps {
  list?: any;
  disabled?: boolean;
}

const SubList: FC<SubListProps> = ({ list, disabled = true }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [text, setText] = useState<string>(list?.title || '');

  return (
    <View style={styles.flexedRow}>
      <CheckBox
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        tintColors={{ true: palette.BLUE }}
      />

      <TextInput
        style={styles.text18}
        value={text}
        onChangeText={setText}
        placeholder="Add subtask"
        placeholderTextColor={palette.GREY}
        editable={!disabled}
      />
    </View>
  );
};

export default SubList;
