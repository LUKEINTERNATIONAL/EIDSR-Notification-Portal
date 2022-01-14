import Api from "./api";

export default {
    index () {
        return Api().get(`respondents`, {})
    },

    post (respondent) {
        return Api().post(`respondent`,respondent)
    },

    show(itemId) {
        return Api().get(`respondents/${respondentId}`)
    },

    put(respondent,itemId) {
        return Api().put(`respondents/${respondentId}`,respondent)
    }
}