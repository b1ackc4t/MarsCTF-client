import requests from "@/axios";
import qs from 'qs'

export function saveNotice(notice) {
    return requests({
        url: '/api/admin/notice',
        method: 'post',
        data: qs.stringify({
            action: 'save',
            data: JSON.stringify(notice)
        })
    })
}

export function removeNotice(notice) {
    return requests({
        url: '/api/admin/notice',
        method: 'post',
        data: qs.stringify({
            action: 'remove',
            data: JSON.stringify(notice)
        })
    })
}

export function updateNotice(notice) {
    return requests({
        url: '/api/admin/notice',
        method: 'post',
        data: qs.stringify({
            action: 'update',
            data: JSON.stringify(notice)
        })
    })
}

export function getNoticePageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/notice/${pageSize}/${pageNum}`,
        method: 'get',
    })
}

export function getNoticeByIdForAdmin(nid) {
    return requests({
        url: `/api/admin/notice/${nid}`,
        method: 'get',
    })
}

export function getNoticePage(pageSize, pageNum) {
    return requests({
        url: `/api/notice/${pageSize}/${pageNum}`,
        method: 'get',
    })
}

export function getNoticeByIdForUser(nid) {
    return requests({
        url: `/api/user/notice/${nid}`,
        method: 'get',
    })
}

export function searchNoticePage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/admin/notice/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}