const tryCatchHandler = (
  asyncFunction: (...args: any[]) => Promise<any | any[]>
) => {
  return async (...args: any[]): Promise<any | any[]> => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      throw error;
    }
  };
};

export default tryCatchHandler;
