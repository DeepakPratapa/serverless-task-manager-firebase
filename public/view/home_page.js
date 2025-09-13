import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";



import { onSubmitCreateForm , onClickExpandCategory ,onKeydownNewIteminput, onKeyDownUpdateItem , onMouseOverItem , onMouseOutItem} from "../controller/home_controller.js";
import { onClickEventDetails ,onClickEventUpdate} from "../controller/menueventhandlers.js";

import {getCategoryTitleList } from "../controller/firestore_controller.js";
import { DEV } from "../model/constant.js";



export async function homePageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }
    const response = await fetch('/view/templates/home_page_template.html',
        {cache: 'no-store'});
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4')
    const from=divWrapper.querySelector('form');
    from.onsubmit=onSubmitCreateForm;
   
    root.innerHTML = '';
    root.appendChild(divWrapper);


    let CategoryTitleList;
    try{
        CategoryTitleList=await getCategoryTitleList(currentUser.uid);
    }catch(e){
        if(DEV) console.log('failed to get title list',e);
        alert('Failed to get title list:'+JSON.stringify(e));
        return;
    }

    const container=divWrapper.querySelector('#todo-container');
    CategoryTitleList.forEach(categoryName=>{
        container.appendChild(buildCard(categoryName));
    });

}

export function buildCard(category){
    const div=document.createElement('div');
    div.classList.add('card','d-inline-block');
    div.style="width: 25rem;";
    div.innerHTML=`
    <div id="${category.docId}" class="card-body">
         <button class="btn btn-outline-primary">+</button>
         <span class="fs-3 card-title">${category.categoryName}</span>
         </div>
    `;
    const expandbutton=div.querySelector('button');
    expandbutton.onclick=onClickExpandCategory;
    return div;

}

export function buildCardText(CategoryDocId,EventTitleList){
    const p=document.createElement('p');
    p.classList.add('card-text','d-block');
    const ul=document.createElement('ul');
    p.appendChild(ul);

    if(EventTitleList.length!=0){
        EventTitleList.forEach(item=>{
           
            ul.appendChild(createEventTitleElement(item));
        })
    }

    const newEventTitleInput=document.createElement('input');
    newEventTitleInput.size="40";
    newEventTitleInput.id="input"+CategoryDocId;
    newEventTitleInput.placeholder="Enter an item";
    newEventTitleInput.onkeydown=function(e){
    onKeydownNewIteminput(e,CategoryDocId);
    }
    p.appendChild(newEventTitleInput);
     
    return p;

}

export function createEventTitleElement(EventTitle){
    const li=document.createElement('li');
            li.id=EventTitle.docId;
            li.innerHTML=`
            <span class="d-block">${EventTitle.eventName}</span>
            <input class="d-none" type="text" value="${EventTitle.eventName}">
            <button class="btn btn-outline-success ">Add</button>
            <button class="btn btn-outline-primary">Details</button>
            `;
            li.querySelectorAll('button')[0].onclick=() => onClickEventDetails(EventTitle.docId,EventTitle.eventName);
            li.querySelectorAll('button')[1].onclick=() => onClickEventUpdate(EventTitle.docId,EventTitle.eventName);
            li.onmouseover=onMouseOverItem;
            li.onmouseout=onMouseOutItem;
            const input=li.querySelector('input');
            input.onkeydown=onKeyDownUpdateItem;
            return li;
}

