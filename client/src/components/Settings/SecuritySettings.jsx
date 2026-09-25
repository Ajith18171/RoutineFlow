import { useState } from "react";

import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import useToast from "../../hooks/useToast";
import api from "../../services/api";


function SecuritySettings() {

const { darkMode } = useTheme();

const { showToast } = useToast();


const [formData,setFormData] = useState({

currentPassword:"",
newPassword:"",
confirmPassword:""

});



const [showCurrent,setShowCurrent] = useState(false);
const [showNew,setShowNew] = useState(false);
const [showConfirm,setShowConfirm] = useState(false);





const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};





const handleSubmit = async(e)=>{

e.preventDefault();



if(
!formData.currentPassword ||
!formData.newPassword ||
!formData.confirmPassword
){

showToast(
"Please fill all fields."
);

return;

}




if(
formData.newPassword !==
formData.confirmPassword
){

showToast(
"Passwords do not match!"
);

return;

}



try{


const response =
await api.put(

"/auth/change-password",

{

currentPassword:
formData.currentPassword,


newPassword:
formData.newPassword

}

);



showToast(
response.data.message
);



setFormData({

currentPassword:"",
newPassword:"",
confirmPassword:""

});



}
catch(error){


console.log(
"Password Error:",
error.response?.data || error
);



showToast(

error.response?.data?.message ||
"Failed to update password."

);


}


};






return (


<section

className={`
rounded-3xl
p-6

${
darkMode

?
"bg-slate-900 border border-slate-800"

:

"bg-white shadow-lg"

}

`}

>


<h2 className="text-2xl font-bold mb-6">

Security Settings

</h2>





<form

onSubmit={handleSubmit}

className="space-y-5"

>





{/* Current Password */}

<div>

<label className="block mb-2 font-medium">

Current Password

</label>



<div className="relative">


<Lock

size={18}

className="
absolute
left-3
top-1/2
-translate-y-1/2
opacity-60
"

/>



<input

type={
showCurrent
?
"text"
:
"password"
}

name="currentPassword"

value={
formData.currentPassword
}

onChange={handleChange}


className={`

w-full
pl-10
pr-10
p-3
rounded-xl
border

${
darkMode

?
"bg-slate-950 border-slate-700"

:

"bg-white border-gray-300"

}

`}

/>



<button

type="button"

onClick={()=>setShowCurrent(!showCurrent)}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-500
"

>


{
showCurrent

?

<EyeOff size={18}/>

:

<Eye size={18}/>

}


</button>


</div>


</div>







{/* New Password */}

<div>

<label className="block mb-2 font-medium">

New Password

</label>


<div className="relative">


<KeyRound

size={18}

className="
absolute
left-3
top-1/2
-translate-y-1/2
opacity-60
"

/>



<input

type={
showNew
?
"text"
:
"password"
}

name="newPassword"

value={
formData.newPassword
}

onChange={handleChange}


className={`

w-full
pl-10
pr-10
p-3
rounded-xl
border

${
darkMode

?
"bg-slate-950 border-slate-700"

:

"bg-white border-gray-300"

}

`}

/>



<button

type="button"

onClick={()=>setShowNew(!showNew)}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-500
"

>


{
showNew

?

<EyeOff size={18}/>

:

<Eye size={18}/>

}


</button>


</div>


</div>








{/* Confirm Password */}

<div>

<label className="block mb-2 font-medium">

Confirm Password

</label>


<div className="relative">


<KeyRound

size={18}

className="
absolute
left-3
top-1/2
-translate-y-1/2
opacity-60
"

/>



<input

type={
showConfirm
?
"text"
:
"password"
}

name="confirmPassword"

value={
formData.confirmPassword
}

onChange={handleChange}


className={`

w-full
pl-10
pr-10
p-3
rounded-xl
border

${
darkMode

?
"bg-slate-950 border-slate-700"

:

"bg-white border-gray-300"

}

`}

/>



<button

type="button"

onClick={()=>setShowConfirm(!showConfirm)}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-500
"

>


{
showConfirm

?

<EyeOff size={18}/>

:

<Eye size={18}/>

}


</button>


</div>


</div>






<button

type="submit"

className="
bg-red-600
hover:bg-red-700
text-white
px-6
py-3
rounded-xl
transition
"

>

Update Password

</button>



</form>



</section>


);

}


export default SecuritySettings;