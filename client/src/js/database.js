import { openDB } from "idb";

const DATABASE_NAME = "jate";
const STORE_NAME = "jate";

const initdb = async () =>
  openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        console.log("jate database created");
      } else {
        console.log("jate database already exists");
      }
    },
  });

// Add content to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB(DATABASE_NAME, 1);
  const tx = jateDb.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const request = store.put({ content: content });
  const result = await request;
  console.log("Data saved to the database", result);
};

// Get all content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  const jateDb = await openDB(DATABASE_NAME, 1);
  const tx = jateDb.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result.length ? result[0].content : null; // Return the content if it exists, otherwise return null
};

initdb();
