import { root } from "./elements.js";
import { signOutFirebase } from "../controller/firebase_auth.js";

export async function VerifyPageView() {
    // Fetch the template
    const response = await fetch('/view/templates/verify_page_template.html', 
        { cache: 'no-store' });

    // Create a wrapper div and set its properties
  const divWrapper = document.createElement('div');
divWrapper.style.width = "400px";
divWrapper.classList.add('m-4', 'p-4');
divWrapper.innerHTML = await response.text();
    
    // Attach form submit event listener
    const button = divWrapper.getElementsByTagName('button')[0];
    button.onclick = signOutFirebase;

    // Clear current page rendering and append the new content
    root.innerHTML = '';
    root.appendChild(divWrapper);

}
