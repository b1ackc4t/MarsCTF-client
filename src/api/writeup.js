import requests from "@/axios";
import qs from 'qs'

export function saveWriteup(writeup) {
    let form = new FormData()
    form.append("action", "save")
    form.append('data', JSON.stringify(writeup))
    return requests({
        url: '/api/user/writeup',
        method: 'post',
        data: form
    })
}

export function getWriteupByPageForUser(pageSize, pageNum) {
    return requests({
        url: `/api/user/writeup/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function getWriteupByWidForUser(wid) {
    return requests({
        url: `/api/user/writeup/${wid}`,
        method: 'get'
    })
}

export function getUnCheckWriteupByPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/writeup/uncheck/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function passWriteup(wid, score) {
    let form = new FormData()
    form.append("wid", wid)
    form.append('score', score)
    return requests({
        url: '/api/admin/writeup/uncheck/passWriteup',
        method: 'post',
        data: form
    })
}

export function rejectWriteup(wid, score) {
    let form = new FormData()
    form.append("wid", wid)
    form.append('score', score)
    return requests({
        url: '/api/admin/writeup/uncheck/rejectWriteup',
        method: 'post',
        data: form
    })
}

export function getWriteupByWidForAdmin(wid) {
    return requests({
        url: `/api/admin/writeup/${wid}`,
        method: 'get'
    })
}

export function getWriteupByPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/writeup/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function removeWriteupForAdmin(writeup) {
    return requests({
        url: '/api/admin/writeup',
        method: 'post',
        data: qs.stringify({
            action: 'remove',
            data: JSON.stringify(writeup)
        })
    })
}

export function reCheckForAdmin(wid, title) {
    return requests({
        url: '/api/admin/writeup/reCheck',
        method: 'post',
        data: qs.stringify({
            wid: wid,
            title: title
        })
    })
}

/**
 * 获取某题目的wp排名
 * @param cid
 * @returns {AxiosPromise}
 */
export function getWriteupRank(cid) {
    return requests({
        url: `/api/user/writeupRank/${cid}`,
        method: 'get'
    })
}