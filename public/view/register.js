import { root } from "./elements.js";
import { handleSignUp , validatePassword } from "../controller/firebase_auth.js";
import { onClickVerify } from "../controller/menueventhandlers.js";


export async function RegisterPageView() {


 const response = await fetch('/view/templates/register_page_template.html',
        {cache: 'no-store'}
    );

const divWrapper = document.createElement('div');
divWrapper.style.width = "400px";
divWrapper.classList.add('m-4', 'p-4');
divWrapper.innerHTML = await response.text();



divWrapper.getElementsByTagName('form')[0].addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  validatePassword(password);
  if(password)
  handleSignUp(email, password);
  onClickVerify();
});

  
root.innerHTML = '';
root.appendChild(divWrapper);


}