const sortFetureFirst = (list: []) => {
  list.sort(
    (a: { feature: boolean }, b: { feature: boolean }) =>
      Number(b.feature) - Number(a.feature)
  );
  return list;
};
export { sortFetureFirst };
