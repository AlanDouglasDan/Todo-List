import { useState } from 'react';

const useTaskLogic = (task?: any) => {
  const isViewMode = !!task;

  const [title, setTitle] = useState<string>(task?.title || '');
  const [subLists] = useState<any[]>(task?.subLists || []);

  return {
    isViewMode,
    title,
    setTitle,
    subLists,
  };
};

export default useTaskLogic;
