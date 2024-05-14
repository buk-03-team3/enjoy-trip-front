import { localAxios } from '@/util/http-commons'

const local = localAxios()

function listArticle(param, success, fail) {
    local.get(`/community`, { params: param }).then(success).catch(fail)
}

function detailArticle(articleno, success, fail) {
    local.get(`/community/${articleno}`).then(success).catch(fail)
}

function registArticle(article, success, fail) {
    console.log('communityjs article', article)
    local.post(`/community`, JSON.stringify(article)).then(success).catch(fail)
}

function getModifyArticle(articleno, success, fail) {
    local.get(`/community/modify/${articleno}`).then(success).catch(fail)
}

function modifyArticle(article, success, fail) {
    local.put(`/community`, JSON.stringify(article)).then(success).catch(fail)
}

function deleteArticle(articleno, success, fail) {
    local.delete(`/community/${articleno}`).then(success).catch(fail)
}

export { listArticle, detailArticle, registArticle, getModifyArticle, modifyArticle, deleteArticle }
