export const getMessages = (locale: string) => {
    try {
      return require(`@/messages/${locale}.json`);
    } catch (error) {
      console.error("Error loading messages:", error);
      return null;
    }
  };