<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface Props {
  modelValue: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Enter content...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorRef = ref<HTMLDivElement | null>(null)
let quillInstance: Quill | null = null

onMounted(() => {
  if (!editorRef.value) return

  quillInstance = new Quill(editorRef.value, {
    theme: 'snow',
    placeholder: props.placeholder,
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  })

  // Set initial content
  if (props.modelValue) {
    quillInstance.root.innerHTML = props.modelValue
  }

  // Listen for text changes
  quillInstance.on('text-change', () => {
    if (quillInstance) {
      const html = quillInstance.root.innerHTML
      emit('update:modelValue', html)
    }
  })
})

watch(() => props.modelValue, (newValue) => {
  if (quillInstance && quillInstance.root.innerHTML !== newValue) {
    quillInstance.root.innerHTML = newValue || ''
  }
})

onBeforeUnmount(() => {
  if (quillInstance) {
    quillInstance = null
  }
})

// Expose methods for parent component
defineExpose({
  getHTML: () => quillInstance?.root.innerHTML || '',
  getText: () => quillInstance?.getText() || ''
})
</script>

<template>
  <div class="rich-text-editor">
    <div ref="editorRef" class="quill-editor"></div>
  </div>
</template>

<style scoped>
.rich-text-editor {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.ql-container) {
  min-height: 200px;
  font-size: 14px;
}

:deep(.ql-editor) {
  min-height: 200px;
  padding: 12px 16px;
}

:deep(.ql-toolbar) {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px;
}

:deep(.ql-toolbar .ql-stroke) {
  stroke: #374151;
}

:deep(.ql-toolbar .ql-fill) {
  fill: #374151;
}

:deep(.ql-toolbar button:hover),
:deep(.ql-toolbar button.ql-active) {
  background-color: #e5e7eb;
}

:deep(.ql-toolbar .ql-picker-label:hover) {
  color: #0b2545;
}
</style>
