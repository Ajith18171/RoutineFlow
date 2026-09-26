import {
  Moon,
  Sun,
  Menu
} from "lucide-react";

import {
  Link
} from "react-router-dom";


import NotificationBell from "./NotificationBell";

import {
  useTheme
} from "../../Context/ThemeContext";



function Navbar({openSidebar}){


const {
darkMode,
toggleTheme
}=useTheme();



const token =
localStorage.getItem("token");


const user =
JSON.parse(
localStorage.getItem("user")
);





return (


<header

className={`
sticky
top-0
z-50
border-b
shadow-sm

${
darkMode

?

"bg-slate-900 border-slate-700 text-white"

:

"bg-white border-gray-200"

}

`}


>


<div className="
flex
items-center
justify-between
px-5
py-4
">


<div className="
flex
items-center
gap-4
">


<button

onClick={openSidebar}

className="p-2 rounded-lg"

>


<Menu size={24}/>


</button>




<Link

to={
token
?
"/dashboard"
:
"/"
}

className="
text-2xl
font-bold
text-blue-600
"

>


RoutineFlow


</Link>



</div>






<div className="
flex
items-center
gap-4
">


{

token &&

<>


<NotificationBell />



<div className="hidden md:block">


<p className="font-semibold">

{user?.username}

</p>


<p className="text-xs opacity-60">

Welcome 👋

</p>


</div>


</>

}





<button

onClick={toggleTheme}

className="p-2 rounded-lg"

>


{

darkMode

?

<Sun size={20}/>

:

<Moon size={20}/>

}


</button>



</div>



</div>



</header>


);


}



export default Navbar;