const InstallStep = require('./install-step.js');
const CreateAccountStep = require('./create-account-step.js');
const LoginStep = require('./login-step.js');
const WhitelistStep = require('./whitelist-step.js');

var InstallFlow = class {
  constructor(classes=[]) {
    this.element = document.createElement('div');
    this.element.classList.add('install-flow');
    this.element.classList.add('native-key-bindings');

    let title = document.createElement('div');
    title.classList.add('title');
    title.textContent = "Choose your Python autocomplete engine";
    this.element.appendChild(title);

    classes.push('install-flow-step');

    this.installStep = new InstallStep(classes);
    this.element.appendChild(this.installStep.element);

    var hidden = classes.concat(['hidden']);
    this.createAccountStep = new CreateAccountStep(hidden);
    this.element.appendChild(this.createAccountStep.element);

    this.loginStep = new LoginStep(hidden);
    this.element.appendChild(this.loginStep.element);

    this.whitelistStep = new WhitelistStep(hidden);
    this.element.appendChild(this.whitelistStep.element);
  }

  destroy() {
    this.installStep.destroy();
    this.createAccountStep.destroy();
    this.loginStep.destroy();
    this.whitelistStep.destroy();
    this.element.remove();
  }

  onInstall(func) {
    this.installStep.onSubmit(func);
  }

  onSkipInstall(func) {
    this.installStep.onSkip(func);
  }

  onCreateAccount(func) {
    this.createAccountStep.onSubmit(func);
  }

  onLogin(func) {
    this.loginStep.onSubmit(func);
  }

  onLoginBack(func) {
    this.loginStep.onBack(func);
  }

  onResetPassword(func) {
    this.loginStep.onReset(func);
  }

  onWhitelist(func) {
    this.whitelistStep.onSubmit(func);
  }

  onSkipWhitelist(func) {
    this.whitelistStep.onSkip(func);
  }

  showCreateAccount(email=null) {
    this.installStep.showProgress();
    if (email) {
      this.createAccountStep.setEmail(email);
    }
    this.loginStep.hide();
    this.whitelistStep.hide();
    this.createAccountStep.show();
  }

  showLogin() {
    if (this.createAccountStep.email.value) {
      this.loginStep.setEmail(this.createAccountStep.email.value);
    }
    this.createAccountStep.hide();
    this.whitelistStep.hide();
    this.loginStep.show();
  }

  showWhitelist(info={}) {
    this.createAccountStep.hide();
    this.loginStep.hide();
    this.whitelistStep.setEmail(info.email);
    this.whitelistStep.setPath(info.path);
    this.whitelistStep.show();
  }

  finishWhitelist() {
    var text = "Kite is still installing. " +
      "Give it a couple more seconds and you'll be ready to rock!";
    this.whitelistStep.setFinished(text);
  }

  finishFlow() {
    var text = "Kite is installed! " +
      "You can close this tab and start jamming some code!";
    this.whitelistStep.setFinished(text);
  }
};

module.exports = InstallFlow;