import { homePageView } from "../view/home_page.js"
import { Menu2PageView } from "../view/menu2_page.js"
import { RegisterPageView } from "../view/register.js";
import { UserPageView } from "../view/userinfo.js";
import { VerifyPageView } from "../view/verify.js";
import { EventPageView } from "../view/event_details.js";
import { EventUpdatePageView } from "../view/event_update.js";

export const routePathenames = {
    HOME: '/',
    MENU2: '/menu2',
    REGISTER: '/signup',
    VERIFY:'/verify',
    USER:'/userInfo',
    EVENTDETAIL:'/eventDetails',
    EVENTUPDATE:'/eventUpdate'
}
export const routes = [
    {path: routePathenames.HOME, page: homePageView},
    {path: routePathenames.MENU2, page: Menu2PageView},
    {path: routePathenames.REGISTER, page: RegisterPageView},
    {path: routePathenames.VERIFY, page: VerifyPageView},
    {path: routePathenames.USER, page: UserPageView},
    {path: routePathenames.EVENTDETAIL, page: EventPageView},
    {path: routePathenames.EVENTUPDATE, page: EventUpdatePageView}

];
export function routing(pathname, hash) {
    const route = routes.find(r => r.path == pathname);
    if (route) {
        if (hash && hash.length > 1) {
            route.page(hash.substring(1));
        } else {
            route.page();
        }
               
    } else {
        routes[0].page();
    }
}