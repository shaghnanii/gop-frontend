import { useNuxtApp } from '#app'
export const actions = {
  async login(payload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post("api/auth/authenticate", payload)
      return response
    } catch (error) {
      return error
    }
  },

  async verifyUserAccount(payload: string) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post("api/auth/accept-invitation", payload)
      return response
    } catch (error) {
      return error
    }
  },
  async forgetPassword(payload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post("api/auth/forgot-password", payload)
      return response
    } catch (error) {
      return error
    }
  },
  async resetUserPassword(payload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post("api/auth/reset-password", payload)
      return response
    } catch (error) {
      return error
    }
  },
}
