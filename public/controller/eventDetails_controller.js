import { currentUser } from "./firebase_auth.js";
import {  addEventItem} from "./firestore_controller.js";
import { progressMessage } from "../view/progress_message.js";
import { EventInfo } from "../model/eventInfo.js";
import { DEV } from "../model/constant.js";



export async function onSubmitCreateEventDetails (EventDocId){

    const eventId=EventDocId;
    const uid=currentUser.uid;
    const timestamp=Date.now();
    const description = document.getElementById('description').value;;
    const relevantAttachment = document.getElementById('attachment').files[0] || null;
    const dueDates =document.getElementById('dueDate').value;
    const notificationMethods = document.getElementById('notificationMethods').value;
    const reminderIntervals =  document.getElementById('reminderIntervals').value;
    const EventItems= new EventInfo({
      eventId, uid, timestamp,description, relevantAttachment,dueDates,notificationMethods,reminderIntervals
    });
    const progress=progressMessage('Adding item ...');
    document.getElementById('eventDetailsForm').prepend(progress);

    try{
      const docId=await addEventItem(EventItems);
      EventItems.set_docId(docId);
    }catch(e2){
      if(DEV)console.log('Failed to add item',e2);
      alert('Failed to save ToDo Item '+JSON.stringify(e2));
      progress.remove();
      return;
    }
    progress.remove();



}
