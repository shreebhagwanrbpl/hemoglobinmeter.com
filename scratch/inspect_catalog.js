const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, getDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDGIJXX3MR1CxmIJbJHyVzbfRa0M0Sw6FQ",
  authDomain: "rajbiosis-central.firebaseapp.com",
  projectId: "rajbiosis-central",
  storageBucket: "rajbiosis-central.firebasestorage.app",
  messagingSenderId: "190335913620",
  appId: "1:190335913620:web:99a14edcbb528f06c1ee81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

async function run() {
  console.log("Fetching categories...");
  const categorySnap = await getDocs(
    collection(
      db,
      "websites",
      "hemoglobinmetercom",
      "pages",
      "categoryproducts",
      "categories"
    )
  );

  console.log(`Found ${categorySnap.docs.length} categories.`);
  const categories = [];
  const allProducts = [];

  for (const categoryDoc of categorySnap.docs) {
    const data = categoryDoc.data();
    const categoryName = data.category || categoryDoc.id;
    console.log(`- Category: ${categoryName} (${categoryDoc.id})`);

    const subcategoriesCol = collection(
      db,
      "websites",
      "hemoglobinmetercom",
      "pages",
      "categoryproducts",
      "categories",
      categoryDoc.id,
      "subcategories"
    );

    const subcategoriesSnap = await getDocs(subcategoriesCol);
    console.log(`  Found ${subcategoriesSnap.docs.length} subcategories.`);

    for (const subDoc of subcategoriesSnap.docs) {
      const subData = subDoc.data();
      const subCategoryName = subData.subCategory || subDoc.id;
      const products = Array.isArray(subData.products) ? subData.products : [];
      console.log(`    Subcategory: ${subCategoryName} with ${products.length} products`);

      for (let index = 0; index < products.length; index++) {
        const item = products[index];
        allProducts.push({
          ...item,
          category: categoryName,
          subCategory: subCategoryName,
          slug: item.slug || makeSlug(item.title),
        });
      }
    }

    if (Array.isArray(data.products) && data.products.length > 0) {
      console.log(`  Direct products in category: ${data.products.length}`);
      for (let index = 0; index < data.products.length; index++) {
        const item = data.products[index];
        allProducts.push({
          ...item,
          category: categoryName,
          subCategory: categoryName,
          slug: item.slug || makeSlug(item.title),
        });
      }
    }
  }

  // Fetch legacy products
  try {
    const oldSnap = await getDoc(
      doc(db, "websites", "hemoglobinmetercom", "pages", "products")
    );
    if (oldSnap.exists()) {
      const oldData = oldSnap.data();
      const oldProducts = Array.isArray(oldData.products) ? oldData.products : [];
      console.log(`Legacy products: ${oldProducts.length}`);
      for (let index = 0; index < oldProducts.length; index++) {
        const item = oldProducts[index];
        allProducts.push({
          ...item,
          category: "Other Products",
          subCategory: "Other Products",
          slug: item.slug || makeSlug(item.title),
        });
      }
    }
  } catch (err) {
    console.error("Error legacy:", err);
  }

  console.log(`Total processed products: ${allProducts.length}`);
  
  // Let's summarize the unique brands and categories
  const categorySet = new Set();
  const brandSet = new Set();
  allProducts.forEach(p => {
    if (p.category) categorySet.add(p.category);
    if (p.brand) brandSet.add(p.brand);
  });

  console.log("\nUnique Categories:");
  console.log(Array.from(categorySet));
  console.log("\nUnique Brands:");
  console.log(Array.from(brandSet));

  // Fetch districts
  console.log("\nFetching districts...");
  const districtSnap = await getDocs(
    collection(db, "websites", "hemoglobinmetercom", "districts")
  );
  console.log(`Found ${districtSnap.docs.length} districts.`);
  districtSnap.docs.forEach(doc => {
    console.log(`- District: ${doc.id} (slug: ${doc.data().slug})`);
  });

  process.exit(0);
}

run().catch(console.error);
