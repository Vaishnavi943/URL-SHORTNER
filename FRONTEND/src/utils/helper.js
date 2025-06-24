import { login } from "../store/slice/authSlice.js";
import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";

export const checkAuth = async ({context}) => {

    try{
        const {queryClient, store} = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser
        })
        if(!user) return false;
        store.dispatch(login(user))

        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true;
    }catch(err){
        console.log(err)
        return redirect({to: '/auth',})
    }
}