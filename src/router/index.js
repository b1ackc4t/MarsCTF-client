import { createRouter, createWebHistory } from 'vue-router'

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

export default router