import Api from "./api";

export default {
    index () {
        return Api().get(`groupedConditionForCustomMessages`, {})
    },

    post (groupedCondition) {
        return Api().post(`groupedConditionForCustomMessage`,groupedCondition)
    },

    show(customMessageId) {
        return Api().get(`groupedConditionForCustomMessages/${customMessageId}`)
    },

    put(groupedCondition,customMessageId) {
        return Api().put(`groupedConditionForCustomMessage/${customMessageId}`,groupedCondition)
    },

    delete (customMessageId) {
        return Api().delete(`groupedConditionForCustomMessage/${customMessageId}`)
    }
}