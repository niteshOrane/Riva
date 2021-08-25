export const colorRegexFilter = (str) => {
    return str?.replace(/[\/\s-+]+/g,"-")
}