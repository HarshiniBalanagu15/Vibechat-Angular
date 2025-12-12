import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Chat } from './chat/chat';


export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'chat',component : Chat}
];
