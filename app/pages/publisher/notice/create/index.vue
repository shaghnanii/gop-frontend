<script setup lang="ts">
// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <span class="text-[#0b2545]">Create Notice</span>
        </div>
        <p class="text-gray-600">Ministry of IT &amp; Telecom</p></div>
      <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <button class="flex items-center gap-3 text-[#0b2545]">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[#0b2545] text-white">1</div>
              <span class="hidden sm:block text-sm">Metadata</span></button>
            <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
          </div>
          <div class="flex items-center flex-1">
            <button class="flex items-center gap-3 text-gray-400">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-200 text-gray-600">2
              </div>
              <span class="hidden sm:block text-sm">Content</span></button>
            <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
          </div>
          <div class="flex items-center flex-1">
            <button class="flex items-center gap-3 text-gray-400">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-200 text-gray-600">3
              </div>
              <span class="hidden sm:block text-sm">Preview</span></button>
            <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
          </div>
          <div class="flex items-center flex-1">
            <button class="flex items-center gap-3 text-gray-400">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-200 text-gray-600">4
              </div>
              <span class="hidden sm:block text-sm">Validate &amp; Publish</span></button>
          </div>
        </div>
      </div>

      <!--      For metadata-->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="space-y-6">
              <h2 class="text-[#0b2545] mb-4">Metadata</h2>
              <div>
                <label class="block text-sm text-gray-700 mb-2">
                  Title
                  <span class="text-red-500">*</span>
                </label>
                <input type="text"
                       placeholder="e.g., Amendment to Telecommunication Licensing Rules, 2024"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
                       value="">
              </div>
              <div><label class="block text-sm text-gray-700 mb-2">Description <span
                class="text-red-500">*</span></label><textarea placeholder="Brief description of the notice" rows="3"
                                                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent resize-none"></textarea>
              </div>
              <div><label class="block text-sm text-gray-700 mb-2">Gazette Part <span
                class="text-red-500">*</span></label><select
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]">
                <option value="">Select Part</option>
                <optgroup label="Extraordinary">
                  <option value="ext-p1">Part I — Acts &amp; Ordinances</option>
                  <option value="ext-p2">Part II — S.R.O.</option>
                  <option value="ext-p3">Part III — Administrative</option>
                </optgroup>
                <optgroup label="Weekly">
                  <option value="weekly-p1">Part I</option>
                  <option value="weekly-p2">Part II</option>
                  <option value="weekly-p3">Part III</option>
                </optgroup>
              </select></div>
              <div><label class="block text-sm text-gray-700 mb-2">Tags</label><input type="text"
                                                                                      placeholder="e.g., telecom, licensing, regulation"
                                                                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                                                                                      value=""></div>
              <div><label class="block text-sm text-gray-700 mb-2">Keywords</label><input type="text"
                                                                                          placeholder="e.g., PTA, spectrum, license"
                                                                                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                                                                                          value=""></div>
              <div><label class="block text-sm text-gray-700 mb-2">Related Act References</label>
                <div class="space-y-2">
                  <div class="flex gap-2"><input type="text"
                                                 placeholder="e.g., Pakistan Telecommunication (Re-organization) Act, 1996"
                                                 class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                                                 value=""></div>
                  <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">+ Add Another
                    Reference
                  </button>
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              <button class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59]">Next</button>
            </div>
          </div>
        </div>
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-[#0b2545] mb-4">Quick Tips</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0b2545] mt-1.5 flex-shrink-0"></div>
                <span>Use templates to maintain consistency</span></li>
              <li class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0b2545] mt-1.5 flex-shrink-0"></div>
                <span>SRO numbers are auto-generated but can be manually edited</span></li>
              <li class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0b2545] mt-1.5 flex-shrink-0"></div>
                <span>All notices undergo automated validation</span></li>
              <li class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0b2545] mt-1.5 flex-shrink-0"></div>
                <span>Save drafts frequently to avoid data loss</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!--      For Content-->
      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="space-y-6"><h2 class="text-[#0b2545] mb-4">Content</h2>
            <div><label class="block text-sm text-gray-700 mb-3">Choose Template</label>
              <div class="space-y-2"><label
                class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                type="radio" name="template" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]" value="blank"
                checked=""><span class="text-sm text-gray-700">Blank Template</span></label><label
                class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                type="radio" name="template" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]" value="act-sro"><span
                class="text-sm text-gray-700">ACT / SRO</span></label></div>
            </div>
            <div><label class="block text-sm text-gray-700 mb-2">Notice Content <span
              class="text-red-500">*</span></label>
              <div class="border border-gray-300 rounded-lg overflow-hidden">
                <div class="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">Bold</button>
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">Italic</button>
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">Table</button>
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">List</button>
                </div>
                <textarea rows="12"
                          placeholder="Enter the official text of the notification. Use the toolbar for formatting..."
                          class="w-full px-4 py-3 focus:outline-none resize-none"></textarea></div>
              <p class="text-xs text-gray-500 mt-1">Rich text editor with paste-from-word sanitizer. Supports tables,
                footnotes, and annexures.</p></div>
          </div>
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
            <button class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59]">Next</button>
          </div>
        </div>
      </div>

      <!--      For Preview-->
      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="space-y-6"><h2 class="text-[#0b2545] mb-4">Content</h2>
            <div><label class="block text-sm text-gray-700 mb-3">Choose Template</label>
              <div class="space-y-2"><label
                class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                type="radio" name="template" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]" value="blank"
                checked=""><span class="text-sm text-gray-700">Blank Template</span></label><label
                class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                type="radio" name="template" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]" value="act-sro"><span
                class="text-sm text-gray-700">ACT / SRO</span></label></div>
            </div>
            <div><label class="block text-sm text-gray-700 mb-2">Notice Content <span
              class="text-red-500">*</span></label>
              <div class="border border-gray-300 rounded-lg overflow-hidden">
                <div class="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">Bold</button>
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">Italic</button>
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">Table</button>
                  <button class="px-3 py-1 hover:bg-gray-200 rounded text-sm">List</button>
                </div>
                <textarea rows="12"
                          placeholder="Enter the official text of the notification. Use the toolbar for formatting..."
                          class="w-full px-4 py-3 focus:outline-none resize-none"></textarea></div>
              <p class="text-xs text-gray-500 mt-1">Rich text editor with paste-from-word sanitizer. Supports tables,
                footnotes, and annexures.</p></div>
          </div>
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
            <button class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59]">Next</button>
          </div>
        </div>
      </div>

      <!--      For Validate & Publish-->
      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="space-y-6"><h2 class="text-[#0b2545] mb-4">Publishing Settings</h2>
            <div><label class="block text-sm text-gray-700 mb-2">Add Signature <span
              class="text-red-500">*</span></label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div class="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-upload w-8 h-8 text-gray-400" aria-hidden="true">
                    <path d="M12 3v12"></path>
                    <path d="m17 8-5-5-5 5"></path>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  </svg>
                  <div class="flex-1"><p class="text-sm text-gray-700 mb-1">Upload digital signature file</p>
                    <p class="text-xs text-gray-500">Supports PKI certificate files (.p12, .pfx)</p></div>
                  <label class="px-4 py-2 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] cursor-pointer text-sm">Browse<input
                    type="file" accept=".p12,.pfx" class="hidden"></label></div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label class="block text-sm text-gray-700 mb-3">Publish Date <span
                class="text-red-500">*</span></label>
                <div class="space-y-3"><label
                  class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                  type="radio" name="publishDate" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                  value="immediately"><span class="text-sm text-gray-700">Immediately</span></label><label
                  class="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                  type="radio" name="publishDate" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] mt-0.5"
                  value="select-date" checked="">
                  <div class="flex-1"><span class="text-sm text-gray-700 block mb-2">Select Date</span><input
                    type="datetime-local"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                    value=""></div>
                </label></div>
              </div>
              <div><label class="block text-sm text-gray-700 mb-3">Effective Date <span
                class="text-red-500">*</span></label>
                <div class="space-y-3"><label
                  class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                  type="radio" name="effectiveDate" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                  value="immediately"><span class="text-sm text-gray-700">Immediately</span></label><label
                  class="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input
                  type="radio" name="effectiveDate" class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] mt-0.5"
                  value="select-date" checked="">
                  <div class="flex-1"><span class="text-sm text-gray-700 block mb-2">Select Date</span><input
                    type="date"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                    value=""></div>
                </label></div>
              </div>
            </div>
            <div><label class="block text-sm text-gray-700 mb-2">Preview of Notice URL</label>
              <div class="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-eye w-4 h-4 text-gray-500" aria-hidden="true">
                    <path
                      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <code class="text-sm text-gray-700 font-mono">https://gazette.gov.pk/notices/2024/ext-p2/s-r-o-1544-i-2024</code>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1">This URL will be generated after publishing</p></div>
            <div class="flex gap-3 pt-4">
              <button
                class="flex-1 px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-send w-5 h-5" aria-hidden="true">
                  <path
                    d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                Schedule Publish Date
              </button>
              <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Save Draft</button>
            </div>
          </div>
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
