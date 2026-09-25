import db from "../config/db.js";


export const findUserByEmail = async(email)=>{

const [rows] = await db.query(
"SELECT * FROM users WHERE email=?",
[email]
);

return rows;

};




export const createUser = async(user)=>{


const [result] = await db.query(

`
INSERT INTO users
(
username,
email,
phone,
password
)
VALUES (?,?,?,?)
`,

[
user.username,
user.email,
user.phone,
user.password
]

);


return result;

};




export const updatePassword = async(
userId,
hashedPassword
)=>{


const [result] = await db.query(

`
UPDATE users
SET password=?
WHERE id=?
`,

[
hashedPassword,
userId
]

);


return result;

};