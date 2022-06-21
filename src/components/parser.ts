export const DataParser = (data: Record<string, any>[], limit: number = 10, page: number = 0): any => {
  // return [...data].splice(page, limit) as any[];
  const max = Math.ceil(data.length / limit);
  page = page >= max ? max - 1 : page;
  return [...data].splice(page * limit, limit);
};
