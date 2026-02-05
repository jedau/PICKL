import { expect } from '@playwright/test'
import { CheckboxesPage } from '../../pages/CheckboxesPage.js'
import { Given, Then, When } from '../support/step-helpers.js'

Given('I am on the checkboxes page', async function () {
  const checkboxesPage = this.getPageObject(CheckboxesPage)
  await checkboxesPage.goto()
})

When('I check checkbox {int}', async function (checkboxNumber: number) {
  const checkboxesPage = this.getPageObject(CheckboxesPage)
  await checkboxesPage.check(checkboxNumber)
})

When('I uncheck checkbox {int}', async function (checkboxNumber: number) {
  const checkboxesPage = this.getPageObject(CheckboxesPage)
  await checkboxesPage.uncheck(checkboxNumber)
})

Then('checkbox {int} should be checked', async function (checkboxNumber: number) {
  const checkboxesPage = this.getPageObject(CheckboxesPage)
  const isChecked = await checkboxesPage.isChecked(checkboxNumber)
  expect(isChecked).toBe(true)
})

Then('checkbox {int} should be unchecked', async function (checkboxNumber: number) {
  const checkboxesPage = this.getPageObject(CheckboxesPage)
  const isChecked = await checkboxesPage.isChecked(checkboxNumber)
  expect(isChecked).toBe(false)
})
