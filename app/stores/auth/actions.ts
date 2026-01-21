import { useNuxtApp } from '#app'
import type { NuxtApp } from '#app'
import type { LoginPayload, RegisterPayload, ForgetPasswordPayload, SendOtpPayload, ResetUserPasswordPayload } from '@/types/global'

export const actions = {
  async setAnsweredCount(payload: number) {
    this.answeredCount = payload;
    return 0;
  },

  async setCurrentState(payload: string) {
    this.currentState = payload;
    return 0;
  },

  async login(payload: LoginPayload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post($API.Auth.login, payload)
      if (response.status == 200) {
        localStorage.setItem('rememberMe', payload.rememberMe)
        localStorage.setItem('refreshToken',response.data.result.refreshToken)
        if (payload.rememberMe == true) {
          localStorage.setItem('accessToken',response.data.result.accessToken)
        } else {
          sessionStorage.setItem('accessToken',response.data.result.accessToken)
        }
      }
      return response
    } catch (error) {
      return error
    }
  },
  // async registerUser(payload: RegisterPayload) {
  //     try {
  //         const { $axios, $API } = useNuxtApp()
  //         const response = await $axios.post($API.Auth.register, payload)
  //         return response
  //     } catch (error) {
  //         return error
  //     }
  // },
  async registerUser(payload: RegisterPayload) {
    try {
      const { $axios, $API }: NuxtApp = useNuxtApp()
      const formData = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const url = $API.Auth.register
      const response = await $axios.post(url, formData)
      return response
    } catch (error) {
      return error
    }
  },
  async verifyUserAccount(payload: string) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post($API.Auth.verifyAccount, payload)
      return response
    } catch (error) {
      return error
    }
  },
  async forgetPassword(payload: ForgetPasswordPayload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post($API.Auth.forgetPassword, payload)
      return response
    } catch (error) {
      return error
    }
  },
  async resetUserPassword(payload: ResetUserPasswordPayload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post($API.Auth.resetPassword, payload)
      return response
    } catch (error) {
      return error
    }
  },
  // OTP Actions
  async sendOtp(payload: SendOtpPayload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post($API.Auth.sendVerificationOtp, payload)
      return response
    } catch (error) {
      return error
    }
  },
  async verifyOtp(payload: SendOtpPayload) {
    try {
      const { $axios, $API } = useNuxtApp()
      const response = await $axios.post($API.Auth.verifySendOtp, payload)
      return response
    } catch (error) {
      return error
    }
  },
}
