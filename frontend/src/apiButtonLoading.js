import axios from "axios";

const buttonRequests = new WeakMap();
let pendingButton = null;
let pendingButtonTimeout;

const markPendingButton = (button) => {
  pendingButton = button;
  window.clearTimeout(pendingButtonTimeout);
  pendingButtonTimeout = window.setTimeout(() => {
    pendingButton = null;
  }, 1000);
};

document.addEventListener(
  "click",
  (event) => {
    window.clearTimeout(pendingButtonTimeout);
    pendingButton = null;

    const button =
      event.target instanceof Element ? event.target.closest("button") : null;
    if (button && !button.disabled) {
      markPendingButton(button);
    }
  },
  true
);

document.addEventListener(
  "submit",
  (event) => {
    window.clearTimeout(pendingButtonTimeout);
    pendingButton = null;

    if (event.submitter instanceof HTMLButtonElement && !event.submitter.disabled) {
      markPendingButton(event.submitter);
    }
  },
  true
);

const startButtonLoading = (button) => {
  const state = buttonRequests.get(button) || {
    count: 0,
    wasDisabled: button.disabled,
  };

  state.count += 1;
  buttonRequests.set(button, state);
  button.disabled = true;
  button.dataset.apiLoading = "true";
  button.setAttribute("aria-busy", "true");
};

const finishButtonLoading = (button) => {
  const state = buttonRequests.get(button);
  if (!state) return;

  state.count -= 1;
  if (state.count > 0) return;

  button.disabled = state.wasDisabled;
  delete button.dataset.apiLoading;
  button.removeAttribute("aria-busy");
  buttonRequests.delete(button);
};

axios.interceptors.request.use((config) => {
  const button = pendingButton;
  if (button && button.isConnected && !button.disabled) {
    config.apiLoadingButton = button;
    startButtonLoading(button);
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.config.apiLoadingButton) {
      finishButtonLoading(response.config.apiLoadingButton);
    }

    return response;
  },
  (error) => {
    if (error.config?.apiLoadingButton) {
      finishButtonLoading(error.config.apiLoadingButton);
    }

    return Promise.reject(error);
  }
);
