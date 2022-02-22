import Api from "./api";

export default {
    index () {
        return Api().get(`cases`, {})
    },

    post (_case) {
        return Api().post(`case`,_case)
    },

    show(caseId) {
        return Api().get(`cases/${caseId}`)
    },
    getYearCases () {
        return Api().get(`cases/year`, {})
    },
}