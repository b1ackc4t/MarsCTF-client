import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth'
import { ElMessage } from 'element-plus';
import store from '../store';
import types from '../store/types';
import { whiteList, ROLES } from '../utils/config';

const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/Index'),
            children: [
                {
                    path: '/',
                    redirect: '/main'
                },
                {
                    path: '/main',
                    name: 'main',
                    component: () => import('../views/Main.vue')
                },
                {
                    path: '/challenge',
                    name: 'challenge',
                    component: () => import('../views/Challenge'),
                    props: route => ({
                        currentType: route.query.type,
                        currentTag: route.query.tag
                    })
                },
                {
                    path: '/myProfile',
                    name: 'myProfile',
                    component: () => import('../views/MyProfile'),
                    children: [
                        {
                            path: '/myProfile',
                            redirect: '/myProfile/challengeHistory'
                        },
                        {
                            path: '/myProfile/challengeHistory',
                            name: 'challengeHistory',
                            component: () => import('../views/myProfile/ChallengeHistory'),
                        },
                        {
                            path: '/myProfile/myWriteupPanel',
                            name: 'myWriteupPanel',
                            component: () => import('../views/myProfile/MyWriteupPanel'),
                        },
                    ]
                },
                {
                    path: '/profile/:uid',
                    name: 'profile',
                    redirect: {name: 'otherChallengeHistory'},
                    component: () => import('../views/Profile'),
                    props: true,
                    children: [

                        {
                            path: 'challengeHistory',
                            name: 'otherChallengeHistory',
                            component: () => import('../views/myProfile/ChallengeHistory'),
                            props: true,
                        },
                        {
                            path: 'writeupPanel',
                            name: 'otherWriteupPanel',
                            component: () => import('../views/profile/WriteupPanel'),
                        },
                    ]
                },
                {
                    path: '/editUserInfo',
                    name: 'editUserInfo',
                    component: () => import('../views/EditUserInfo')
                },
                {
                    path: '/trouble/:cid',
                    name: 'trouble',
                    component: () => import('../views/Trouble'),
                    props: true
                },
                {
                    path: '/result',
                    name: 'result',
                    component: () => import('../views/SubmitResult'),
                    props: true
                },
                {
                    path: '/writeupPanel',
                    name: 'writeupPanel',
                    component: () => import('../views/WriteupPanel'),
                    props: route => ({
                        type: route.query.type,
                    })
                },
                {
                    path: '/learnPanel',
                    name: 'learnPanel',
                    component: () => import('../views/LearnPanel'),
                    props: route => ({
                        type: route.query.type,
                        tag: route.query.tag,
                    })
                },
                {
                    path: '/editWP/:cid',
                    name: 'editWP',
                    component: () => import('../views/EditWP'),
                    props: true
                },
                {
                    path: '/viewWP/:wid',
                    name: 'viewWP',
                    component: () => import('../views/ViewWP'),
                    props: true
                },
                {
                    path: '/myViewWP/:wid',
                    name: 'myViewWP',
                    component: () => import('../views/MyViewWP'),
                    props: true
                },
                {
                    path: '/updateWP/:wid',
                    name: 'updateWP',
                    component: () => import('../views/UpdataWP'),
                    props: true
                },
                {
                    path: '/viewLearn/:lid',
                    name: 'viewLearn',
                    component: () => import('../views/ViewLearn'),
                    props: true
                },
                {
                    path: '/notice',
                    name: 'notice',
                    component: () => import('../views/Notice'),
                },
                {
                    path: '/viewNotice/:nid',
                    name: 'viewNotice',
                    component: () => import('../views/ViewNotice'),
                    props: true
                },
                {
                    path: '/viewRank',
                    name: 'viewRank',
                    component: () => import('../views/ViewRank'),
                },
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            redirect: '/admin/userManager',
            component: () => import('../views/admin/Index'),
            meta: {
                requireAdmin: true
            },
            children: [
                {
                    path: '/admin/userManager',
                    name: 'userManager',
                    component: () => import('../views/admin/UserManager')
                },
                {
                    path: '/admin/challengeManager',
                    name: 'challengeManager',
                    component: () => import('../views/admin/ChallengeManager')
                },
                {
                    path: '/admin/challenge/add',
                    name: 'addChallengeView',
                    component: () => import('../views/admin/challenge/AddChallengeView')
                },
                {
                    path: '/admin/challenge/edit/:id',
                    name: 'editChallengeView',
                    component: () => import('../views/admin/challenge/EditChallengeView'),
                    props: true
                },
                {
                    path: '/admin/chaTagManager',
                    name: 'chaTagManager',
                    component: () => import('../views/admin/ChaTagManager')
                },
                {
                    path: '/admin/userScore',
                    name: 'userScore',
                    component: () => import('../views/admin/UserScore')
                },
                {
                    path: '/admin/writeupManager',
                    name: 'writeupManager',
                    component: () => import('../views/admin/WriteupManager')
                },
                {
                    path: '/admin/writeupCheck',
                    name: 'writeupCheck',
                    component: () => import('../views/admin/WriteupCheck')
                },
                {
                    path: '/admin/writeupView/:wid',
                    name: 'writeupView',
                    component: () => import('../views/admin/writeup/WriteupView'),
                    props: route => ({
                        type: route.query.type,
                        wid: route.params.wid
                    })
                },
                {
                    path: '/admin/chaTypeManager',
                    name: 'chaTypeManager',
                    component: () => import('../views/admin/ChaTypeManager')
                },
                {
                    path: '/admin/learnManager',
                    name: 'learnManager',
                    component: () => import('../views/admin/LearnManager')
                },
                {
                    path: '/admin/learning/add',
                    name: 'addLearningView',
                    component: () => import('../views/admin/learn/AddLearningView')
                },
                {
                    path: '/admin/learning/edit/:lid',
                    name: 'editLearningView',
                    component: () => import('../views/admin/learn/EditLearningView'),
                    props: true
                },
                {
                    path: '/admin/containerManager',
                    name: 'containerManager',
                    component: () => import('../views/admin/ContainerManager')
                },
                {
                    path: '/admin/panelConfig',
                    name: 'panelConfig',
                    component: () => import('../views/admin/PanelConfig')
                },
                {
                    path: '/admin/noticeManager',
                    name: 'noticeManager',
                    component: () => import('../views/admin/NoticeManager')
                },
                {
                    path: '/admin/notice/add',
                    name: 'addNotice',
                    component: () => import('../views/admin/notice/AddNotice')
                },
                {
                    path: '/admin/notice/edit/:id',
                    name: 'editNotice',
                    component: () => import('../views/admin/notice/EditNotice'),
                    props: true
                },
            ]
        },
    ]
})

/**
 * 判断是否具有页面的权限
 * @param {*} route 
 * @param {*} next 
 * @param {*} user 
 */
function checkAuth(route, next, user) {
    if (user.role === ROLES.ROLE_ADMIN) {
        next()
        return
    }
    let auth = ROLES.ROLE_USER
    if (route.meta.requireAdmin) {
        auth = ROLES.ROLE_ADMIN
    }
    if (auth === user.role) {
        next()
    } else {
        ElMessage({
            message: "请先登录",
            type: 'warning',
        })
        next({ name: 'main' })
    }
}

router.beforeEach((to, from, next) => {
    if (getToken()) {
        // 是否已经请求过
        if (store.state.userStore.user !== null) {
            checkAuth(to, next, store.state.userStore.user)
            return
        }
        // 尝试请求用户信息
        store.dispatch(types.GET_USER_INFO).then(() => {
            checkAuth(to, next, store.state.userStore.user)
        }).catch((error) => {
            if (whiteList.indexOf(to.path) === -1) {
                console.log(error)
                ElMessage({
                    message: "请先登录",
                    type: 'warning',
                })
                next({ name: 'main' }) // 否则全部重定向到主页
            } else {
                next()
            }
            
        })
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
            return
        } else {
            ElMessage({
                message: "请先登录",
                type: 'warning',
            })
            next({name: 'main'}) // 否则全部重定向到主页
            return
        }
    }
})

export default router