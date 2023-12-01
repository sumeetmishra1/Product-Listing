const form=document.querySelector("#form");
const amount=document.querySelector("#sprice");
const descrip=document.querySelector("#description");
const catgory=document.querySelector("#category");
form.addEventListener('submit',onsubmit);
async function onsubmit(e){
    let myoj={
    amount:amount.value,
    descrip:descrip.value,
    catgory:catgory.value
    };
    e.preventDefault();
    try{
    let post=await axios.post('https://crudcrud.com/api/1872b3c4f4594b80a851bb7368737e64/products',myoj)
    showonscreen(post.data)
    }
    catch(e){
        console.log(e)
    }
    amount.value="";
    descrip.value="";
    catgory.value="";
};
async function deletefn(userid){
    console.log(userid);
    try{
        await axios.delete(`https://crudcrud.com/api/1872b3c4f4594b80a851bb7368737e64/products/${userid}`) 
        removeuserfromscreen(userid)
    }
    catch(e){
        console.log(e);
    }
         
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
window.addEventListener("DOMContentLoaded",async()=>{
    try{
    let items=await axios.get("https://crudcrud.com/api/1872b3c4f4594b80a851bb7368737e64/products")
        for(var i=0;i<items.data.length;i++){
            showonscreen(items.data[i]);
        }
    } 
    catch(e){
        console.log(e)
    }
})