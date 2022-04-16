import requests from "@/axios";
import qs from 'qs'

export function getCommentByPage(wid, pageSize, pageNum) {
    return requests({
        url: `/api/user/wpComment/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            wid: wid
        }
    })
}

export function saveComment(comment) {
    return requests({
        url: '/api/user/wpComment/save',
        method: 'post',
        data: qs.stringify({
            data: JSON.stringify(comment)
        })
    })
}

export function removeComment(wcid) {
    return requests({
        url: '/api/user/wpComment/remove',
        method: 'post',
        data: qs.stringify({
            wcid: wcid
        })
    })
}