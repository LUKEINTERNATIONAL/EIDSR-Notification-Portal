import Api from "./api";

export default {
    index () {
        return Api().get(`respondents`, {})
    },

    post (respondent) {
        return Api().post(`respondent`,respondent)
    },

    show(respondentId) {
        return Api().get(`respondents/${respondentId}`)
    },

    put(respondent,respondentId) {
        return Api().put(`respondent/${respondentId}`,respondent)
    },

    delete (respondentId) {
        return Api().delete(`respondent/${respondentId}`)
    }
}