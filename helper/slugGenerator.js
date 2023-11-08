export const generateSlug = (string) => {
    // Lowercase the string and replace spaces with hyphens
    const slug = string.toLowerCase().replace(/\s+/g, "-");

    // Remove special characters and non-alphanumeric characters
    return slug;
};
