var m1 = "1.Click on the Binoculars to view data";
var m2 = "2.Clcik on the user plus icon to add data";
var cm = m1 + "\n" + m2;
alert(cm);
var addro=document.getElementById("addrow");
addro.classList.add("visi")
var page=document.querySelector("#top");
var row= document.createElement('div')
// page.appendChild(addro)
var data=[];
var mockapi="https://64ce23700c01d81da3ee8ac8.mockapi.io/users";
async function inser(){
  // document.body.removeChild(newTBody);
  clos();

 try{ 
var ret=await fetch(mockapi);
data= await ret.json()
// Clear the existing table body
    var table = document.getElementById('datatable');
    var tbody = table.querySelector('tbody');
    if (tbody) {
      table.removeChild(tbody);
    }

    // // Create a new <tbody> element
    // var newTBody = document.createElement('tbody');

    // // Append the new <tbody> element to the table
    // table.appendChild(newTBody);
createTable(data);
 }catch(error){
  console.error("error occured",error)
 }
}


function createTable(data) {
 

  //   var tableBody = document.getElementById('datatable').getElementsByTagName('tbody')[0];
  //   var tableBody = document.createElement('table')
  //  tableBody.id="datatable"
  //  tableBody.createElement('tbody')[0];
  // Find the table element by its id
var table = document.getElementById('datatable');

// Create a new <tbody> element
var newTBody = document.createElement('tbody');

// Append the new <tbody> element to the table
table.appendChild(newTBody);

    data.forEach(item => {
      const row = newTBody.insertRow();

      row.insertCell(0).textContent = item.name;
      row.insertCell(1).textContent = item.age;
      row.insertCell(2).textContent = item.state;
      row.id=item.id;
      const editb1=row.insertCell(3);
      // edit(item);
      editb1.innerHTML=`
      <button usid="${item.id}" style="background-color:blue; border:none; height:20px " onclick="edit(${item.id})">Edit <i class="fa-solid fa-pen fa-lg"></i></button>
      <button usid="${item.id}" style="background-color:red; border:none; height:20px " onclick="del(${item.id  })">Delete <i class="fa-solid fa-trash fa-lg"></i></button>
      <button usid="${item.id}" id="${item.name}" style="background-color:Green; border:none; height:20px" onclick="upd(${item.id})" >Update <i class="fa-regular fa-circle-dot fa-lg"></i></button>`
      const dis=document.getElementById(item.name);
      dis.style.visibility="hidden";
      if(!item.id){
        dis.style.visibility="hidden";
      }
    }
      )}



function adduser(){
  var na=document.querySelector("#name").value;
  var age=document.querySelector("#age").value;
  var stat=document.querySelector("#state").value;
  if(na=="" || age=="" || stat==""){
    alert("enter complete data")
    return;
  }
  fetch(mockapi,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
    },
    body:JSON.stringify({
      name:na,
      age:age,
      state:stat,
    }),
  })
  .then((response)=>response.json())
  .then((data)=>{
    // alert("ho")
    
  
  inser();
    // alert("vamm")
 
  })
  .catch((error)=>console.error("Error occured:",error));
}



  function edit(user){
    var h=JSON.stringify(data)
    var hp=JSON.parse(h);
    var users=hp.find(us=>us.id==user);
    // alert(`${JSON.stringify(users.name)}`)
    const but=document.getElementById(`${users.id}`)
    but.style.backgroundColor="lavender"
    const dis=document.getElementById(users.name);
    dis.style.visibility="visible";
   

    var but1=but.querySelector("td:nth-child(1)")
    but1.innerHTML=`<input id="updnam" type="text" value="${users.name}">`;
    but1.dataset.originalValue=but1.textContent;
    
    var but2=but.querySelector("td:nth-child(2)")
    but2.innerHTML=`<input id="updage" type="text" value="${users.age}">`;
    but2.dataset.originalValue=but2.textContent;

    var but3=but.querySelector("td:nth-child(3)")
    but3.innerHTML=`<input id="updstat" type="text" value="${users.state}">`;
    but3.dataset.originalValue=but3.textContent;
    // upd(users)
  }


  function del(user){
    if(confirm("confirm delete")){
      fetch(`${mockapi}/${user}`,{
        method:"DELETE",
      })
      .then(()=>{
        inser();
      })
      .catch((error)=>console.error("error occurred:",error));
    }
  }



  function upd(users){
    // alert(users.id)
      var name=document.querySelector("#updnam").value;
      var age=document.querySelector("#updage").value;
      var state=document.querySelector("#updstat").value;
      // const dis=document.getElementById(users.name);
      // dis.style.visibility="hidden";
      const upduser={
        name,
        age,
        state,
      };
      fetch(`${mockapi}/${users}`,{
        method:"PUT",
        headers:{
          "content-Type":"application/json",
        },
        body:JSON.stringify(upduser),
      })
      .then(()=>{
        inser();
        
       
      })
      .catch((error)=>console.error("Error updating user:",error));
  }


  function op(){
    addro.classList.remove("visi");
  }


  function clos(){
    addro.classList.add("visi");
  }
  
  // inser();



