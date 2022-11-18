//chrome://extensions/

let myLeads = []
let inputEl = document.getElementById("input-el");
const btn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("List-el");

 
 const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

 if (leadsFromLocalStorage) {
     myLeads = leadsFromLocalStorage
     render(myLeads)
 }


 tabBtn.addEventListener("click",function(){
   chrome.tabs.query({active: true, currentWindow : true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify( myLeads))
    render(myLeads)
   } )
 })

 function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
     <a target='_blank' href='${leads[i]}' >
    ${myLeads[i]}
     </a>
    </li>`;
  }

  ulEl.innerHTML = listItems;
}


 deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  myLeads = []
  render(myLeads)
 })

btn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads);
});


