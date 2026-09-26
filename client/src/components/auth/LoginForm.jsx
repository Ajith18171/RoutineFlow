// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useToast from "../../hooks/useToast";
// import { Link } from "react-router-dom";
// import { useTheme } from "../../Context/ThemeContext";

// function LoginForm() {
//   const navigate = useNavigate();
//   const { showToast } = useToast();
//   const { darkMode } = useTheme();


//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData
//       );


//       if (response.data.success) {

//         localStorage.setItem(
//           "token",
//           response.data.token
//         );

//         localStorage.setItem(
//           "user",
//           JSON.stringify(response.data.user)
//         );


//         showToast("Login Successful!");

//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);

//       }

//     } catch (error) {

//       showToast(
//         error.response?.data?.message ||
//         "Login failed"
//       );

//     }
//   };


//   return (
// <div
//   className={`max-w-md mx-auto rounded-3xl p-8 transition-all duration-300 ${
//     darkMode
//       ? "bg-slate-900 border border-slate-800 text-white"
//       : "bg-white shadow-xl text-gray-900"
//   }`}
// >

//       <h2 className="text-3xl font-bold mb-6 text-center">
//         Welcome Back
//       </h2>


//       <form
//         onSubmit={handleSubmit}
//         className="space-y-5"
//       >

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className={`w-full rounded-xl p-3 border transition ${
//   darkMode
//     ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
//     : "bg-white border-gray-300 text-gray-900"
// }`}
//         />


//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className={`w-full rounded-xl p-3 border transition ${
//   darkMode
//     ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
//     : "bg-white border-gray-300 text-gray-900"
// }`}
//         />


//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
//         >
//           Login
//         </button>
//         <div className="mt-6 text-center">
//   <p
//   className={`text-sm ${
//     darkMode
//       ? "text-slate-400"
//       : "text-gray-500"
//   }`}
// >
//     Don't have an account?{" "}
//     <Link
//       to="/register"
//       className="font-semibold text-blue-600 hover:text-blue-700 transition"
//     >
//       Register
//     </Link>
//   </p>
// </div>

//       </form>

//     </div>
//   );
// }

// export default LoginForm;
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// import useToast from "../../hooks/useToast";
// import { useTheme } from "../../Context/ThemeContext";


// function LoginForm() {

//   const navigate = useNavigate();

//   const { showToast } = useToast();

//   const { darkMode } = useTheme();



//   const [formData, setFormData] = useState({

//     email: "",

//     password: "",

//   });



//   const [loading, setLoading] = useState(false);




//   const handleChange = (e) => {

//     setFormData({

//       ...formData,

//       [e.target.name]: e.target.value,

//     });

//   };





//   const handleSubmit = async (e) => {

//     e.preventDefault();


//     console.log("LOGIN CLICKED");


//     try {


//       setLoading(true);



//       const response = await axios.post(

//         "http://localhost:5000/api/auth/login",

//         formData

//       );



//       console.log(
//         "LOGIN RESPONSE:",
//         response.data
//       );




//       if (response.data.success) {



//         localStorage.setItem(

//           "token",

//           response.data.token

//         );



//         localStorage.setItem(

//           "user",

//           JSON.stringify(response.data.user)

//         );



//         showToast(
//           "Login Successful!"
//         );



//         setTimeout(() => {

//           navigate("/dashboard");

//         }, 800);



//       }



//     } catch(error) {


//       console.log(
//         "LOGIN ERROR:",
//         error
//       );


//       showToast(

//         error.response?.data?.message ||

//         "Login failed"

//       );



//     } finally {


//       setLoading(false);


//     }


//   };






//   return (


//     <div

//       className={`

//         w-full

//         max-w-md

//         rounded-2xl

//         shadow-xl

//         p-8

//         transition


//         ${
//           darkMode

//           ?

//           "bg-slate-900 text-white"

//           :

//           "bg-white text-gray-900"

//         }

//       `}

//     >



//       <h2

//         className="

//           text-3xl

//           font-bold

//           mb-6

//           text-center

//         "

//       >

//         Welcome Back

//       </h2>





//       <form

//         onSubmit={handleSubmit}

//         className="space-y-5"

//       >



//         <input


//           type="email"


//           name="email"


//           placeholder="Email"


//           value={formData.email}


//           onChange={handleChange}



//           className={`

//             w-full

//             rounded-xl

//             p-3

//             border

//             outline-none

//             transition



//             ${

//               darkMode

//               ?

//               "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"

//               :

//               "bg-white border-gray-300 text-gray-900"

//             }

//           `}


//           required


//         />





//         <input


//           type="password"


//           name="password"


//           placeholder="Password"



//           value={formData.password}



//           onChange={handleChange}



//           className={`

//             w-full

//             rounded-xl

//             p-3

//             border

//             outline-none

//             transition



//             ${

//               darkMode

//               ?

//               "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"

//               :

//               "bg-white border-gray-300 text-gray-900"

//             }

//           `}



//           required


//         />






//         <button


//           type="submit"



//           disabled={loading}



//           className={`

//             w-full

//             rounded-xl

//             py-3

//             font-semibold

//             text-white

//             transition



//             ${

//               loading

//               ?

//               "bg-gray-500 cursor-not-allowed"

//               :

//               "bg-blue-600 hover:bg-blue-700"

//             }

//           `}


//         >

//           {

//             loading

//             ?

//             "Logging in..."

//             :

//             "Login"

//           }


//         </button>





//       </form>





//       <div

//         className="

//           mt-6

//           text-center

//           text-sm

//         "

//       >


//         Don't have an account?


//         <Link

//           to="/register"

//           className="

//             ml-2

//             text-blue-600

//             hover:underline

//           "

//         >

//           Register

//         </Link>



//       </div>




//     </div>


//   );

// }



// export default LoginForm;

import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

import useToast from "../../hooks/useToast";
import { useTheme } from "../../Context/ThemeContext";


function LoginForm() {

  const navigate = useNavigate();

  const { showToast } = useToast();

  const { darkMode } = useTheme();



  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });



  const [loading, setLoading] = useState(false);




  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    console.log("LOGIN CLICKED");


    try {


      setLoading(true);



      const response = await api.post(

        "/auth/login",

        formData

      );



      console.log(
        "LOGIN RESPONSE:",
        response.data
      );




      if (response.data.success) {



        localStorage.setItem(

          "token",

          response.data.token

        );



        localStorage.setItem(

          "user",

          JSON.stringify(response.data.user)

        );



        showToast(
          "Login Successful!"
        );



        setTimeout(() => {

          navigate("/dashboard");

        }, 800);



      }



    } catch(error) {


      console.log(
        "LOGIN ERROR:",
        error
      );


      showToast(

        error.response?.data?.message ||

        "Login failed"

      );



    } finally {


      setLoading(false);


    }


  };






  return (


    <div

      className={`

        w-full

        max-w-md

        rounded-2xl

        shadow-xl

        p-8

        transition


        ${
          darkMode

          ?

          "bg-slate-900 text-white"

          :

          "bg-white text-gray-900"

        }

      `}

    >



      <h2

        className="

          text-3xl

          font-bold

          mb-6

          text-center

        "

      >

        Welcome Back

      </h2>





      <form

        onSubmit={handleSubmit}

        className="space-y-5"

      >



        <input


          type="email"


          name="email"


          placeholder="Email"


          value={formData.email}


          onChange={handleChange}



          className={`

            w-full

            rounded-xl

            p-3

            border

            outline-none

            transition



            ${

              darkMode

              ?

              "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"

              :

              "bg-white border-gray-300 text-gray-900"

            }

          `}


          required


        />





        <input


          type="password"


          name="password"


          placeholder="Password"



          value={formData.password}



          onChange={handleChange}



          className={`

            w-full

            rounded-xl

            p-3

            border

            outline-none

            transition



            ${

              darkMode

              ?

              "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"

              :

              "bg-white border-gray-300 text-gray-900"

            }

          `}



          required


        />






        <button


          type="submit"



          disabled={loading}



          className={`

            w-full

            rounded-xl

            py-3

            font-semibold

            text-white

            transition



            ${

              loading

              ?

              "bg-gray-500 cursor-not-allowed"

              :

              "bg-blue-600 hover:bg-blue-700"

            }

          `}


        >

          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }


        </button>





      </form>





      <div

        className="

          mt-6

          text-center

          text-sm

        "

      >


        Don't have an account?


        <Link

          to="/register"

          className="

            ml-2

            text-blue-600

            hover:underline

          "

        >

          Register

        </Link>



      </div>




    </div>


  );

}



export default LoginForm;