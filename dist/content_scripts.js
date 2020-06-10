'use strict';

var PROJECT_BRANCH_KEY = 'customONESApiProjectBranch';
var WIKI_BRANCH_KEY = 'customONESApiWikiBranch';

function setCustomApi(storageKey, prefix) {
  return new Promise(function (resolve) {
    chrome.storage.local.get([storageKey], function (data) {
      var branch = data[storageKey];

      if (branch) {
        console.log("set ".concat(storageKey), branch);
        localStorage.setItem(storageKey, "".concat(prefix, "/").concat(branch, "/"));
      } else {
        localStorage.removeItem(storageKey);
      }

      resolve();
    });
  });
}

function setProjectCustomApi() {
  return setCustomApi(PROJECT_BRANCH_KEY, '/project');
}
function setWikiCustomApi() {
  return setCustomApi(WIKI_BRANCH_KEY, '/wiki');
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DOM_SCOPE = 'och__';
var WRAPPER_EL_ID = "och__custom-api-info";

function addStylesheet() {
  var styleEl = document.createElement('style');
  styleEl.innerHTML = "\n    .".concat(DOM_SCOPE, "api-info-wrapper {\n      position: fixed;\n      right: 10px;\n      bottom: 10px;\n      padding: 5px 10px;\n      background-color: yellow;\n      opacity: 0.4;\n      pointer-events: none;\n      z-index: 999;\n      border-radius: 5px;\n    }\n  ");
  document.body.append(styleEl);
}

function createOptionEl(_ref) {
  var name = _ref.name,
      value = _ref.value;
  var optionEl = document.createElement('div');
  optionEl.className = "".concat(DOM_SCOPE, "api-info-option");
  optionEl.innerText = "".concat(name, "\uFF1A").concat(value);
  return optionEl;
}

function getInfoOptionElList() {
  var projectBranch = localStorage.getItem(PROJECT_BRANCH_KEY);
  var projectBranchInfoEl = createOptionEl({
    name: 'project api',
    value: projectBranch || '默认'
  });
  return [projectBranchInfoEl];
}

function showCustomApiInfo() {
  addStylesheet();
  var wrapperEl = document.createElement('div');
  wrapperEl.className = "".concat(DOM_SCOPE, "api-info-wrapper");
  wrapperEl.id = WRAPPER_EL_ID;
  var optionElList = getInfoOptionElList();
  wrapperEl.append.apply(wrapperEl, _toConsumableArray(optionElList));
  document.body.append(wrapperEl);
}
function syncCustomApiInfo() {
  var wrapperEl = document.querySelector("#".concat(WRAPPER_EL_ID));
  var optionElList = getInfoOptionElList();
  wrapperEl.innerHTML = '';
  wrapperEl.append.apply(wrapperEl, _toConsumableArray(optionElList));
}

var CUSTOM_API_CHANGED = 'customApiChanged';

var setAllCustomApi = function setAllCustomApi() {
  return Promise.all([setProjectCustomApi(), setWikiCustomApi()]);
};

var updateCustomApiInfo = function updateCustomApiInfo() {
  return setAllCustomApi().then(function () {
    syncCustomApiInfo();
  });
};

var addEventListeners = function addEventListeners() {
  window.addEventListener('hashchange', function () {
    updateCustomApiInfo();
  });
  chrome.runtime.onMessage.addListener(function (message) {
    var type = message ? message.type : null;

    if (type === CUSTOM_API_CHANGED) {
      updateCustomApiInfo();
    }
  });
};

function run() {
  setAllCustomApi().then(function () {
    showCustomApiInfo();
  });
  addEventListeners();
}

run();
