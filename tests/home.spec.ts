import {test, expect, type Page, ElementHandle} from '@playwright/test'


const openInviteForm = async  (page: Page) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=Request an invite')
  await page.locator("input[placeholder='Full name']").isVisible()
}

interface InviteFormInput {
  name: string
  email: string
  confirmEmail: string
}

const makeInput = async (page: Page, {name, email, confirmEmail}: InviteFormInput) => {
  await page.locator("input[placeholder='Full name']").fill(name);
  await page.locator("input[placeholder='Email']").fill(email);
  await page.locator("input[placeholder='Confirm Email']").fill(confirmEmail);
}

const sendForm = async (page: Page) => page.locator("text=Send").click()

const isInputError = async (element: ElementHandle) => {
  const color = await element.evaluate((el: any) => {
    return window.getComputedStyle(el).getPropertyValue('background-color');
  });
  return color === "rgba(0, 0, 0, 0.1)"
}

const mockAuth = async (page: Page) => {
  await page.route('**/fake-auth', (route, req) => {
    if(req.postDataJSON()["email"] === "usedemail@airwallex.com") {
      return route.fulfill({
        contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        status: 400,
        body: JSON.stringify({errorMessage: "Bad Request: Email is already in use"}),
      })
    }
    return route.fulfill({
      contentType: "application/json",
      headers: {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK",
      },
      status: 200,
      body: JSON.stringify("Registered"),
    })
  })
}


test('should show invite form', async ({ page }) => {
  await openInviteForm(page)

  await expect(page.locator("input[placeholder='Full name']")).toBeVisible()
  await expect(page.locator("input[placeholder='Email']")).toBeVisible()
  await expect(page.locator("input[placeholder='Confirm Email']")).toBeVisible()
})

test('should do validation', async ({ page }) => {
  await openInviteForm(page)
  await makeInput(page, {name: "", email: "", confirmEmail: ""})
  await sendForm(page)

  const nameEle = await page.waitForSelector("input[placeholder='Full name']")
  const emailEle = await page.waitForSelector("input[placeholder='Email']")
  const confirmEle = await page.waitForSelector("input[placeholder='Confirm Email']")

  expect(await isInputError(nameEle)).toBeTruthy()
  expect(await isInputError(emailEle)).toBeTruthy()
  expect(await isInputError(confirmEle)).toBeFalsy()

  await makeInput(page, {name: "111", email: "1@1.com", confirmEmail: "11@1.com"})
  await sendForm(page)
  expect(await isInputError(nameEle)).toBeFalsy()
  expect(await isInputError(emailEle)).toBeFalsy()
  expect(await isInputError(confirmEle)).toBeTruthy()

})

test('should show all done popup if request successfully', async ({ page }) => {
  await mockAuth(page)
  await openInviteForm(page)
  await makeInput(page, {name: "111", email: "1@1.com", confirmEmail: "1@1.com"})
  await sendForm(page)
  await expect(page.locator("text=All done!")).toBeVisible()
})

test('should show error message if request failed', async ({ page }) => {
  await mockAuth(page)
  await openInviteForm(page)
  await makeInput(page, {name: "111", email: "usedemail@airwallex.com", confirmEmail: "usedemail@airwallex.com"})
  await sendForm(page)
  await expect(page.locator("text=Bad Request: Email is already in use")).toBeVisible()
})

test('can re-attempt the submission', async ({ page }) => {
  await mockAuth(page)
  await openInviteForm(page)
  await makeInput(page, {name: "111", email: "usedemail@airwallex.com", confirmEmail: "usedemail@airwallex.com"})
  await sendForm(page)
  await expect(page.locator("text=Bad Request: Email is already in use")).toBeVisible()
  await makeInput(page, {name: "111", email: "1@1.com", confirmEmail: "1@1.com"})
  await sendForm(page)
  await expect(page.locator("text=All done!")).toBeVisible()
})
