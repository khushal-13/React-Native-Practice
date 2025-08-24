import { Account, Client } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "68691a0c003493f4dbdd",
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);