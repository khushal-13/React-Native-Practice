import { account, client } from "./appwrite";

// Register + send verification
export async function register(email, password, name) {
  try {
    // 1️⃣ Create the user
    const newUser = await account.create("unique()", email, password, name);

    // 2️⃣ Send verification email
    await account.createVerification("exp://192.168.1.100:8081/--/verify");

    // 3️⃣ Return newUser + info
    return {
      success: true,
      message: "User registered. Verification email sent.",
      user: newUser,
    };
  } catch (error) {
    console.error(`❌ Error registering User ${name}`, error.message);
    return {
      success: false,
      message: error.message || "Registration failed",
    };
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
        return null;
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