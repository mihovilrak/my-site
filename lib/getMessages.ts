export const getMessages = async (locale: string) => {
  try {
    const messages = await import(`@/messages/${locale}.json`).then(
      (module) => module.default
    );
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return null;
  }
}