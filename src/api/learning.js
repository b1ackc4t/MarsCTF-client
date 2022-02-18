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