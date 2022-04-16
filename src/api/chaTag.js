import requests from "@/axios";


export function getAllChaTagByPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/chaTag/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function saveChaTag(tag) {
    let form = new FormData()
    form.append('action', 'save')
    form.append('data', JSON.stringify(tag))
    return requests({
        url: '/api/admin/chaTag',
        method: 'post',
        data: form
    })
}

export function updateChaTag(tag) {
    let form = new FormData()
    form.append('action', 'update')
    form.append('data', JSON.stringify(tag))
    return requests({
        url: '/api/admin/chaTag',
        method: 'post',
        data: form
    })
}

export function removeChaTag(tag) {
    let form = new FormData()
    form.append('action', 'remove')
    form.append('data', JSON.stringify(tag))
    return requests({
        url: '/api/admin/chaTag',
        method: 'post',
        data: form
    })
}

export function getChaTagAndTypeForAdmin() {
    return requests({
        url: '/api/admin/chaTagAndType',
        method: 'get',
    })
}

/**
 * 根据类型查询所有标签
 * @param type
 * @returns {AxiosPromise}
 */
export function getChaTagsByType(type) {
    return requests({
        url: '/api/chaTag',
        method: 'get',
        params: {
            type: type
        }
    })
}

export function getChaTags() {
    return requests({
        url: '/api/chaTag',
        method: 'get',
    })
}

export function searchTagPage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/admin/chaTag/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}
