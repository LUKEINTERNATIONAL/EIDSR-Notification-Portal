import Api from "./api";

export default {
    index () {
        return Api().get(`conditions`, {})
    },

    getSingleCondition (generatedCodeId) {
        return Api().get(`customMessageForGCI/${generatedCodeId}`)
    },

    post (condition) {
        return Api().post(`condition`,condition)
    },

    show(conditionId) {
        return Api().get(`cases/${conditionId}`)
    },

    paginatedIndex(page, size) {
        return Api().get(`paginatedConditions/${page}/${size}`)
    }
}