import requests from "@/axios";
import qs from 'qs'

/**
 * 分页查询题目信息 管理员专属
 * @param pageSize
 * @param pageNum
 * @returns {AxiosPromise}
 */
export function getAllChallengeByPageForAdmin(pageSize, pageNum) {
    return requests({
        url: `/api/admin/challenge/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function saveChallenge(challenge) {
    return requests({
        url: '/api/admin/challenge',
        method: 'post',
        data: qs.stringify({
            action: 'save',
            data: JSON.stringify(challenge)
        })
    })
}

export function removeChallenge(challenge) {
    return requests({
        url: '/api/admin/challenge',
        method: 'post',
        data: qs.stringify({
            action: 'remove',
            data: JSON.stringify(challenge)
        })
    })

}

export function getChallengeByIdForAdmin(cid) {
    return requests({
        url: `/api/admin/challenge/${cid}`,
        method: 'get'
    })
}

export function updateChallenge(challenge) {
    return requests({
        url: '/api/admin/challenge',
        method: 'post',
        data: qs.stringify({
            action: 'update',
            data: JSON.stringify(challenge)
        })
    })
}

export function getAllChallengeByPageForAll(pageSize, pageNum) {
    return requests({
        url: `/api/challenge/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

/**
 * 前台根据id查询题目
 * @param cid
 * @returns {AxiosPromise}
 */
export function getChallengeByIdForUser(cid) {
    return requests({
        url: `/api/user/challenge/${cid}`,
        method: 'get'
    })
}

/**
 * 用户提交flag
 * @param cid
 * @param flag
 * @returns {AxiosPromise}
 */
export function submitFlag(cid, flag) {
    let form = new FormData()
    form.append('cid', cid)
    form.append('flag', flag)
    return requests({
        url: '/api/user/challenge/submitFlag',
        method: 'post',
        data: form
    })
}

export function getChallengeByType(pageSize, pageNum, type) {
    return requests({
        url: `/api/challenge/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            type:type
        }
    })
}

export function getChallengeByTag(pageSize, pageNum, tag) {
    return requests({
        url: `/api/challenge/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            tag: tag
        }
    })
}

export function getSimpleAllChallenge() {
    return requests({
        url: '/api/challenge/simple',
        method: 'get',
    })
}


export function searchChallengePage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/admin/challenge/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}