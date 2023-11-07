const form=document.querySelector("#form");
const amount=document.querySelector("#sprice");
const descrip=document.querySelector("#description");
const catgory=document.querySelector("#category");
form.addEventListener('submit',onsubmit);
function onsubmit(e){
    let myoj={
    amount:amount.value,
    descrip:descrip.value,
    catgory:catgory.value
    };
    e.preventDefault();
    axios.post('https://crudcrud.com/api/6046168e1a984e8eaaf45e39aae84361/products',myoj)
    .then((res)=>showonscreen(res.data))
    .catch(err=>console.log(err));
    
    amount.value="";
    descrip.value="";
    catgory.value="";
};
function deletefn(userid){
    console.log(userid);
         axios.delete(`https://crudcrud.com/api/6046168e1a984e8eaaf45e39aae84361/products/${userid}`)
         .then((res)=> {
            removeuserfromscreen(userid);
         })
         .catch(err=>console.log(err));
}
function removeuserfromscreen(userid){
    const childnodedelt=document.getElementById(userid);
    const lists=childnodedelt.parentElement;
    if(childnodedelt){
          lists.removeChild(childnodedelt);
    }
}
function showonscreen(obj){
    let amt=obj.amount
    let des=obj.descrip
    let catg=obj.catgory
    let userid=obj._id
    const lists=document.querySelector(`#${catg}`)
    const childHTML=`<li class="list-group-item" id=${userid}>${amt} ${des} ${catg} 
    <button onclick=deletefn('${userid}') class="delete btn btn-danger mx-2">Delete</button></li>`;
    lists.innerHTML=lists.innerHTML+childHTML;
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/6046168e1a984e8eaaf45e39aae84361/products")
    .then((res)=>{
        for(var i=0;i<res.data.length;i++){
            showonscreen(res.data[i]);
        }
    } )
    .catch(err=>console.log(err));
})
