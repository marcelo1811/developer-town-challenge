const removeDuplicates = <T>(items: any[]): T[] => {
  const uniqueArray: T[] = items.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      items.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });

  return uniqueArray;
};

export default removeDuplicates;
