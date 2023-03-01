import {AppModalType} from './AppModalType';

class AppModalManager {
  showMethod?: (appModal: AppModalType) => void;
  hideMethod?: () => void;

  registerMethods(
    _showMethod: (appModal: AppModalType) => void,
    _hideMethod: () => void,
  ) {
    this.showMethod = _showMethod;
    this.hideMethod = _hideMethod;
  }

  show(appModal: AppModalType) {
    this.showMethod?.(appModal);
  }

  hide() {
    this.hideMethod?.();
  }

  unregisterMethods() {
    this.hideMethod?.();
    this.hideMethod = undefined;
    this.showMethod = undefined;
  }
}

export default new AppModalManager();
