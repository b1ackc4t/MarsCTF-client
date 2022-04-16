import requests from "@/axios";
import qs from 'qs'

export function createContainer(cid) {
    return requests({
        url: `/api/user/container/create/${cid}`,
        method: 'post',
    })
}

export function getContainerForUser(cid) {
    return requests({
        url: `/api/user/container/${cid}`,
        method: 'get',
    })
}

export function destroyContainer(cid) {
    return requests({
        url: `/api/user/container/destroy/${cid}`,
        method: 'post',
    })
}

export function getContainerPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/container/${pageSize}/${pageNum}`,
        method: 'get',
    })
}

export function addTimeForAdmin(uid, cid, second) {
    return requests({
        url: `/api/admin/container/addTime/${uid}/${cid}`,
        method: 'post',
        data: qs.stringify({
            second: second
        })
    })
}

export function destroyContainerForAdmin(uid, cid) {
    return requests({
        url: `/api/admin/container/destroy/${uid}/${cid}`,
        method: 'post',
    })
}

export function addTimeForUser(cid) {
    return requests({
        url: `/api/user/container/addTime/${cid}`,
        method: 'post'
    })
}

export function searchContainerPage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/admin/container/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}