import { Query } from "appwrite";
import { appwriteConfig, databases } from "./appwrite";

const DATABASE_ID = appwriteConfig.databaseId
const COLLECTION_ID = appwriteConfig.collectionId;

//Create Todo
export async function createTodo(todo) {
    try {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            "unique()",
            todo
        );
    } catch (error) {
        console.log("Error creating Todo", error);
    }    
}


// Get Tasks for Current User
export async function getTodo(todoId) {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [
      Query.equal("userId", userId)
    ]
  );
}


// Update Todo
export async function updateTodo(todoId, data) {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    todoId,
    data
  );
}

// Delete Todo
export async function deleteTask(todoId) {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTION_ID,
    todoId
  );
}
