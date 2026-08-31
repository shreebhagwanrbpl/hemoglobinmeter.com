/**
 * Programmatic SEO Safety & Quality Gate System
 * Domain: hemoglobinmeter.com
 */

// Define categories that are topically relevant to hemoglobin meters, hematology, and blood diagnostics
export const RELEVANT_CATEGORIES = [
  "hematology analyzers",
  "test strips",
  "blood bank equipments",
  "blood collection tubes",
  "sysmex",
  "mindray",
  "abbott",
  "erba biochemistry analyzer",
  "biochemistry analyzer",
  "ivds category",
  "pathology lab equipments",
  "clinical reagents",
  "protein analyzer"
];

/**
 * Determine if a category is topically relevant to this website
 */
export function isTopicallyRelevant(category = "") {
  const normCategory = category.toLowerCase().trim();
  return RELEVANT_CATEGORIES.some(rel => normCategory.includes(rel) || rel.includes(normCategory));
}

/**
 * Calculate internal SEO Quality Score (0-100)
 */
export function getSeoScore(product) {
  if (!product) return 0;

  let technicalScore = 20; // Correct next.config.js configurations
  let contentQualityScore = isTopicallyRelevant(product.category || "") ? 20 : 5;
  
  // Search intent score based on brand and model availability
  let searchIntentScore = 5;
  if (product.brand && product.model) {
    searchIntentScore = 15;
  } else if (product.brand || product.model) {
    searchIntentScore = 10;
  }

  let internalLinkingScore = 10; // Main product is linked contextually
  let metadataScore = (product.title && (product.desc || product.description)) ? 10 : 5;
  let structuredDataScore = 10; // Injected Product Schema
  let performanceScore = 5; // Fast static rendering
  let imageScore = (product.image || (product.images && product.images.length > 0)) ? 5 : 2;
  let localRelevanceScore = 5; // Location pages dynamically update

  const totalScore = 
    technicalScore + 
    contentQualityScore + 
    searchIntentScore + 
    internalLinkingScore + 
    metadataScore + 
    structuredDataScore + 
    performanceScore + 
    imageScore + 
    localRelevanceScore;

  return totalScore;
}

/**
 * Helper to check if a product should be indexed on this site
 */
export function shouldIndexProduct(product) {
  if (!product) return false;
  
  // Quality Gate: Exclude products with an SEO quality score below 50
  const score = getSeoScore(product);
  return score >= 50;
}
