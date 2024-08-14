export default {
  select: "select功能",
  label: "標題",
  placeholder: "請輸入或這請選擇",
  "select.normal": "Normal",
  "select.normal.text":
    "這個方法使用的是slot的方式去顯示選項及選擇。\n這麼做的原因是因為讓語系更動時，不會其他語系變動但選項卻沒變化的問題。推薦使用",
  "select.base": "Base",
  "select.base.text":
    "這個方法使用的是原生quasar的方式去顯示選項及選擇。\n但當語系切換時，選項的語系不會跟著變動。\n樣式選項為square、filled",
  "select.slot": "Slot",
  "select.slot.text":
    "quasar的select中可以使用slot在input前以及後加入自定義元素。如這個範例，我們塞入了icon並且icon有著清除功能",
  "select.disable": "Disable",
  "select.disable.text":
    "當然也有disable以及readonly的功能，這樣可以讓使用者無法選擇或是無法更改選擇",
  "select.options.label.1": "選項一",
  "select.options.label.2": "選項二",
  "select.options.label.3": "選項三",
  "select.result": "你的選項為: {result}",
  "input.normal": "Normal",
  "input.normal.text":
    "input可以在左邊或右邊塞入元素並給予元素對應的事件處理，並且可以搭配quasar的q-popup-proxy使用。\n如這個範例，就是搭配著使用，在輸入框旁產生彈窗。",
  "input.base": "Base",
  "input.base.text":
    "當然最原始的input功能也少不了。一樣可以使用placeholder、readonly、disable等等原生都有的功能。",
  "input.file": "File",
  "input.file.text": "亦有上傳檔案的功能。",
  "input.textarea": "TextArea",
  "input.textarea.text": "textArea也被規範在inputs中。",
  "form.title": "form表單驗證",
  "form.text.1": "這個頁面是用來展示quasar的form驗證功能。",
  "form.text.2":
    "rules是用來設定驗證規則，當rules回傳false或是字串時就代表驗證失敗。回傳true則代表驗證成功。",
  "form.text.3":
    "當q-btn有設定type為submit時，就會觸發form的submit事件。同理reset也是。\n當表單驗證成功才會觸發submit事件",
  "form.name": "名字",
  "form.name.tip": "姓名與姓氏",
  "form.name.error": "請輸入名字",
  "form.age": "年齡",
  "form.age.error.1": "請輸入正確年齡",
  "form.age.error.2": "請輸入年齡",
  "form.accept": "我願意接受所有條款",
  "other.radio": "Radio",
  "other.checkbox": "Checkbox",
  "other.Multiple": "多選Checkbox",
  "other.range": "Range",
  "other.slider": "Slider",
  "other.toggle": "Toggle",
};
