import { root } from "./elements.js";
import { signOutFirebase } from "../controller/firebase_auth.js";
import { currentUser } from "../controller/firebase_auth.js";
import { onSubmitCreateEventDetails } from "../controller/eventDetails_controller.js";


export async function EventPageView(e1, e2) {
    // Fetch the template
    const response = await fetch('/view/templates/event_details_page.html', 
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
    
    const eventName = e2 || 'Event Name';
    divWrapper.querySelector('#eventName').value = eventName;

    divWrapper.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        onSubmitCreateEventDetails(e1);
    });

    };



   

