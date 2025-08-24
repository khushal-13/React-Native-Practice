import { account, client } from "./appwrite";


//register
export async function register(name, email, password) {
    try {
        return await account.create("unique()", email, password, name);
    } catch (error) {
        console.log(`Error registering User ${name}`, error);
        throw error;
    }
}

//login
export async function login(email, password) {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.log(`Error login user ${email}`, error);
        throw error;
    }
}


//get current user
export async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        console.log(`Error getting current User`, error);
        throw null;
    }
}


// Logout
export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log(`Error logout user`, error);
    throw error;
  }
}