// composables/useSlug.js
export function useSlug() {
  /**
   * Function to generate a slug from a given title
   * @param {string} title - The title to generate a slug for
   * @returns {string} - The generated slug
   */

  const generateSlug = (title) => {
    if (!title) {
      return "";
    }
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with dashes
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
  };

  return { generateSlug };
}
