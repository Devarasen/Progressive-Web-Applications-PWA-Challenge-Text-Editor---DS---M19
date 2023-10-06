import { openDB } from "idb";

const DATABASE_NAME = "jate";
const STORE_NAME = "jate";

const initdb = async () => {
  try {
    await openDB(DATABASE_NAME, 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains(STORE_NAME)) {
          console.log("jate database already exists");
          return;
        }
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        console.log("jate database created");
      },
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const todosDb = await openDB(DATABASE_NAME, 1);
    const tx = todosDb.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const result = await store.put({ todo: content });
    console.log("Data saved to the database", result);
    todosDb.close();
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const todosDb = await openDB(DATABASE_NAME, 1);
    const tx = todosDb.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const result = await store.getAll();
    console.log("result.value", result);
    todosDb.close();
    return result;
  } catch (error) {
    console.error("Error getting data from database:", error);
    throw error;
  }
};

initdb();
