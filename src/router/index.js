import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
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
                    component: () => import('../views/Profile'),
                    props: true
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
                    props: true
                },
                {
                    path: '/learnPanel',
                    name: 'learnPanel',
                    component: () => import('../views/LearnPanel'),
                    props: route => ({
                        type: route.query.type,
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
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('../views/admin/Index'),
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
            ]
        },
    ]
})

export default router