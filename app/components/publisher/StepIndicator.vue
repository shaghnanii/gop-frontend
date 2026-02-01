<script setup lang="ts">
interface Step {
  number: number
  label: string
  active?: boolean
  completed?: boolean
}

interface Props {
  steps: Step[]
  currentStep: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  stepChange: [step: number]
}>()

const goToStep = (stepNumber: number) => {
  // Only allow navigation to completed steps or the current step
  const step = props.steps.find(s => s.number === stepNumber)
  if (step && (step.completed || stepNumber === props.currentStep || stepNumber < props.currentStep)) {
    emit('stepChange', stepNumber)
  }
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
    <div class="flex items-center justify-between">
      <div
        v-for="(step, index) in steps"
        :key="step.number"
        class="flex items-center flex-1"
      >
        <button
          @click="goToStep(step.number)"
          :disabled="!step.completed && step.number !== currentStep && step.number > currentStep"
          :class="[
            'flex items-center gap-3 transition-colors',
            step.number === currentStep
              ? 'text-[#0b2545]'
              : step.completed
                ? 'text-gray-600 hover:text-[#0b2545] cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
          ]"
        >
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors',
              step.number === currentStep
                ? 'bg-[#0b2545] text-white'
                : step.completed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
            ]"
          >
            <svg
              v-if="step.completed && step.number !== currentStep"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <span v-else>{{ step.number }}</span>
          </div>
          <span class="hidden sm:block text-sm">{{ step.label }}</span>
        </button>
        <div
          v-if="index < steps.length - 1"
          :class="[
            'flex-1 h-0.5 mx-2 transition-colors',
            step.completed ? 'bg-green-200' : 'bg-gray-200'
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>
