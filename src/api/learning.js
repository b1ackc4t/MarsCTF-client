import requests from "@/axios";
import qs from 'qs'

export function saveLearning(learning) {
    return requests({
        url: '/api/admin/learning',
        method: 'post',
        data: qs.stringify({
            action: 'save',
            data: JSON.stringify(learning)
        })
    })
}

export function getLearningByPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/learning/${pageSize}/${pageNum}`,
        method: 'get',
    })
}

export function removeLearning(learning) {
    return requests({
        url: '/api/admin/learning',
        method: 'post',
        data: qs.stringify({
            action: 'remove',
            data: JSON.stringify(learning)
        })
    })
}

export function updateLearning(learning) {
    return requests({
        url: '/api/admin/learning',
        method: 'post',
        data: qs.stringify({
            action: 'update',
            data: JSON.stringify(learning)
        })
    })
}

export function getLearningByLidForAdminEdit(lid) {
    return requests({
        url: `/api/admin/learning/${lid}`,
        method: 'get',
    })
}

export function getLearningByPageForUser(pageSize, pageNum) {
    return requests({
        url: `/api/user/learning/${pageSize}/${pageNum}`,
        method: 'get',
    })
}

export function getLearningByTypePageForUser(pageSize, pageNum, tname) {
    return requests({
        url: `/api/user/learning/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            type: tname
        }
    })
}

export function getLearningByTagPageForUser(pageSize, pageNum, tgname) {
    return requests({
        url: `/api/user/learning/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            tag: tgname
        }
    })
}

export function getLearningByLidForUser(lid) {
    return requests({
        url: `/api/user/learning/${lid}`,
        method: 'get',
    })
}

export function getChallengeByLidForUser(lid) {
    return requests({
        url: `/api/user/learning/getChallenge/${lid}`,
        method: 'get',
    })
}

export function searchLearnPage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/admin/learning/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}