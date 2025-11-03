export const getPageConfig = (page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);

  return {
    info: {
      total,
      limit,
      page: {
        current: page,
        next: page < totalPages ? page + 1 : null,
        prev: page > 1 ? page - 1 : null,
      },
    },
  };
};
