import React, { FC, useState } from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import SubList from '../SubList/SubList';
import { common, palette, spacing } from 'core/styles';
import styles from './Accordion.styles';

interface AccordionProps {
  list?: any;
}

const Accordion: FC<AccordionProps> = ({ list }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View key={list?.id}>
      <TouchableOpacity
        style={[styles.accordionContainer, styles.gap]}
        onPress={toggleExpand}
        activeOpacity={1}
      >
        <CheckBox
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          tintColors={{ true: palette.BLUE }}
        />

        <View style={spacing.marginTop4}>
          <View>
            <Text style={styles.text18}>{list?.title}</Text>

            <View
              style={[
                styles.badgeContainer,
                { backgroundColor: list?.tagBackground },
              ]}
            >
              <Text style={[styles.semiheader12, { color: list?.tagColor }]}>
                {list?.tag}
              </Text>
            </View>
          </View>

          {expanded && (
            <View style={spacing.marginTop20}>
              {list?.subLists?.length > 0 &&
                list?.subLists?.map((item: any) => (
                  <SubList key={item?.id} list={item} />
                ))}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={common.line} />
    </View>
  );
};

export default Accordion;
