import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

import {
  Home,
  User,
  Plus,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  X,
  Timer,
  Flame
} from "lucide-react";


function Sidebar({ isOpen, closeSidebar }) {


  const { darkMode } = useTheme();

  const location = useLocation();

  const navigate = useNavigate();


  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  const menuItems = [

    {
      name:"Dashboard",
      icon:Home,
      path:"/dashboard"
    },

    {
      name:"90 Day Challenge",
      icon:Flame,
      path:"/challenge"
    },

    {
      name:"My Schedule",
      icon:Calendar,
      path:"/schedule"
    },


    {
      name:"Calendar",
      icon:Calendar,
      path:"/calendar"
    },


    {
      name:"Focus",
      icon:Timer,
      path:"/focus"
    },

    

    {
      name:"Add Schedule",
      icon:Plus,
      path:"/schedule/add"
    },


    {
      name:"Reports",
      icon:BarChart3,
      path:"/reports"
    },


    {
      name:"Profile",
      icon:User,
      path:"/profile"
    },


    {
      name:"Settings",
      icon:Settings,
      path:"/settings"
    }

  ];





  const handleLogout=()=>{

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

    closeSidebar();

  };






return (

<>


{
isOpen &&

<div

onClick={closeSidebar}

className="
fixed
inset-0
bg-black/40
z-40
"

/>

}




<motion.aside


initial={{
x:-300
}}


animate={{
x:isOpen ? 0 : -300
}}


transition={{
duration:0.3
}}


className={`
fixed
top-0
left-0
h-full
w-72
z-50
shadow-2xl

${
darkMode

?

"bg-slate-900 border-r border-slate-800 text-white"

:

"bg-white text-gray-900"

}

`}


>



<div className="flex items-center justify-between p-6 border-b">


<h2 className="text-2xl font-bold text-blue-600">

RoutineFlow

</h2>


<button

onClick={closeSidebar}

>

<X size={22}/>

</button>


</div>





<div className="mx-5 mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">


<div className="flex items-center gap-3">


<div className="
w-14
h-14
rounded-full
bg-blue-600
flex
items-center
justify-center
text-white
text-xl
font-bold
">

{
user?.username?.charAt(0)
?.toUpperCase()
||
"U"
}


</div>



<div>

<h3 className="font-bold">

{user?.username || "User"}

</h3>


<p className="text-sm opacity-70">

{user?.email}

</p>


</div>


</div>


</div>





<nav className="
mt-8
px-4
space-y-2
">


{

menuItems.map((item)=>{


const Icon=item.icon;


const active =
location.pathname===item.path;



return (

<Link

key={item.path}

to={item.path}

onClick={closeSidebar}


className={`
flex
items-center
gap-4
px-4
py-3
rounded-xl

${
active

?

"bg-blue-600 text-white"

:

darkMode

?

"hover:bg-slate-800 text-slate-300"

:

"hover:bg-blue-50"

}

`}

>


<Icon size={20}/>


<span>

{item.name}

</span>


</Link>


)


})


}


</nav>






<div className="
absolute
bottom-0
w-full
p-5
border-t
">


<button

onClick={handleLogout}

className="
w-full
flex
items-center
justify-center
gap-3
py-3
rounded-xl
bg-red-100
text-red-60
"

>


<LogOut size={20}/>

Logout


</button>


</div>





</motion.aside>



</>

);


}


export default Sidebar;