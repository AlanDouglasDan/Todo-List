import React, { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { SubList } from '../SubList';
import { common, palette, spacing } from 'core/styles';
import styles from './Accordion.styles';
import useAccordionLogic from './useAccordionLogic';

interface AccordionProps {
  list?: any;
  initialExpanded?: boolean;
}

const Accordion: FC<AccordionProps> = ({ list, initialExpanded }) => {
  const {
    toggleCheckBox,
    onChangeCheckBox,
    onPressTitle,
    expanded,
    toggleExpand,
  } = useAccordionLogic(!!initialExpanded);

  return (
    <View key={list?.id}>
      <TouchableOpacity
        style={[styles.accordionContainer, styles.gap]}
        onPress={toggleExpand}
        activeOpacity={1}
      >
        <CheckBox
          value={toggleCheckBox}
          onValueChange={onChangeCheckBox}
          tintColors={{ true: palette.BLUE }}
        />

        <View style={spacing.marginTop4}>
          <View>
            <Pressable onPress={onPressTitle}>
              <Text style={styles.text18}>{list?.title}</Text>
            </Pressable>

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
                  <SubList key={item?.id} list={item} parentChecked={toggleCheckBox} />
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
