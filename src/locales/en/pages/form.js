export default {
  select: "Select Functionality",
  label: "Label",
  placeholder: "Please enter or select",
  "all.base": "Base",
  "all.normal": "Normal",
  "select.normal": "Normal",
  "select.normal.text":
    "This method uses slots to display options and selections. This approach prevents issues when language settings change, where other languages change, but the options remain unchanged. Recommended for use.",
  "select.base": "Base",
  "select.base.text":
    "This method uses the native Quasar way to display options and selections. However, when switching languages, the options do not change accordingly. Style options include square, filled.",
  "select.slot": "Slot",
  "select.slot.text":
    "In Quasar's select, slots can be used to add custom elements before and after the input. In this example, we inserted an icon with a clear function.",
  "select.disable": "Disable",
  "select.disable.text":
    "Of course, there are also disable and readonly functions, which prevent users from selecting or changing the selection.",
  "select.options.label.1": "Option One",
  "select.options.label.2": "Option Two",
  "select.options.label.3": "Option Three",
  "select.result": "Your selection is: {result}",
  "input.normal": "Normal",
  "input.normal.text":
    "Input allows elements to be inserted on the left or right and provides corresponding event handling for the elements. It can also be used with Quasar's q-popup-proxy. In this example, a popup is generated beside the input field.",
  "input.base": "Base",
  "input.base.text":
    "Of course, the most basic input functionality is also available. Placeholder, readonly, disable, and other native features are all supported.",
  "input.file": "File",
  "input.file.text": "File upload functionality is also available.",
  "input.textarea": "TextArea",
  "input.textarea.text": "TextArea is also included in inputs.",
  "form.title": "Form Validation",
  "form.text.1":
    "This page is used to demonstrate Quasar's form validation functionality.",
  "form.text.2":
    "Rules are used to set validation rules. If rules return false or a string, it means validation failed. If true, validation is successful.",
  "form.text.3":
    "When q-btn has type set to submit, it triggers the form's submit event. The same applies to reset. The submit event is only triggered when form validation is successful.",
  "form.name": "Name",
  "form.name.tip": "First and Last Name",
  "form.name.error": "Please enter a name",
  "form.age": "Age",
  "form.age.error.1": "Please enter a valid age",
  "form.age.error.2": "Please enter an age",
  "form.accept": "I accept all terms",
  "other.radio": "Radio",
  "other.radio.text":
    "In q-radio, we use v-model to control the selected value. The same v-model binds a group together, allowing only one selection.",
  "other.checkbox": "Checkbox",
  "other.checkbox.text":
    "Same as a regular checkbox, but Quasar offers extended options.",
  "other.checkbox.style": "Checkbox Extensions",
  "other.checkbox.style.text":
    "Checkboxes can be styled differently and have labels.",
  "other.checkbox.style.label": "Give a good review?",
  "other.multiple": "Multiple Selection Checkbox",
  "other.multiple.text":
    "Checkboxes can also be used for multiple selection. The v-model format must be an array.",
  "other.range": "Range",
  "other.range.text": "Can be used to select a range.",
  "other.slider": "Slider",
  "other.slider.text": "Allows controlling value size by dragging.",
  "other.toggle": "Toggle",
  "other.toggle.text":
    "Toggle is similar to Checkbox but with different styling.",
  "tab.text.1": "Common usage can be combined with q-tab-panels.",
  "tab.text.2":
    "The basic usage is that when the tab changes, the model changes, and the corresponding task is handled based on the model.",
};
