import { root } from "./elements.js";
import { signOutFirebase } from "../controller/firebase_auth.js";
import { currentUser } from "../controller/firebase_auth.js";
import { onSubmitUpdateEvent } from "../controller/eventUpdate_controller.js";
import { DEV } from "../model/constant.js";
import { getEventItemList } from "../controller/firestore_controller.js";


export async function EventUpdatePageView(e1, e2) {
    // Prevent page reload on form submission
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
    });

    // Fetch the template
    const response = await fetch('/view/templates/event_update.html', 
        { cache: 'no-store' });

    // Create a wrapper div and set its properties
    const divWrapper = document.createElement('div');
    divWrapper.style.width = "400px";
    divWrapper.classList.add('m-4', 'p-4');
    divWrapper.innerHTML = await response.text();
    
    // Attach form submit event listener

    // Clear current page rendering and append the new content
    root.innerHTML = '';
    root.appendChild(divWrapper);

    const uid = currentUser.uid;
    let EventItemList;
    try {
        EventItemList = await getEventItemList(e1, uid);
    } catch (e) {
        if (DEV) console.log('failed to get item list', e);
        alert('Failed to get item list: ' + JSON.stringify(e));
        return;
    }
    console.log(EventItemList);
    const eventNameInput = document.getElementById('eventName');
    const descriptionInput = document.getElementById('description');
    const dueDateInput = document.getElementById('dueDate');
    const notificationMethodsSelect = document.getElementById('notificationMethods');
    const reminderIntervalsSelect = document.getElementById('reminderIntervals');
    
    eventNameInput.value = e2;
    descriptionInput.value = EventItemList[0].description;
    dueDateInput.value = EventItemList[0].dueDates;
    notificationMethodsSelect.value = EventItemList[0].notificationMethods;
    reminderIntervalsSelect.value = EventItemList[0].reminderIntervals;



  divWrapper.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        onSubmitUpdateEvent(e1);
    });
}