import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [



{
        path: "",
        redirectTo: "home",
        pathMatch: 'full'
    },



    {
        path: "home",
        component: HomeComponent

    },
    {

        path: "logo",
        component: HomeComponent
    },
    {
        path: "cart",
        component: CartComponent

    },


    {
        // ამასაც ვწერთ აქ ბოლოში ყოველთვის. (ახალი ტერმინალით ვქმით error componet-ს. -> new terminal -> gn g c error) wilde card - 
        // ნებისმიერ რამეს ნისნავს, ანუ თუ მომხმარებელმა ნებისმიერი რამე რომ სემოიყვანოს, გადაიყვანე რამე კომპონენტზე.
        path: '**',
        component: ErrorComponent
    },




];





