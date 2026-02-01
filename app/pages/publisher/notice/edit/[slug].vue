<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {useRuntimeConfig} from '#app'
import {useAuth} from '~/composables/useAuth'
import {useRoute} from 'vue-router'
import StepIndicator from '~/components/publisher/StepIndicator.vue'
import {PARTS} from '~/utils/constants/parts'
import TabContentLayout from "~/components/publisher/TabContentLayout.vue";
import RichTextEditor from '~/components/publisher/RichTextEditor.vue'
import html2pdf from 'html2pdf.js'

const route = useRoute()

// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const {getAccessToken} = useAuth()

// Step management
const currentStep = ref(1)
const totalSteps = 4
const isLoading = ref(false)
const isFetching = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Form data
const formData = ref({
  id: '',
  title: '',
  description: '',
  gazettePart: '',
  tags: '',
  keywords: '',
  relatedActReferences: [] as string[],
  template: 'blank',
  content: '',
  htmlContent: '',
  pdfFile: null as File | null,
  signatureFile: null as File | null,
  effectiveDate: 'select-date',
  effectiveDateTime: ''
})

// Steps configuration
const steps = computed(() => [
  {
    number: 1,
    label: 'Metadata',
    completed: currentStep.value > 1
  },
  {
    number: 2,
    label: 'Content',
    completed: currentStep.value > 2
  },
  {
    number: 3,
    label: 'Preview',
    completed: currentStep.value > 3
  },
  {
    number: 4,
    label: 'Validate & Publish',
    completed: false
  }
])

// Quick tips for each step
const metadataTips = [
  'Use templates to maintain consistency',
  'SRO numbers are auto-generated but can be manually edited',
  'All notices undergo automated validation',
  'Save drafts frequently to avoid data loss'
]

const contentTips = [
  'Use the rich text editor for proper formatting',
  'Paste from Word documents is automatically sanitized',
  'Tables and lists are supported for structured content',
  'Review content carefully before proceeding to preview'
]

const previewTips = [
  'Review all metadata and content for accuracy',
  'Check formatting and structure before publishing',
  'Verify all required fields are completed',
  'Preview matches the final published version'
]

const publishTips = [
  'Digital signature is required for publishing',
  'Publish date can be scheduled for future release',
  'Effective date determines when notice becomes law',
  'Once published, changes require amendments'
]

// Fetch notice details
const fetchNoticeDetails = async () => {
  isFetching.value = true
  errorMessage.value = ''
  
  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const noticeId = route.params.slug as string
    
    const response = await $fetch<{
      status: number
      message: string
      data: {
        id: string
        title: string
        htmlContent: string
        sroNumber?: string
        gazettePart: string
        ministry?: string
        issuingAuthorityName?: string
        tags?: string
        previewUrl?: string
        pdfUrl?: string
        status: string
        effectiveDate?: string
        publishedDateTime?: string
        actReference?: Array<{reference: string}>
      }
    }>(`${API_BASE_URL}/api/publisher-notices/${noticeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.data) {
      formData.value.id = response.data.id
      formData.value.title = response.data.title || ''
      formData.value.gazettePart = response.data.gazettePart || ''
      formData.value.content = response.data.htmlContent || ''
      formData.value.htmlContent = response.data.htmlContent || ''
      
      if (response.data.tags) {
        formData.value.tags = response.data.tags
      }
      
      if (response.data.effectiveDate) {
        formData.value.effectiveDate = 'select-date'
        formData.value.effectiveDateTime = response.data.effectiveDate
      } else {
        formData.value.effectiveDate = 'immediately'
      }
      
      if (response.data.actReference && response.data.actReference.length > 0) {
        formData.value.relatedActReferences = response.data.actReference.map(act => act.reference || '')
      }
      
      // Determine template type (default to blank)
      formData.value.template = 'blank'
    }
  } catch (error: any) {
    console.error('Error fetching notice details:', error)
    errorMessage.value = error.data?.message || error.message || 'Failed to load notice details'
  } finally {
    isFetching.value = false
  }
}

// Validation functions
const validateStep1 = (): boolean => {
  if (!formData.value.title.trim()) {
    errorMessage.value = 'Title is required'
    return false
  }
  if (!formData.value.description.trim()) {
    errorMessage.value = 'Description is required'
    return false
  }
  if (!formData.value.gazettePart) {
    errorMessage.value = 'Gazette Part is required'
    return false
  }
  return true
}

const validateStep2 = (): boolean => {
  if (!formData.value.content.trim()) {
    errorMessage.value = 'Notice content is required'
    return false
  }
  return true
}

const validateStep4 = (): boolean => {
  if (formData.value.effectiveDate === 'select-date' && !formData.value.effectiveDateTime) {
    errorMessage.value = 'Please select an effective date or choose immediately'
    return false
  }
  return true
}

// Navigation handlers
const handleStepChange = (step: number) => {
  if (step >= 1 && step <= totalSteps) {
    if (step <= currentStep.value || steps.value.find(s => s.number === step)?.completed) {
      currentStep.value = step
      errorMessage.value = ''
    }
  }
}

const nextStep = () => {
  errorMessage.value = ''
  
  if (currentStep.value === 1 && !validateStep1()) {
    return
  }
  if (currentStep.value === 2 && !validateStep2()) {
    return
  }
  if (currentStep.value === 4 && !validateStep4()) {
    return
  }
  
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const previousStep = () => {
  errorMessage.value = ''
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Form handlers
const addActReference = () => {
  formData.value.relatedActReferences.push('')
}

const removeActReference = (index: number) => {
  formData.value.relatedActReferences.splice(index, 1)
}

const handleSignatureUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    formData.value.signatureFile = target.files[0]
    errorMessage.value = ''
  }
}

// Clean HTML content to remove unsupported CSS (like oklch colors)
const cleanHTMLForPDF = (html: string): string => {
  // Create a temporary div to parse and clean the HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  
  // Remove all classes and style attributes that might contain unsupported CSS
  const allElements = tempDiv.querySelectorAll('*')
  allElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      // Remove all classes
      el.removeAttribute('class')
      // Remove all style attributes
      el.removeAttribute('style')
      // Remove data attributes that might affect styling
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('data-') || attr.name.startsWith('data-')) {
          el.removeAttribute(attr.name)
        }
      })
      
      // Apply safe inline styles directly
      el.style.color = '#000000'
      el.style.backgroundColor = 'transparent'
      el.style.border = 'none'
      el.style.margin = '0'
      el.style.padding = '0'
      
      // For specific elements, apply appropriate styles
      if (el.tagName === 'P') {
        el.style.marginBottom = '8px'
        el.style.lineHeight = '1.6'
      }
      if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
        el.style.fontWeight = 'bold'
        el.style.marginTop = '12px'
        el.style.marginBottom = '8px'
      }
      if (el.tagName === 'STRONG' || el.tagName === 'B') {
        el.style.fontWeight = 'bold'
      }
      if (el.tagName === 'EM' || el.tagName === 'I') {
        el.style.fontStyle = 'italic'
      }
      if (el.tagName === 'U') {
        el.style.textDecoration = 'underline'
      }
      if (el.tagName === 'UL' || el.tagName === 'OL') {
        el.style.marginLeft = '20px'
        el.style.marginBottom = '8px'
      }
      if (el.tagName === 'LI') {
        el.style.marginBottom = '4px'
      }
      if (el.tagName === 'A') {
        el.style.color = '#0000EE'
        el.style.textDecoration = 'underline'
      }
    }
  })
  
  return tempDiv.innerHTML
}

// Generate PDF from HTML content
const generatePDF = async (htmlContent: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Clean the HTML content first
    const cleanedHTML = cleanHTMLForPDF(htmlContent)
    
    // Create an isolated iframe to avoid inheriting page styles
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.left = '-9999px'
    iframe.style.top = '0'
    iframe.style.width = '800px'
    iframe.style.height = '1200px'
    iframe.style.border = 'none'
    
    document.body.appendChild(iframe)
    
    // Wait for iframe to load
    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (!iframeDoc) {
          throw new Error('Could not access iframe document')
        }
        
        // Create a clean document in the iframe
        iframeDoc.open()
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: Arial, sans-serif;
                  font-size: 12px;
                  line-height: 1.6;
                  color: #000000;
                  background-color: #ffffff;
                  padding: 20px;
                }
                p {
                  margin-bottom: 8px;
                }
                h1, h2, h3, h4, h5, h6 {
                  font-weight: bold;
                  margin-top: 12px;
                  margin-bottom: 8px;
                }
                strong, b {
                  font-weight: bold;
                }
                em, i {
                  font-style: italic;
                }
                u {
                  text-decoration: underline;
                }
                ul, ol {
                  margin-left: 20px;
                  margin-bottom: 8px;
                }
                li {
                  margin-bottom: 4px;
                }
                a {
                  color: #0000EE;
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              ${cleanedHTML}
            </body>
          </html>
        `)
        iframeDoc.close()
        
        // Wait a bit for styles to apply
        setTimeout(() => {
          const element = iframeDoc.body
          
          const opt = {
            margin: [10, 10, 10, 10] as [number, number, number, number],
            filename: 'notice.pdf',
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { 
              scale: 2, 
              useCORS: false,
              logging: false,
              backgroundColor: '#ffffff',
              removeContainer: true,
              windowWidth: 800,
              windowHeight: 1200,
              foreignObjectRendering: false
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
          }
          
          html2pdf()
            .set(opt)
            .from(element)
            .outputPdf('blob')
            .then((pdfBlob: Blob) => {
              // Remove iframe
              if (iframe.parentNode) {
                document.body.removeChild(iframe)
              }
              
              // Convert blob to File
              const pdfFile = new File([pdfBlob], 'notice.pdf', { type: 'application/pdf' })
              resolve(pdfFile)
            })
            .catch((error: Error) => {
              // Remove iframe on error
              if (iframe.parentNode) {
                document.body.removeChild(iframe)
              }
              reject(error)
            })
        }, 100)
      } catch (error) {
        if (iframe.parentNode) {
          document.body.removeChild(iframe)
        }
        reject(error)
      }
    }
    
    // Trigger load
    iframe.src = 'about:blank'
  })
}

// Update notice
const updateNotice = async () => {
  if (!validateStep1() || !validateStep2() || !validateStep4()) {
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const htmlContent = formData.value.content || ''
    
    // Generate PDF from HTML
    let pdfFile: File
    try {
      pdfFile = await generatePDF(htmlContent)
    } catch (error) {
      console.error('Error generating PDF:', error)
      errorMessage.value = 'Failed to generate PDF. Please try again.'
      isLoading.value = false
      return
    }
    
    // Prepare form data
    const formDataToSend = new FormData()
    formDataToSend.append('Id', formData.value.id)
    formDataToSend.append('Title', formData.value.title)
    formDataToSend.append('Description', formData.value.description)
    formDataToSend.append('GazettePart', formData.value.gazettePart)
    if (formData.value.keywords) {
      formDataToSend.append('Keywords', formData.value.keywords)
    }
    if (formData.value.tags) {
      formDataToSend.append('Tags', formData.value.tags)
    }
    formDataToSend.append('TemplateType', formData.value.template === 'blank' ? '0' : '1')
    
    // Extract plain text from HTML for Content field
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    const plainTextContent = tempDiv.textContent || tempDiv.innerText || ''
    formDataToSend.append('Content', plainTextContent)
    formDataToSend.append('HtmlContent', htmlContent)
    formDataToSend.append('PdfContent', pdfFile)
    
    // Effective date (optional in update)
    if (formData.value.effectiveDate === 'select-date' && formData.value.effectiveDateTime) {
      formDataToSend.append('EffectiveDate', formData.value.effectiveDateTime)
    }
    
    // Status - keep existing or set based on current status
    // You might want to determine this based on the fetched notice status
    formDataToSend.append('Status', '1') // Published
    
    const response = await $fetch(`${API_BASE_URL}/api/publisher-notices/${formData.value.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataToSend
    })
    
    successMessage.value = 'Notice updated successfully!'
    setTimeout(() => {
      navigateTo('/publisher/dashboard')
    }, 1500)
  } catch (error: any) {
    console.error('Error updating notice:', error)
    errorMessage.value = error.data?.message || error.message || 'Failed to update notice'
  } finally {
    isLoading.value = false
  }
}

// Load notice details on mount
onMounted(() => {
  fetchNoticeDetails()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <NuxtLink to="/publisher/dashboard">
            <button class="hover:text-[#0b2545]">Publisher Dashboard</button>
          </NuxtLink>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-chevron-right w-4 h-4" aria-hidden="true">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <span class="text-[#0b2545]">Edit Notice</span>
        </div>
        <p class="text-gray-600">Ministry of IT &amp; Telecom</p>
      </div>

      <!-- Loading State -->
      <div v-if="isFetching" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b2545]"></div>
        <p class="mt-4 text-gray-600">Loading notice details...</p>
      </div>

      <template v-else>
        <!-- Step Indicator -->
        <StepIndicator :steps="steps" :current-step="currentStep" @step-change="handleStepChange"/>

        <!-- Error/Success Messages -->
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>
        <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm text-green-600">{{ successMessage }}</p>
        </div>

        <!-- Step 1: Metadata -->
        <div v-if="currentStep === 1">
          <TabContentLayout :tips="metadataTips">
            <template #content>
              <div class="space-y-6">
                <h2 class="text-[#0b2545] mb-4">Metadata</h2>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">
                    Title
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="e.g., Amendment to Telecommunication Licensing Rules, 2024"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">
                    Description
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="formData.description"
                    placeholder="Brief description of the notice"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">
                    Gazette Part
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="formData.gazettePart"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                  >
                    <option value="">Select Part</option>
                    <optgroup
                      v-for="group in PARTS"
                      :key="group.label"
                      :label="group.label"
                    >
                      <option
                        v-for="option in group.options"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">Tags</label>
                  <input
                    v-model="formData.tags"
                    type="text"
                    placeholder="e.g., telecom, licensing, regulation"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                  />
                </div>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">Keywords</label>
                  <input
                    v-model="formData.keywords"
                    type="text"
                    placeholder="e.g., PTA, spectrum, license"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                  />
                </div>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">Related Act References</label>
                  <div class="space-y-2">
                    <div
                      v-for="(reference, index) in formData.relatedActReferences"
                      :key="index"
                      class="flex gap-2"
                    >
                      <input
                        v-model="formData.relatedActReferences[index]"
                        type="text"
                        placeholder="e.g., Pakistan Telecommunication (Re-organization) Act, 1996"
                        class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                      />
                      <button
                        @click="removeActReference(index)"
                        class="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <button
                      @click="addActReference"
                      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      + Add Another Reference
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  @click="previousStep"
                  :disabled="currentStep === 1"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  @click="nextStep"
                  :disabled="!formData.title.trim() || !formData.description.trim() || !formData.gazettePart"
                  class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </template>
          </TabContentLayout>
        </div>

        <!-- Step 2: Content -->
        <div v-if="currentStep === 2">
          <TabContentLayout :tips="contentTips">
            <template #content>
              <div class="space-y-6">
                <h2 class="text-[#0b2545] mb-4">Content</h2>

                <div>
                  <label class="block text-sm text-gray-700 mb-3">Choose Template</label>
                  <div class="space-y-2">
                    <label
                      class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        v-model="formData.template"
                        type="radio"
                        name="template"
                        class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                        value="blank"
                      />
                      <span class="text-sm text-gray-700">Blank Template</span>
                    </label>
                    <label
                      class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        v-model="formData.template"
                        type="radio"
                        name="template"
                        class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                        value="act-sro"
                      />
                      <span class="text-sm text-gray-700">ACT / SRO</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm text-gray-700 mb-2">
                    Notice Content
                    <span class="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    v-model="formData.content"
                    placeholder="Enter the official text of the notification. Use the toolbar for formatting..."
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Rich text editor with formatting options. Supports bold, italic, lists, links, and more.
                  </p>
                </div>
              </div>

              <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  @click="previousStep"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextStep"
                  :disabled="!formData.content.trim()"
                  class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </template>
          </TabContentLayout>
        </div>

        <!-- Step 3: Preview -->
        <div v-if="currentStep === 3">
          <TabContentLayout :tips="previewTips">
            <template #content>
              <div class="space-y-6">
                <div class="mb-6">
                  <h2 class="text-[#0b2545] mb-2">Preview & Final Review Before Publishing</h2>
                  <p class="text-sm text-gray-600">Carefully review your notice before publishing. You may return to
                    editing.</p>
                </div>

                <div class="flex gap-2 border-b border-gray-200">
                  <button class="px-4 py-2 text-sm border-b-2 transition-colors border-[#377E7F] text-[#377E7F]">HTML
                    View
                  </button>
                  <button
                    class="px-4 py-2 text-sm border-b-2 transition-colors border-transparent text-gray-600 hover:text-gray-900">
                    PDF Preview
                  </button>
                </div>

                <!-- Preview Content -->
                <div class="border border-gray-300 rounded-lg p-6 bg-white">
                  <div class="space-y-4">
                    <div v-if="formData.title">
                      <h3 class="text-xl font-semibold text-[#0b2545]">{{ formData.title }}</h3>
                    </div>

                    <div v-if="formData.description" class="text-gray-600">
                      <p>{{ formData.description }}</p>
                    </div>

                    <div v-if="formData.gazettePart" class="flex items-center gap-2 text-sm">
                      <span class="text-gray-500">Gazette Part:</span>
                      <span class="text-[#0b2545] font-medium">{{ formData.gazettePart }}</span>
                    </div>

                    <div v-if="formData.content" class="border-t border-gray-200 pt-4">
                      <div class="prose max-w-none" v-html="formData.content"></div>
                    </div>

                    <div v-if="formData.tags" class="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      <span
                        v-for="tag in formData.tags.split(',').map(t => t.trim()).filter(t => t)"
                        :key="tag"
                        class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <div v-if="formData.relatedActReferences.length > 0" class="pt-4 border-t border-gray-200">
                      <h4 class="text-sm font-medium text-gray-700 mb-2">Related Act References:</h4>
                      <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li v-for="(ref, index) in formData.relatedActReferences.filter(r => r)" :key="index">
                          {{ ref }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p class="text-sm text-blue-800">
                    <strong>Note:</strong> This is a preview of how your notice will appear. Review all information
                    carefully before publishing.
                  </p>
                </div>
              </div>

              <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  @click="previousStep"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextStep"
                  class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59]"
                >
                  Next
                </button>
              </div>
            </template>
          </TabContentLayout>
        </div>

        <!-- Step 4: Validate & Publish -->
        <div v-if="currentStep === 4">
          <TabContentLayout :tips="publishTips">
            <template #content>
              <div class="space-y-6">
                <h2 class="text-[#0b2545] mb-4">Publishing Settings</h2>

                <div>
                  <label class="block text-sm text-gray-700 mb-3">
                    Effective Date
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="space-y-3">
                    <label
                      class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        v-model="formData.effectiveDate"
                        type="radio"
                        name="effectiveDate"
                        class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                        value="immediately"
                      />
                      <span class="text-sm text-gray-700">Immediately</span>
                    </label>
                    <label
                      class="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        v-model="formData.effectiveDate"
                        type="radio"
                        name="effectiveDate"
                        class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] mt-0.5"
                        value="select-date"
                      />
                      <div class="flex-1">
                        <span class="text-sm text-gray-700 block mb-2">Select Date</span>
                        <input
                          v-model="formData.effectiveDateTime"
                          type="date"
                          :disabled="formData.effectiveDate === 'immediately'"
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex gap-3 pt-4 mt-8">
                <button
                  @click="updateNotice"
                  :disabled="isLoading || (formData.effectiveDate === 'select-date' && !formData.effectiveDateTime)"
                  class="flex-1 px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-save w-5 h-5" aria-hidden="true">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <path d="M17 21v-8H7v8"></path>
                    <path d="M7 3v5h8"></path>
                  </svg>
                  <span v-if="isLoading">Updating...</span>
                  <span v-else>Update Notice</span>
                </button>
              </div>

              <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  @click="previousStep"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              </div>
            </template>
          </TabContentLayout>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>
