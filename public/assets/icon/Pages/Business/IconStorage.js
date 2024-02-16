const iconStorage = (icon) => {
    return new URL(`./${icon}.svg`, import.meta.url).href
};
  
  export default iconStorage;