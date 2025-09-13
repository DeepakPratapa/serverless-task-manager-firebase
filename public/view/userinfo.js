import { root } from "./elements.js";
// import {onClickResetPassword } from "../controller/userpage_controller.js";
import {currentUser } from "../controller/firebase_auth.js";
import {passwordReset} from "../controller/firebase_auth.js";
import { auth } from "../controller/firebase_auth.js";
import { onSubmitCreateUserDetails, getUserInfoDetails} from "../controller/userpage_controller.js";

export async function UserPageView() {
    // Fetch the template
    const response = await fetch('/view/templates/user_info_page_template.html', 
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

    let email = currentUser.email;
    divWrapper.querySelector('#email').value = email;
    getUserInfoDetails();
    

    divWrapper.getElementsByTagName('button')[0].onclick = () => {
        passwordReset(auth,email);
    }

    divWrapper.getElementsByTagName('button')[1].onclick = () => {

        onSubmitCreateUserDetails();
    }

}