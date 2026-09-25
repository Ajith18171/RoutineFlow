import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUserByEmail,
  createUser,
  updatePassword,
} from "../models/userModel.js";


// REGISTER

export const registerUser = async (req,res)=>{

try{

const {
 username,
 email,
 phone,
 password
}=req.body;


if(!username || !email || !phone || !password){

return res.status(400).json({
success:false,
message:"Please fill all required fields."
});

}


// check email

const existingUser = await findUserByEmail(email);


if(existingUser.length > 0){

return res.status(409).json({
success:false,
message:"Email already registered."
});

}


// hash password

const hashedPassword =
await bcrypt.hash(password,10);



const newUser={

username,
email,
phone,
password:hashedPassword

};



await createUser(newUser);



return res.status(201).json({

success:true,
message:"Registration successful!"

});


}
catch(error){

console.log(error);

return res.status(500).json({

success:false,
message:"Server error."

});

}

};





// LOGIN

export const loginUser = async(req,res)=>{

try{


const {
email,
password
}=req.body;



if(!email || !password){

return res.status(400).json({

success:false,
message:"Please enter email and password."

});

}



const results =
await findUserByEmail(email);



if(results.length===0){

return res.status(401).json({

success:false,
message:"Invalid email or password."

});

}



const user=results[0];



const isMatch =
await bcrypt.compare(
password,
user.password
);



if(!isMatch){

return res.status(401).json({

success:false,
message:"Invalid email or password."

});

}




const token = jwt.sign(

{
id:user.id,
email:user.email
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);



return res.status(200).json({

success:true,

message:"Login successful!",

token,

user:{

id:user.id,

username:user.username,

email:user.email,

phone:user.phone

}

});



}
catch(error){

console.log(error);


return res.status(500).json({

success:false,
message:"Server error."

});


}

};








// CHANGE PASSWORD

export const changePassword = async(req,res)=>{

try{


const {
currentPassword,
newPassword
}=req.body;



if(!currentPassword || !newPassword){

return res.status(400).json({

success:false,
message:"Please fill all fields."

});

}



const userEmail=req.user.email;



const results =
await findUserByEmail(userEmail);



if(results.length===0){

return res.status(404).json({

success:false,
message:"User not found."

});

}



const user=results[0];



const isMatch =
await bcrypt.compare(
currentPassword,
user.password
);



if(!isMatch){

return res.status(401).json({

success:false,
message:"Current password is incorrect."

});

}



const hashedPassword =
await bcrypt.hash(newPassword,10);



await updatePassword(
user.id,
hashedPassword
);



return res.status(200).json({

success:true,

message:"Password updated successfully!"

});



}
catch(error){

console.log(error);


return res.status(500).json({

success:false,

message:"Failed to update password."

});


}

};