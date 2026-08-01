import {auth} from "./firebase.js";

import {

signInWithEmailAndPassword,

createUserWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const login=document.getElementById("loginBtn");

const signup=document.getElementById("signupBtn");

if(login){

login.onclick=()=>{

signInWithEmailAndPassword(

auth,

email.value,

password.value

)

.then(()=>{

location="dashboard.html";

})

.catch(e=>alert(e.message));

};

}

if(signup){

signup.onclick=()=>{

createUserWithEmailAndPassword(

auth,

email.value,

password.value

)

.then(()=>{

location="dashboard.html";

})

.catch(e=>alert(e.message));

};

}
