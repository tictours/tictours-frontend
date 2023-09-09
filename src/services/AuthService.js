import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';
import { URLS } from '../constants';

export function signUp(values) {
    //axios call
    const postData = {
        username:values.username,
        email:values.email,
        password:values.password,
        c_password:values.password,
        phone:values.phone,
        first_name:values.firstName,
        secomd_name:values.secondName,
        role_id:values.roleId,
        country:values.country,
        language:values.language,
        address:values.address,
        from_date:values.fromDate,
        to_date:values.toDate,
    };
    return axios.post(
        process.env.REACT_APP_API_URL+'user/register',
        postData,
    );
}

export function login(email, password) {
    const postData = {
        username:email,
        password,
        // returnSecureToken: true,
    };
    return axios.post(
        process.env.REACT_APP_API_URL+URLS.LOGIN_URL,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse.status) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 401:
            //return 'Invalid Password';
            swal("Oops", "Invalid Username or Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + process.env.REACT_APP_EXPIRE_IN * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        //dispatch(Logout(history));
        dispatch(Logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(Logout(navigate));
		return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(Logout(navigate));
        return;
    }
		
    dispatch(loginConfirmedAction(tokenDetails));
	
    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}

export function isLogin() {
    const tokenDetailsString = localStorage.getItem('userDetails');

    if (tokenDetailsString) {
        return true;
    }else{
        return false;
    }
}
