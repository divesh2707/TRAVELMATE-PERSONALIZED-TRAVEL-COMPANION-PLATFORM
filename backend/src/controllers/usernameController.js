import { findUsernameByEmail, findUseridByEmail, findUseridByUsername , findUsernameByUserid, findemailbyusername} from '../models/User.js';


export const getUsernameByEmail = async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Call the function to find username by email
    const result = await findUsernameByEmail(email);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the username
    res.json({ username: result.rows[0].username });
  } catch (err) {
    console.error("Error fetching username:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const getUseridByEmail = async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Call the function to find userid by email
    const result = await findUseridByEmail(email);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the username
    res.json({ user_id: result.rows[0].user_id });
  } catch (err) {
    console.error("Error fetching userid:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};



export const getUseridByUsername = async (req, res) => {
  const { username } = req.query; // Extract username from query parameters

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Call the function to find userid by username
    const result = await findUseridByUsername(username);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the username
    res.json({ user_id: result.rows[0].user_id  });
  } catch (err) {
    console.error("Error fetching userid:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const getUsernameByUserId = async (req, res) => {
  
  const { user_id } = req.query; // Extract username from query parameters

  if (!user_id) {
    return res.status(400).json({ error: "UserId is required" });
  }

  try {
    // Call the function to find userid by username
    const result = await  findUsernameByUserid(user_id);
    // Return the username
    res.json({ username: result.username });
  } catch (err) {
    console.error("Error fetching userid:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const fetchEmailByUsername=async( req, res )=>{
  const {username}=req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try{
   const response=await findemailbyusername(username);
   res.json({email: response.email});

  }catch(err){
    res.status(500).json({error: "Server error"});
  }
}
