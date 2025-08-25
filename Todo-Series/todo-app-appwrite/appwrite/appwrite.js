import { Account, Client, Databases } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "68691a0c003493f4dbdd",
  databaseId: "68aaedac000b546c0b9a",
  collectionId: "68aaedb400340de00e9e"
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);