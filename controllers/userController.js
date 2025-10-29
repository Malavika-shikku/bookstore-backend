
var jwt = require('jsonwebtoken');
const users = require('../model/userModel')


//register
exports.registerController = async (req,res)=>{
    
    //logic
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser =await users.findOne({email})

        if(existingUser){
            res.status(400).json("Already registered user!!!")
        }else{
            const newUser = new users({
                username,
                email,
                password,
                profile:"",
                bio:""
            })
            await newUser.save()//mongodb save
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status(500).json(err)
    }
    
}
//login

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", email, password);

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Incorrect email id" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ usermail: existingUser.email }, "secretkey", {
      expiresIn: "1d",
    });

    res.status(200).json({ existingUser, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//google login
exports.googleLoginController = async (req,res)=>{
    const {username,email,password,photo} = req.body
    console.log(username,email,password,photo);

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            const token = jwt.sign({usermail:existingUser.email},'secretkey')
            res.status(200).json({existingUser,token})

        }else{
            const newUser = new users({
                username,
                email,
                password,
                profile:photo,
            })
            await newUser.save() //mongodb save
            const token =jwt.sign({usermail:newUser.email},'secretkey')
            res.status(200).json({existingUser:newUser,token})

        }

    }catch(err){
        res.status(500).json(err)

    }
    

    
}

//edit user profile
// PUT: /update-user
// PUT: /update-user
exports.updateUserProfile = async (req, res) => {
  const usermail = req.payload; // from JWT
  const { username, password, bio } = req.body;
  const profile = req.file ? req.file.filename : req.body.profile;

  try {
    const updatedUser = await users.findOneAndUpdate(
      { email: usermail },
      { username, password, profile, bio },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(401).json("Update failed");
  }
};




//-----------admin-----------
exports.getAllUserController = async (req, res) => {
  try {
    const email = req.payload.usermail; // ✅ get the actual string
    const allUsers = await users.find({ email: { $ne: email } });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};


//update admin profilr
exports.editAdminProfileController = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);
        console.log("req.payload:", req.payload);

        const { username, password, profile } = req.body;
        const prof = req.file ? req.file.filename : profile;
        const userEmail = req.payload.usermail;

        const adminDetails = await users.findOneAndUpdate(
            { email: userEmail },
            { username, password, profile: prof },
            { new: true }
        );

        if (!adminDetails) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json(adminDetails);
    } catch (err) {
        console.error("Admin profile update error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

