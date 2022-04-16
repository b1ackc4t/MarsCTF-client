import requests from "@/axios";
import qs from 'qs'

export function getCommentByPage(cid, pageSize, pageNum) {
    return requests({
        url: `/api/user/chaComment/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            cid: cid
        }
    })
}

export function saveComment(comment) {
    return requests({
        url: '/api/user/chaComment/save',
        method: 'post',
        data: qs.stringify({
            data: JSON.stringify(comment)
        })
    })
}

export function removeComment(ccid) {
    return requests({
        url: '/api/user/chaComment/remove',
        method: 'post',
        data: qs.stringify({
            ccid: ccid
        })
    })
}