export default function useFormatDate() {
  /**
   * Formats a date string to "Month Day, Year" (e.g., November 6, 2024).
   * @param {string} date - The date string to format.
   * @returns {string} The formatted date.
   */
  const formatDate = (date) => {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    try {
      return new Date(date).toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Invalid date format:", date, error);
      return "";
    }
  };

  return { formatDate };
}
