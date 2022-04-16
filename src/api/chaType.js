import requests from "@/axios";
import qs from 'qs'

export function getAllType() {
    return requests({
        url: '/api/chaType',
        method: 'get'
    })
}

export function getAllTypeByPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/chaType/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function saveType(type) {
    return requests({
        url: '/api/admin/chaType',
        method: 'post',
        data: qs.stringify({
            action: 'save',
            data: JSON.stringify(type)
        })
    })
}

export function updateType(type) {
    return requests({
        url: '/api/admin/chaType',
        method: 'post',
        data: qs.stringify({
            action: 'update',
            data: JSON.stringify(type)
        })
    })
}

export function removeType(type) {
    return requests({
        url: '/api/admin/chaType',
        method: 'post',
        data: qs.stringify({
            action: 'remove',
            data: JSON.stringify(type)
        })
    })
}

export function searchTypePage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/admin/chaType/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}