import { useCallback, useEffect, useState } from 'react';

const useSubListLogic = (list?: any, parentChecked?: boolean) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [text, setText] = useState<string>(list?.title || '');

  useEffect(() => {
    if (typeof parentChecked === 'boolean') {
      setToggleCheckBox(parentChecked);
    }
  }, [parentChecked]);

  const onChangeCheckBox = useCallback((newValue: boolean) => {
    setToggleCheckBox(newValue);
  }, []);

  const onTogglePress = useCallback(() => {
    setToggleCheckBox(prev => !prev);
  }, []);

  return {
    toggleCheckBox,
    setToggleCheckBox,
    text,
    setText,
    onChangeCheckBox,
    onTogglePress,
  };
};

export default useSubListLogic;
