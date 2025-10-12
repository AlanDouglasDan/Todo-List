import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { palette, spacing } from 'core/styles';
import styles from './SubList.styles';

interface SubListProps {
  list?: any;
}

const SubList: FC<SubListProps> = ({ list }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);

  return (
    <View style={styles.flexedRow}>
      <CheckBox
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        tintColors={{ true: palette.BLUE }}
      />

      <Text style={[styles.text18, spacing.marginTop4]}>{list?.title}</Text>
    </View>
  );
};

export default SubList;
