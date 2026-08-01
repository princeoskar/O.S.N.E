import { auth, db } from "./firebase.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let editId = null;

const fields = [
    "date",
    "name",
    "cash",
    "system",
    "out1",
    "out2",
    "out3",
    "out4",
    "out5",
    "till",
    "reason",
    "count",
    "confirmTill"
];

onAuthStateChanged(auth, user => {

    if (!user) {
        location = "login.html";
        return;
    }

    loadRecords(user.uid);

});

logoutBtn.onclick = () => {

    signOut(auth);

};

function number(id){

    return Number(document.getElementById(id).value || 0);

}

function calculateDifference(){

    const diff =
        number("cash")
        - number("system")
        - number("out1")
        - number("out2")
        - number("out3")
        - number("out4")
        - number("out5");

    difference.textContent = diff.toFixed(2);

}

[
"cash",
"system",
"out1",
"out2",
"out3",
"out4",
"out5"

].forEach(id=>{

document.getElementById(id).addEventListener(

"input",

calculateDifference

);

});

saveBtn.onclick = async () => {

    const user = auth.currentUser;

    const data = {

        uid: user.uid,

        date: date.value,

        name: name.value,

        cash: number("cash"),

        system: number("system"),

        out1: number("out1"),

        out2: number("out2"),

        out3: number("out3"),

        out4: number("out4"),

        out5: number("out5"),

        till: number("till"),

        reason: reason.value,

        count: count.value,

        confirmTill: number("confirmTill"),

        difference: Number(difference.textContent),

        created: Date.now()

    };

    if(editId){

        await updateDoc(doc(db,"counts",editId),data);

        editId = null;

        saveBtn.textContent = "Save Record";

    }else{

        await addDoc(collection(db,"counts"),data);

    }

    clearForm();

    loadRecords(user.uid);

};

async function loadRecords(uid){

    records.innerHTML = "";

    const q = query(

        collection(db,"counts"),

        where("uid","==",uid)

    );

    const snap = await getDocs(q);

    snap.forEach(d=>{

        const r = d.data();

        const tr = document.createElement("tr");

        tr.innerHTML = `

<td>${r.date}</td>

<td>${r.name}</td>

<td>${r.cash}</td>

<td>${r.system}</td>

<td>${r.till}</td>

<td>${r.difference}</td>

<td>

<button onclick="window.editRecord('${d.id}')">

Edit

</button>

<button onclick="window.deleteRecord('${d.id}')">

Delete

</button>

</td>

`;

        records.appendChild(tr);

    });

}

window.deleteRecord = async(id)=>{

    if(confirm("Delete this record?")){

        await deleteDoc(doc(db,"counts",id));

        loadRecords(auth.currentUser.uid);

    }

};

window.editRecord = async(id)=>{

    const snap = await getDocs(

        query(collection(db,"counts"))

    );

    snap.forEach(d=>{

        if(d.id===id){

            const r=d.data();

            fields.forEach(f=>{

                if(document.getElementById(f))

                    document.getElementById(f).value=r[f];

            });

            difference.textContent=r.difference;

            editId=id;

            saveBtn.textContent="Update Record";

        }

    });

};

function clearForm(){

    fields.forEach(f=>{

        if(document.getElementById(f))

            document.getElementById(f).value="";

    });

    difference.textContent="0.00";

}
