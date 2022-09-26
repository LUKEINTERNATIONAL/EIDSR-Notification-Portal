import Api from "./api";

export default {
    index () {
        return Api().get(`conditions`, {})
    },

    post (condition) {
        return Api().post(`condition`,condition)
    },

    show(conditionId) {
        return Api().get(`cases/${conditionId}`)
    },
}