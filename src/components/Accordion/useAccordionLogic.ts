import { useState } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

const useAccordionLogic = (initialExpanded: boolean = false) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(initialExpanded);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  const onChangeCheckBox = (newValue: boolean) => setToggleCheckBox(newValue);
  const onPressTitle = () => setToggleCheckBox(prev => !prev);

  return {
    toggleCheckBox,
    setToggleCheckBox,
    expanded,
    toggleExpand,
    onChangeCheckBox,
    onPressTitle,
  };
};

export default useAccordionLogic;
