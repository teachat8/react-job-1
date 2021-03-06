// import Register from "../cintainer/register/register";
import axios from 'axios';
import { getRedirectPath } from '@/util.js'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LONGIN_SUCCESS = 'LONGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
// reducer
const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
export function user(state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg:'', redirectTo: getRedirectPath(action.payload), isAuth:true, ...action.payload}
    case LONGIN_SUCCESS:
      return {...state, msg:'', redirectTo: getRedirectPath(action.payload), isAuth:true, ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg: action.msg}
    default:
      return state
  }
}

function registerMsg(data) {
  return { type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess(data) {
  return { type: LONGIN_SUCCESS, payload: data}
}
function errorMsg(msg) {
  return { msg: msg, type: ERROR_MSG }
}
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo}
}

export function userinfo() {
  // 获取用户信息
  return dispatch =>{
    axios
      .get('/user/info')
      .then(res=>{
          if (res.status === 200) {
              if (res.data.code === 0) {
                //   登录成功的
                console.log(res.data)
                this.props.loadData(res.data.data)                
              } else {
                //   没有登录的
                this.props.history.push('/login')              
              }
          }
      })
      .catch(err => {
          console.log(err)
      })
  }
}



export function regisger({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    console.log(pwd, repeatpwd)
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/resgister', { user, pwd, type }).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerMsg({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login ({user, pwd}) {
  console.log('1',user, '2', pwd)
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res=> {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }        
    })
  }
}


