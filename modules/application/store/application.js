import Vue from 'vue';

const state = Vue.observable({
    step: 1,
    details: {}
})

export default {
    get state() {
        return state;
    },

    setStep(newStep) {
        state.step = newStep;
    },

    incrementStep() {
        state.step = state.step + 1;
    },
    decrementStep() {
        state.step = state.step - 1;
    },
}
