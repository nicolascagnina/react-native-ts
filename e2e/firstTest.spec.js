describe('In this app', () => {
  before(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should have log in screen', async () => {
    await expect(element(by.id('Login'))).toBeVisible();
    await expect(element(by.id('user-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
  });

  it('should tap on sing up', async () => {
    await element(by.id('signUp-button2')).tap();
  });

  it('should have register screen', async () => {
    await expect(element(by.id('Register'))).toBeVisible();
    await expect(element(by.id('username-register'))).toBeVisible();
    await expect(element(by.id('submit-register'))).toBeVisible();
  });

  it('should type username and password', async () => {
    let username = element(by.id('username-register'));
    let usernameText = 'sofiaa';
    let password = element(by.id('password-register'));
    let passwordText = '123456';
    await username.typeText(usernameText);
    await password.typeText(passwordText);
  });

  it('should submit', async () => {
    await element(by.id('submit-register')).tap();
  });

  it('should tan op sing in', async () => {
    await element(by.id('signUp-button')).tap();
  });

  it('should type username and password on sign in', async () => {
    let username = element(by.id('user-input'));
    let usernameText = 'sofiaa';
    let password = element(by.id('password-input'));
    let passwordText = '123456';
    await username.typeText(usernameText);
    await password.typeText(passwordText);
  });

  it('should submit on sign in', async () => {
    await element(by.text('Submit')).tap();
  });

  // it('should have welcome screen', async () => {
  //   await expect(element(by.text('Welcome!'))).toBeVisible();
  // });
});
