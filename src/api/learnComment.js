import requests from "@/axios";
import qs from 'qs'

export function getCommentByPage(lid, pageSize, pageNum) {
    return requests({
        url: `/api/user/learnComment/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            lid: lid
        }
    })
}

export function saveComment(comment) {
    return requests({
        url: '/api/user/learnComment/save',
        method: 'post',
        data: qs.stringify({
            data: JSON.stringify(comment)
        })
    })
}

export function removeComment(lcid) {
    return requests({
        url: '/api/user/learnComment/remove',
        method: 'post',
        data: qs.stringify({
            lcid: lcid
        })
    })
}