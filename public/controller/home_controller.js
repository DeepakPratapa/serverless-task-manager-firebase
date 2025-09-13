import { currentUser } from "./firebase_auth.js";
import { addCategoryTitle, addEventTitle,getEventTitleList, deleteEventItem, deleteEventTitle , updateEventTitle,getEventItemDocId} from "./firestore_controller.js";




import { Category } from "../model/category.js";
import { DEV } from "../model/constant.js";
import { progressMessage } from "../view/progress_message.js";
import { buildCard ,buildCardText , createEventTitleElement} from "../view/home_page.js";
import { Events } from "../model/events.js";


export async function onSubmitCreateForm(e){
    e.preventDefault();
    const categoryName=e.target.title.value;
    const uid=currentUser.uid;
    const timestamp=Date.now();
    const CategoryTitle=new Category({categoryName,uid,timestamp});

    const progress=progressMessage('Creating...');
    e.target.prepend(progress);

    let docId;
    try{
        docId=await addCategoryTitle(CategoryTitle);
        CategoryTitle.set_docId(docId);
    }catch(e){
        if(DEV) console.log('failed to create: ',e);
        alert('Failed to create:'+JSON.stringify(e));
        progress.remove();
        return;
    }
    progress.remove();

    const container =document.getElementById('todo-container');
    container.prepend(buildCard(CategoryTitle));
    e.target.title.value='';
}

export async function onClickExpandCategory(e){
    const button=e.target;
    const cardBody=button.parentElement;
    if(button.textContent=='+'){
        const cardText=cardBody.querySelector('.card-text');
        
        if(!cardText){
            const progress=progressMessage('Loading item list ...');
            button.parentElement.prepend(progress);
            let EventList;
            try {
                EventList=await getEventTitleList(cardBody.id,currentUser.uid);
            } catch (e) {
                if (DEV) console.log('failed to get item list',e);
                alert('Failed to get item list: '+JSON.stringify(e));
                progress.remove();
                return;
            }
            progress.remove();
            cardBody.appendChild(buildCardText(cardBody.id,EventList));
        }else{
            cardText.classList.replace('d-none','d-block');
        }
        button.textContent="-";
    }else{
        const cardText=cardBody.querySelector('.card-text');
        cardText.classList.replace('d-block','d-none');
        button.textContent='+';
    }
}


export async function onKeydownNewIteminput(e,CategoryDocId){
    if(e.key!="Enter")return;
    const eventName=e.target.value;
    const categoryId=CategoryDocId;
    const uid=currentUser.uid;
    const timestamp=Date.now();
    const Event= new Events({
      categoryId, uid, eventName, timestamp,
    });
    const progress=progressMessage('Adding item ...');
    e.target.parentElement.prepend(progress);

    try{
      const docId=await addEventTitle(Event);
      Event.set_docId(docId);
    }catch(e){
      if(DEV)console.log('Failed to add item',e);
      alert('Failed to save ToDo Item '+JSON.stringify(e));
      progress.remove();
      return;
    }
    progress.remove();

    const li=createEventTitleElement(Event);
    const cardBody=document.getElementById(e.target.id.substring(5));
    cardBody.querySelector('ul').appendChild(li);
    e.target.value='';




}


export async function onKeyDownUpdateItem(e){
    if(e.key!='Enter')return;
    const li=e.target.parentElement;
    console.log(li.id);
    const progress=progressMessage('Updating ...');
    let uid = currentUser.uid;
    li.parentElement.prepend(progress);
    const content=e.target.value.trim();
    
    if(content.length==0){
        try{
            let eventId = await getEventItemDocId(li.id, uid)
            console.log(eventId);
            if(eventId != null){
                await deleteEventItem(eventId);
            }
            await deleteEventTitle(li.id);
            console.log('delete');
            li.remove();
        }catch(e){
            if (DEV) console.log('failed to delete',e);
            alert('Failed to delete: '+JSON.stringify(e));
        }
    }else{
       const update={content};
       try {
         await updateEventTitle(li.id,update);
         const span=li.children[0];
         span.textContent=content;
         const input=li.children[1];
         input.value=content;
       } catch (e) {
        if(DEV)console.log('failed to update',e);
        alert('Failed to update: '+JSON.stringify(e));
       }
    }
  
    progress.remove();
  
  }


export function onMouseOverItem(e){
  const span=e.currentTarget.children[0];
  const input=e.currentTarget.children[1];
  span.classList.replace('d-block','d-none');
  input.classList.replace('d-none','d-block');
}

export function onMouseOutItem(e){
  const span=e.currentTarget.children[0];
  const input=e.currentTarget.children[1];
  input.value=span.textContent;
  span.classList.replace('d-none','d-block');
  input.classList.replace('d-block','d-none');
  
}




