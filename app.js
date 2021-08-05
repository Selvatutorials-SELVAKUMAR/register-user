const loginForm = document.querySelectorAll('.login-signup')[0]

const signupForm = document.querySelectorAll('.login-signup')[1]

const nav_to_login = document.querySelector('#nav-to-login')

const nav_to_signup = document.querySelector('#nav-to-signup')

const login_submit = document.querySelector('#login-submit')

const signup_submit = document.querySelector('#signup-submit')

const details = document.querySelector('.user-details')
const newUser = {
    userName : '',
    email : '',
    password : '',
    login : false
}
const oldUser = {
    email : '',
    password : ''
}
const initialRender = () => {
    if(localStorage.length === 0){
        loginForm.style.display = 'none'
        signupForm.style.display = 'block'
    } else if(sessionStorage.length === 0){
        signupForm.style.display = 'none'
        loginForm.style.display = 'block'
    } else if(sessionStorage.length === 1){
        loginForm.style.display = 'none'
        signupForm.style.display = 'none'
        const currentuser = JSON.parse(sessionStorage.getItem('currently_loggedIn'))
        userDetails(currentuser)
    } else {
        signupForm.style.display = 'none'
        loginForm.style.display = 'block'
    }
}
window.onload = () => {
    details.style.display = 'none'
   initialRender()
}
nav_to_login.addEventListener('click' , () => {
    signupForm.style.display = 'none'
    loginForm.style.display = 'block'
})

nav_to_signup.addEventListener('click' , () => {
    loginForm.style.display = 'none'
    signupForm.style.display = 'block'
})
const userDetails = currentuser => {
    details.style.display = 'block'
    const h1 = details.children[0]
    h1.textContent = `UserName = ${currentuser.userName} , Email = ${currentuser.email}`
    const logOut = details.children[1]
    logOut.textContent = 'LogOut'
    logOut.addEventListener('click' , () => {
        sessionStorage.removeItem('currently_loggedIn')
        details.style.display= 'none'
        document.querySelector('#login').reset()
        initialRender()
    }) 
}
login_submit.addEventListener('click' , event => {
    let bool = false
    let currentuser
    event.preventDefault()
    const email = document.querySelector('#login-email').value 
    oldUser.email = email
    const password = document.querySelector('#login-pwd').value
    oldUser.password = password
    const allUsers = JSON.parse(localStorage.getItem('all_users'))
    if(localStorage.length > 0){
        allUsers.forEach(item => {
            if(item.email === oldUser.email && item.password === oldUser.password){
               bool = true
               currentuser = item
            }
        })
        if(bool){
            swal({
                title : 'Login Success',
                icon : 'success'
            }).then(() => {
                sessionStorage.setItem('currently_loggedIn',JSON.stringify(currentuser))
                loginForm.style.display = 'none'
                userDetails(currentuser)
            })
        } else {
            swal({
                title : 'Login failed',
                icon : 'warning'
            })
        }
    } else {
        swal({
            title : 'Login failed',
            icon : 'warning'
        })
    }
})

signup_submit.addEventListener('click' , event => {
    event.preventDefault()
    let users
    let bool = false
    if(localStorage.length > 0){
        let oldusers
        oldusers = JSON.parse(localStorage.getItem('all_users'))
        users = [...oldusers]
    } else {
        users = []
    }
    const userName = document.querySelector('#signup-username').value
    newUser.userName =userName
    const email = document.querySelector('#signup-email').value
    newUser.email =email 
    const password = document.querySelector('#signup-pwd').value
    newUser.password = password
    if(users.length > 0){
        users.forEach(item => {
            if(newUser.email === item.email){
                bool = true 
            }
        })
    }
    if(bool){
        swal({
            title : 'You already have an Account',
            icon : 'warning'
        })
    } else {
        users.push(newUser)
        localStorage.setItem('all_users',JSON.stringify(users))
        swal({
            title : 'Account Created SuccessFully Try Login',
            icon : 'success'
        }).then(() => {
            document.querySelector('#signup').reset()
            signupForm.style.display = 'none'
            loginForm.style.display = 'block'
        })
    }
})