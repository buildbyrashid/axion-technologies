/**
 * Global company constants
 */

export const COMPANY_STATS = {
  // Brand established in 2006
  ESTABLISHED_YEAR: 2006,
  
  GLOBAL_LOCATIONS: 3,
  PROJECTS_DELIVERED: 1000,
  MANUFACTURING_AREA: 5000,
};

/**
 * Calculates current company years of experience
 */
export const getYearsExperience = () => {
  const currentYear = new Date().getFullYear();
  return currentYear - COMPANY_STATS.ESTABLISHED_YEAR;
};
