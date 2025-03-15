import bcrypt from "bcrypt";

const hashPassword = async (plainTextPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    console.log("Hashed Password:", hashedPassword);
};

hashPassword("hndhfnhdfd");
