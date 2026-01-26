<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
const toast = useToast()
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface User {
  id?: string
  name?: string
  email?: string
  phone?: string
  ministry?: string
  role?: string
  status?: string
  [key: string]: any
}

interface UsersResponse {
  status?: number
  message?: string
  data?: {
    items: User[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

// State
const users = ref<User[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

// Form state
const showModal = ref(false)
const isEditing = ref(false)
const editingUserId = ref<string | null>(null)
const formData = ref({
  name: '',
  email: '',
  phone: '',
  ministry: '',
  role: 'publisher',
  status: 'pending'
})
const formError = ref<string | null>(null)
const isSubmitting = ref(false)

// Fetch users with pagination
const fetchUsers = async (page: number = 1) => {
  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const pageNumber = page - 1

    const response = await $fetch<UsersResponse>(
      `${API_BASE_URL}/api/admin-users?PageNumber=${pageNumber}&PageSize=${pageSize.value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      users.value = response.data.items || []
      totalCount.value = response.data.totalCount || 0
      currentPage.value = response.data.currentPage || page
      totalPages.value = response.data.totalPages || 1
      hasNext.value = response.data.hasNext || false
      hasPrevious.value = response.data.hasPrevious || false
    } else {
      users.value = []
    }
  } catch (err: any) {
    console.error('Error fetching users:', err)
    error.value = err.data?.message || err.message || 'Failed to load users'
    users.value = []
  } finally {
    isLoading.value = false
  }
}

// Open add user modal
const openAddModal = () => {
  isEditing.value = false
  editingUserId.value = null
  formData.value = {
    name: '',
    email: '',
    phone: '',
    ministry: '',
    role: 'publisher',
    status: 'pending'
  }
  formError.value = null
  showModal.value = true
}

// Open edit user modal
const openEditModal = (user: User) => {
  isEditing.value = true
  editingUserId.value = user.id || null

  // Normalize role and status to match select options exactly
  const userRole = user.role?.toLowerCase() || 'publisher'
  const normalizedRole = userRole === 'admin' ? 'admin' : 'publisher'

  const userStatus = user.status?.toLowerCase() || 'pending'
  const normalizedStatus = userStatus === 'active' ? 'active' : 'pending'

  formData.value = {
    name: user.fullName || user.name || '',
    email: user.email || '',
    ministry: user.ministry || '',
    role: normalizedRole,
    status: normalizedStatus
  }
  formError.value = null
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  formError.value = null
}

// Submit form (add or update)
const submitForm = async () => {
  formError.value = null
  isSubmitting.value = true

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    if (isEditing.value && editingUserId.value) {
      // Update user
      await $fetch(`${API_BASE_URL}/api/admin-users/${editingUserId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          name: formData.value.name,
          ministry: formData.value.ministry,
          status: formData.value.status,
          role: formData.value.role
        }
      })
    } else {
      // Add user
      await $fetch(`${API_BASE_URL}/api/admin-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          name: formData.value.name,
          email: formData.value.email,
          ministry: formData.value.ministry,
          status: formData.value.status,
          role: formData.value.role
        }
      })
    }

    // Refresh users list
    await fetchUsers(currentPage.value)
    closeModal()
  } catch (err: any) {
    console.error('Error saving user:', err)
    formError.value = err.data?.message || err.message || 'Failed to save user'
  } finally {
    isSubmitting.value = false
  }
}

// Pagination handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    fetchUsers(page)
  }
}

const nextPage = () => {
  if (hasNext.value) {
    goToPage(currentPage.value + 1)
  }
}

const previousPage = () => {
  if (hasPrevious.value) {
    goToPage(currentPage.value - 1)
  }
}

// Get status badge color
const getStatusColor = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-[#0b6b3a]/10 text-[#0b6b3a]'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Get role badge color
const getRoleColor = (role: string | undefined) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'bg-purple-100 text-purple-800'
    case 'publisher':
      return 'bg-[#0b2545]/10 text-[#0b2545]'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Resend invitation
const resendingInvitation = ref<string | null>(null)
const resendInvitation = async (userId: string) => {
  if (!userId) return

  resendingInvitation.value = userId

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<{
      status?: number
      message?: string
    }>(`${API_BASE_URL}/api/admin-users/resend-invitation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        userId: userId
      }
    })

    if (response.status === 200) {
      console.log("Invitation resent successfully")
      toast.success({
        title: 'Sent!',
        message: response.message || 'Invitation resent successfully!'
      })
    }
  } catch (err: any) {
    console.error('Error resending invitation:', err)
    toast.error({
      title: "Error",
      message: err.data?.message || err.message || 'Failed to resend invitation'
    })
  } finally {
    resendingInvitation.value = null
  }
}

// Fetch users on mount
onMounted(() => {
  fetchUsers(1)
})
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-[#0b2545]">Users &amp; Roles</h2>
        <button
          @click="openAddModal"
          class="px-4 py-2 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] text-sm transition-colors"
        >
          Add User
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && users.length === 0" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Name</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Email</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Role</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Ministry/Tenant</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Status</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 3" :key="i" class="border-b border-gray-100">
              <td class="py-3 px-4">
                <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </td>
              <td class="py-3 px-4">
                <div class="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
              </td>
              <td class="py-3 px-4">
                <div class="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              </td>
              <td class="py-3 px-4">
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </td>
              <td class="py-3 px-4">
                <div class="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
              </td>
              <td class="py-3 px-4">
                <div class="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600 mb-2">{{ error }}</p>
        <button
          @click="fetchUsers(currentPage)"
          class="text-xs text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>

      <!-- Users Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Name</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Email</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Role</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Ministry/Tenant</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Status</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 text-sm">{{ user.fullName || 'N/A' }}</td>
              <td class="py-3 px-4 text-sm text-gray-600">{{ user.email || 'N/A' }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 rounded text-xs font-medium', getRoleColor(user.role)]">
                  {{ user.role || 'N/A' }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600">{{ user.ministry || 'N/A' }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 rounded text-xs font-medium', getStatusColor(user.status)]">
                  {{ user.status || 'N/A' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <button
                    @click="openEditModal(user)"
                    class="text-sm text-[#0b2545] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    v-if="user.status?.toLowerCase() === 'pending'"
                    @click="resendInvitation(user.id!)"
                    :disabled="resendingInvitation === user.id"
                    class="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Resend Invitation"
                  >
                    <svg
                      v-if="resendingInvitation !== user.id"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                    <div
                      v-else
                      class="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"
                    ></div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="users.length === 0" class="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-gray-400 mb-2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <p class="text-sm text-gray-500">No users found</p>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="users.length > 0 && totalPages > 1" class="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <div class="text-sm text-gray-600">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalCount) }} of {{ totalCount }} users
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="previousPage"
            :disabled="!hasPrevious || isLoading"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div class="flex items-center gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :disabled="isLoading"
              :class="[
                'px-3 py-2 text-sm rounded-lg transition-colors min-w-[40px]',
                currentPage === page
                  ? 'bg-[#0b2545] text-white font-medium'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="nextPage"
            :disabled="!hasNext || isLoading"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-[#0b2545]">
              {{ isEditing ? 'Edit User' : 'Add User' }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Error Message -->
            <div v-if="formError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ formError }}</p>
            </div>

            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2545] focus:border-transparent outline-none"
                placeholder="Enter full name"
              />
            </div>

            <!-- Email (only for add) -->
            <div v-if="!isEditing">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2545] focus:border-transparent outline-none"
                placeholder="Enter email address"
              />
            </div>

            <!-- Ministry -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Ministry <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.ministry"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2545] focus:border-transparent outline-none"
                placeholder="Enter ministry name"
              />
            </div>

            <!-- Role -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Role <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.role"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2545] focus:border-transparent outline-none"
              >
                <option value="publisher">Publisher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.status"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2545] focus:border-transparent outline-none"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
              </select>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                :disabled="isSubmitting"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-2 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Saving...</span>
                <span v-else>{{ isEditing ? 'Update' : 'Add' }} User</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

